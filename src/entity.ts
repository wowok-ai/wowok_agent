import { Bcs, Entity, Entity_Info, ERROR, Errors, IsValidAddress, Protocol, TransactionBlock } from "wowok";
import { CacheName, PERSONAL_RESOURCE_KEY, WowokCache, CachedData} from "./cache";

export interface EntityAnswer {
    info?: Entity_Info;
    resource?: string;
    like?: number;
    dislike?: number;
}

export const query_entity_json = async (person_address:string) : Promise<string> => {
    try {
        return JSON.stringify({data:await query_entity(person_address)});
    } catch (e) {
        return JSON.stringify({error:e?.toString()})
    }
}

export const query_entity = async (personal_address:string) : Promise<EntityAnswer | undefined> => {
    if (!IsValidAddress(personal_address)) {
        ERROR(Errors.InvalidParam, 'personal_address - '+personal_address)
    }

    const cache = WowokCache.Instance().get(CacheName.resource);

    if (cache) {
        const now = new Date().getTime(); 
        const data = cache.load(PERSONAL_RESOURCE_KEY(personal_address));
        if (data) {
            const r:CachedData = JSON.parse(data);
            if (r.expire !== 'INFINITE' && r.expire >= now) { //update , INFINITE not supported
                return JSON.parse(r.data) as EntityAnswer
            }
        } 
    }

    const e = await entity(personal_address);
    if (e) {
        if (cache) { // save
            const r:CachedData = {expire:new Date().getTime(), data:JSON.stringify(e)}
            cache.save(PERSONAL_RESOURCE_KEY(personal_address), JSON.stringify(r));
        }
        return e
    }
}

const entity = async (personal_address:string) : Promise<EntityAnswer | undefined> => {
    const txb = new TransactionBlock();
    Entity.From(txb).query_ent(personal_address);

    const res = await Protocol.Client().devInspectTransactionBlock({sender:personal_address, transactionBlock:txb});
    if (res.results?.length === 1 && res.results[0].returnValues?.length === 1 )  {
        const r = Bcs.getInstance().de_ent(Uint8Array.from(res.results[0].returnValues[0][0]));
        const info = Bcs.getInstance().de_entInfo(Uint8Array.from(r?.avatar));
        const d : EntityAnswer = {resource:r?.resource?.some, like:r?.like, dislike:r?.dislike, info: {
            avatar:info.avatar, name:info.name, twitter:info.twitter, discord:info.discord, homepage:info.homepage, description:info.description
        }};  
        return d;
    }
}
