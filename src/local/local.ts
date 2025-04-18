
/**
 * manage object's name and tags locally
 */

import path from "path";
import os from "os";
import { Level } from "level";
import { isBrowser } from "../common.js";
import { IsValidAddress, TagName } from "wowok";
import { Account } from "./account.js";

export interface MarkData {
    object: string;
    tags?: string[];
}

export interface InfoData {
  default: string;
  others?: string[];
}

export const LocalMarkLocation = 'wowok-mark';
export const LocalInfoLocation = 'wowok-info';
export const LocalMarkNameMaxLength = 32;

export class LocalMark {
    static _instance: any;
    private storage;

    constructor() {
        var location = LocalMarkLocation;
        if (!isBrowser()) {
            location = path.join(path.join(os.homedir(), '.wowok'), LocalMarkLocation);
        }
        this.storage = new Level(location, { valueEncoding: 'json' });
    }

    static Instance() : LocalMark {
        if (!LocalMark._instance) {
          LocalMark._instance = new LocalMark();
        }; return LocalMark._instance
    }

    // useAddressIfNameExist true: use address as the name if the name exist; 
    // otherwise, use this name and change the original name to its address.
    async put(name:string | undefined | null, mark:MarkData, useAddressIfNameExist?:boolean) : Promise<boolean> {
      // object address invalid
      if (!IsValidAddress(mark.object) && mark.object !== '0x2' && mark.object !== '0x6') { 
        return false;
      };

      // use address as name if name is undefined or null
      if (name === undefined || name === null) {
        this.storage.put(mark.object, JSON.stringify(mark));
        return true;
      }

      if (name.length > LocalMarkNameMaxLength) {
        name = name.substring(0, LocalMarkNameMaxLength); 
      };

      const r = await this.storage.get(name);
      if (r) {
        if (useAddressIfNameExist) {
          this.storage.put(mark.object, JSON.stringify(mark));
          return true;
        } else {
          const obj = JSON.parse(r) as MarkData;
          await this.storage.put(obj.object, r)
        }
      }

      await this.storage.put(name, JSON.stringify(mark));
      return true;
    }

    async get(name: string) : Promise<MarkData | undefined> {
      const r = await this.storage.get(name);
      if (r) {
          return JSON.parse(r);
      }
    }

    // get account address:
    // 1. if name_or_address is undefined, return default account address.
    // 2. if name_or_address is address, return it.
    // 3. if name_or_address is name, return the address of the name.
    // 4. if not found and genNewIfNotFound is true, generate a new address and save it with name_or_address.
    async get_account(name_or_address?: string, genNewIfNotFound:boolean=false) : Promise<string | undefined> {
      if (name_or_address === undefined) {
          return Account.Instance().default(genNewIfNotFound);
      } else {
        const r = await this.get(name_or_address);
        if (r) {
          return r.object;
        } else {
          if (IsValidAddress(name_or_address)) {
            return name_or_address;
          }
  
          if (genNewIfNotFound) {
            const addr = await Account.Instance().gen(false);
            await this.put(name_or_address, {object:addr, tags:[TagName.Account]});
          }
        }
      }
    }

    async del(name:string)  {
      return await this.storage.del(name);
    }

    async clear() {
      return await this.storage.clear();
    }

    async rename(name:string, new_name:string) : Promise<boolean> {
      if (new_name.length > LocalMarkNameMaxLength) {
        new_name = new_name.substring(0, LocalMarkNameMaxLength);
      };

      const r = await this.storage.getMany([name, new_name]);
      if (r[0] && !r[1]) {
        await this.storage.put(new_name, r[0]);
        await this.storage.del(name);
        return true;
      }
      return false;
    }

    async swap_name(name1:string, name2:string) : Promise<boolean> {
      const r = await this.storage.getMany([name1, name2]);
      if (r[0] && r[1]) {
        await this.storage.put(name1, r[1]);
        await this.storage.put(name2, r[0]);
        return true;
      }
      return false;
    }

    async set_tags(name:string, tags:string[] | undefined) : Promise<boolean> {
      const r  = await this.storage.get(name);
      if (r) {
        const obj = JSON.parse(r) as MarkData;
        obj.tags = tags;
        await this.storage.put(name, JSON.stringify(obj));
        return true;
      }
      return false;
    }
}

export class LocalInfo {
  static _instance: any;
  private storage;

  constructor() {
      var location = LocalInfoLocation;
      if (!isBrowser()) {
          location = path.join(path.join(os.homedir(), '.wowok'), LocalInfoLocation);
      }
      this.storage = new Level(location, { valueEncoding: 'json' });
  }

  static Instance() : LocalInfo {
      if (!LocalInfo._instance) {
        LocalInfo._instance = new LocalInfo();
      }; return LocalInfo._instance
  } 

  async put(name:string, content:string, bDefault:boolean=true) : Promise<void> {
    const r = await this.storage.get(name);
    if (r)  {
      const obj = JSON.parse(r) as InfoData;
      obj.others = obj.others ? [...obj.others, content] : [content];

      if (bDefault) {
        obj.default = content;
      } 
      await this.storage.put(name, JSON.stringify(obj));
    } else {
      const obj : InfoData = {default:content, others:[content]};
      await this.storage.put(name, JSON.stringify(obj));
    }
  }

  async get(name: string) : Promise<LocalInfo | undefined> {
    const r = await this.storage.get(name);
    if (r) {
        return JSON.parse(r);
    }
  }

  async get_default(name: string) : Promise<string | undefined> {
    const r = await this.storage.get(name);
    if (r) {
        return (JSON.parse(r) as InfoData).default;
    }
  }

  async del(name:string)  {
    return await this.storage.del(name);
  }

  async del_content(name:string, index:number) : Promise<boolean> {
    const r = await this.storage.get(name);
    if (r) {
        const obj =  JSON.parse(r) as InfoData;
        if (obj.others && index < obj.others.length) {
          obj.others.splice(index, 1);
          await this.storage.put(name, JSON.stringify(obj));
          return true;
        }
    }
    return false;
  }

  async clear() {
    return await this.storage.clear();
  }
}

