import { ERROR, Errors, Protocol, Treasury } from "wowok";
import { query_objects } from "./objects.js";
export const query_treasury_received = async (query) => {
    const r1 = await query_objects({ objects: [query.treasury_object] });
    if (r1?.objects?.length !== 1 || r1.objects[0].type !== 'Treasury') {
        ERROR(Errors.InvalidParam, 'query_treasury_received: invalid treasury_object');
    }
    const type = Protocol.Instance().package('wowok') + '::payment::CoinWrapper<' + Treasury.parseObjectType(r1.objects[0].type_raw) + '>';
    const r2 = await Protocol.Client().getOwnedObjects({ owner: r1.objects[0].object, filter: { StructType: type },
        options: { showContent: true, showType: true }, cursor: query.cursor, limit: query.limit });
    let receive = BigInt(0);
    const res = r2.data.map((v) => {
        const i = v?.data?.content?.fields;
        receive += BigInt(i?.coin?.fields?.balance);
        return { payment: i?.payment, balance: i?.coin?.fields?.balance, id: v?.data?.objectId };
    });
    return { balance: receive.toString(), received: res };
};
//# sourceMappingURL=treasury_received.js.map