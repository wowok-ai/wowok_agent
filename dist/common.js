import { LocalMark } from "./local/local.js";
import NodeRSA from 'node-rsa';
import { Level } from 'level';
export const isBrowser = () => {
    return typeof window !== 'undefined' && typeof indexedDB !== 'undefined';
};
export const get_object_address = async (object) => {
    if (typeof (object) === 'string') {
        return await LocalMark.Instance().get_address(object);
    }
    else {
        return object;
    }
};
export const crypto_string = (str, pubkey) => {
    const rsa = new NodeRSA();
    rsa.importKey(pubkey, 'pkcs8-public-pem');
    return rsa.encrypt(str, 'base64');
};
const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
export const retry_db = async (name_or_db, command) => {
    if (typeof name_or_db === 'string') {
        name_or_db = new Level(name_or_db, { valueEncoding: 'json' });
    }
    for (let i = 0; i < 3; ++i) {
        try {
            const r = await command(name_or_db);
            return r;
        }
        catch (e) {
            if (e?.code === 'LEVEL_DATABASE_NOT_OPEN') {
                await sleep(1000);
            }
            else {
                throw e;
            }
        }
        finally {
            await name_or_db.close();
        }
    }
    throw ('LEVEL_DATABASE_NOT_OPEN');
};
//# sourceMappingURL=common.js.map