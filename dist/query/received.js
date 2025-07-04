import { ERROR, Errors, Protocol, Treasury, Service, } from "wowok";
import { query_objects } from "./objects.js";
export const query_received = async (query) => {
    const r1 = await query_objects({ objects: [query.object] });
    if (r1?.objects?.length !== 1 || (r1.objects[0].type !== 'Treasury' && r1.objects[0].type !== 'Order')) {
        ERROR(Errors.InvalidParam, 'query_received: Only Treasury or Order object supported.');
    }
    var t = '';
    var type;
    if (r1.objects[0].type === 'Treasury') {
        t = Treasury.parseObjectType(r1.objects[0].type_raw);
        type = Protocol.Instance().package('wowok') + '::payment::CoinWrapper<' + t + '>';
    }
    else if (r1.objects[0].type === 'Order') {
        t = Service.parseOrderObjectType(r1.objects[0].type_raw);
    }
    const filter = type ? { StructType: type } : undefined;
    const r2 = await Protocol.Client().getOwnedObjects({ owner: r1.objects[0].object, filter: filter,
        options: { showContent: true, showType: true }, cursor: query.cursor, limit: query.limit });
    let receive = BigInt(0);
    const res = r2.data.map((v) => {
        const i = v?.data?.content?.fields;
        receive += BigInt(i?.coin?.fields?.balance);
        return { payment: i?.payment, balance: i?.coin?.fields?.balance, id: v?.data?.objectId };
    });
    return { balance: filter ? receive.toString() : '', received: res, token_type: t };
};
//# sourceMappingURL=received.js.map