import { LocalMark } from "./local/local.js";
import NodeRSA from 'node-rsa';
import { Level } from 'level';
import { ENTRYPOINT, ERROR, Errors, NetworkInfo, Protocol } from "wowok";
import { Config } from "./local/config.js";

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

const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const retry_db = async (name_or_db:string | Level, command: (db: Level) => Promise<any>) : Promise<any> => {
    if (typeof name_or_db === 'string') {
      name_or_db = new Level(name_or_db, { valueEncoding: 'json' });
    }
    
    for (let i = 0; i < 3; ++i) {
      try {
        const r = await command(name_or_db);
        return r;
      } catch(e) {
        if ((e as any)?.code === 'LEVEL_DATABASE_NOT_OPEN') {
          await sleep(1000);
        } else {
          throw e;
        }
      } finally {
          await name_or_db.close();
      }
    }
    throw('LEVEL_DATABASE_NOT_OPEN');
}

export interface SessionOption {
  network: ENTRYPOINT,
  retentive: 'always' | 'session',
}

export const session_resolve = async (option?: SessionOption) : Promise<ENTRYPOINT> => {
  if (option) {
    if (option.retentive === 'always') {
      await Config.Instance().network_set(option.network);
    } else if (option.retentive === 'session') {
      Protocol.Instance().use_network(option.network)
    }
    return option.network;
  } else {
    if (Protocol.Instance().IsNetworkValid()) {
      return Protocol.Instance().networkUrl()!.network;
    } else {
      const n = await Config.Instance().network();
      if (!n) {
        ERROR(Errors.networkInvalid, Object.entries(ENTRYPOINT))
      }
      return n
    }
  }
}
