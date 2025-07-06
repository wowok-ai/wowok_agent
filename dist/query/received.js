import { ERROR, Errors, Treasury, GetRecievedBalanceObject, } from "wowok";
import { query_objects } from "./objects.js";
// receive Treasury or Order object Payments
export const query_received = async (query) => {
    const r1 = await query_objects({ objects: [query.object] });
    if (r1?.objects?.length !== 1 || (r1.objects[0].type !== 'Treasury' && r1.objects[0].type !== 'Order')) {
        ERROR(Errors.InvalidParam, 'query_received: Only Treasury or Order object supported.');
    }
    var t;
    if (r1.objects[0].type === 'Treasury') {
        t = Treasury.parseObjectType(r1.objects[0].type_raw);
    }
    return await GetRecievedBalanceObject(r1.objects[0].object, t);
};
//# sourceMappingURL=received.js.map