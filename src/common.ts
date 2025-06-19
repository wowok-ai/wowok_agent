import { LocalMark } from "./local/local.js";
import NodeRSA from 'node-rsa';
import { Level } from 'level';

export const isBrowser = ()  => {
    return typeof window !== 'undefined' && typeof indexedDB !== 'undefined';
}

export const get_object_address = async (object: any) => {
    if (typeof(object) === 'string') {
        return await LocalMark.Instance().get_address(object)
    } else {
        return object
    }
}

export const crypto_string = (str: string, pubkey:string) : string => {
    const rsa = new NodeRSA();
    rsa.importKey(pubkey, 'pkcs8-public-pem');
    return rsa.encrypt(str, 'base64');
}

export const get_level_db = async (db_name: string, key:string) : Promise<string | undefined> => {
    const db = new Level(db_name, { valueEncoding: 'json' });
    try {
        const r = await db.get(key);
        return r;
    } finally {
        await db.close();
    }
}

export const getMany_level_db = async (db_name: string, key:string[]) : Promise<string[] | undefined> => {
    const db = new Level(db_name, { valueEncoding: 'json' });
    try {
        const r = await db.getMany(key);
        return r;
    } finally {
        await db.close();
    }
}