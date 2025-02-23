import { Bcs, Entity, Entity_Info, ERROR, Errors, IsValidAddress, Protocol, Resource, TransactionBlock, Tags } from "wowok";
import { CacheName, PERSONAL_RESOURCE_KEY, WowokCache, CachedData} from "./cache";
import { AddressMark } from "./call/base";
import { query_objects } from "./objects";

export interface EntityQuery {
    address: string;
    showResourceContent?: boolean;
}
export interface EntityAnswer {
    info?: Entity_Info;
    resource?: string;
    like?: number;
    dislike?: number;
    resource_content?: Tags[];
}

export const query_entity_json = async (query:string) : Promise<string> => {
    try {
        const q = JSON.parse(query) as EntityQuery;
        return JSON.stringify({data:await query_entity(q)});
    } catch (e) {
        return JSON.stringify({error:e?.toString()})
    }
}

export const query_entity = async (query:EntityQuery) : Promise<EntityAnswer | undefined> => {
    if (!IsValidAddress(query.address)) {
        ERROR(Errors.InvalidParam, 'personal_address - '+query.address)
    }

    const cache = WowokCache.Instance().get(CacheName.resource);

    if (cache) {
        const now = new Date().getTime(); 
        const data = cache.load(PERSONAL_RESOURCE_KEY(query.address));
        if (data) {
            const r:CachedData = JSON.parse(data);
            if (r.expire !== 'INFINITE' && r.expire >= now) { //update , INFINITE not supported
                return JSON.parse(r.data) as EntityAnswer
            }
        } 
    }

    const e = await entity(query);
    if (e) {
        if (cache) { // save
            const r:CachedData = {expire:new Date().getTime(), data:JSON.stringify(e)}
            cache.save(PERSONAL_RESOURCE_KEY(query.address), JSON.stringify(r));
        }
        return e
    }
}

const entity = async (query:EntityQuery) : Promise<EntityAnswer | undefined> => {
    var txb = new TransactionBlock();
    Entity.From(txb).query_ent(query.address);

    const res = await Protocol.Client().devInspectTransactionBlock({sender:query.address, transactionBlock:txb});
    if (res.results?.length === 1 && res.results[0].returnValues?.length === 1 )  {
        const r = Bcs.getInstance().de_ent(Uint8Array.from(res.results[0].returnValues[0][0]));
        const info = Bcs.getInstance().de_entInfo(Uint8Array.from(r?.avatar));
        const d : EntityAnswer = {resource:r?.resource?.some, like:r?.like, dislike:r?.dislike, info: {
            avatar:info.avatar, name:info.name, twitter:info.twitter, discord:info.discord, homepage:info.homepage, description:info.description
        }};  
        if (query.showResourceContent && d.resource) {
            const res = await Protocol.Client().getDynamicFields({parentId:d.resource});
            if (res.data.length > 0) {
                const fields = await Protocol.Client().multiGetObjects({ids:res.data.map(v => v.objectId), options:{showContent:true}});
                d.resource_content = fields.map((i:any) => {
                    return {address:i.data.content.fields.name, name:i.data.content.fields.value.fields.nick, tags:i.data.content.fields.value.fields.tags}
                })
            }
        }
        return d;
    }
}
