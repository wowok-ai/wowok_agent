
/**
 * manage address name and tags locally
 */

import path from "path";
import os from "os";
import { Level } from "level";
import { isBrowser } from "../common.js";
import { ERROR, Errors, IsValidAddress, TagName } from "wowok";

export interface MarkData {
    address: string;
    tags?: string[];
}

export interface InfoData {
  default: string;
  others?: string[];
}

export interface LocalMarkFilter {
  name?: string;
  tags?: string[];
  address?: string;
}

export const LocalMarkLocation = 'wowok-mark';
export const LocalInfoLocation = 'wowok-info';
export const LocalMarkNameMaxLength = 32;
export const LocalInfoNameDefault = 'Address of delivery';
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
    async put(name:string | undefined | null, mark:MarkData, useAddressIfNameExist?:boolean) : Promise<string> {
      // object address invalid
      if (!IsValidAddress(mark.address) && mark.address !== '0x2' && mark.address !== '0x6') { 
        ERROR(Errors.InvalidParam, `LocalMark.put.mark.address: ${mark.address}`)
      };

      // use address as name if name is undefined or null
      if (name === undefined || name === null) {
        this.storage.put(mark.address, JSON.stringify(mark));
        return mark.address
      }

      if (name.length > LocalMarkNameMaxLength) {
        name = name.substring(0, LocalMarkNameMaxLength); 
      };

      const r = await this.storage.get(name);
      if (r) {
        if (useAddressIfNameExist) {
          this.storage.put(mark.address, JSON.stringify(mark));
          return mark.address
        } else {
          const obj = JSON.parse(r) as MarkData;
          await this.storage.put(obj.address, r)
        }
      }

      await this.storage.put(name, JSON.stringify(mark));
      return name
    }

    async get(name?: string) : Promise<MarkData | undefined> {
      if (name === undefined || name === null) {
        return undefined;
      }

      const r = await this.storage.get(name);
      if (r) {
          return JSON.parse(r);
      }
    }

    async get_address(name_or_address?: string | null) : Promise<string | undefined> {
      if (IsValidAddress(name_or_address)) {
        return name_or_address!;
      }

      if (name_or_address !== undefined && name_or_address !== null) {
        const r = await this.storage.get(name_or_address);
        if (r) {
            return JSON.parse(r).address;
        }     
      }
    }

    async get_many_address(name_or_addresses: (string | null | undefined)[]) : Promise<(string | undefined)[]> {
      const check = (v: string | null | undefined) : boolean => {
        return v!==undefined && v!==null && !IsValidAddress(v)
      }
      const q = await this.storage.getMany((name_or_addresses.filter(v => check(v)) as string[]));
      return name_or_addresses.map(v => {
        if (check(v)) {
          const r = q.shift();
          if (r) {
            return JSON.parse(q.shift()!)?.address;
          } 
        } 
        return v
      })
    }

    async get_many_address2(name_or_addresses: (string | null | undefined)[]) : Promise<string[]> {
      return (await this.get_many_address(name_or_addresses)).filter((v):v is string => v!==undefined && v!== null) as string[]
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

    async list(filter?: LocalMarkFilter) : Promise<QueryNameData[]> {
      if (filter && filter.tags) filter.tags = filter.tags.filter(v => v !== '' && v);

      return (await this.storage.iterator().all()).filter(v => {
        const obj = JSON.parse(v[1]) as MarkData;
        if (filter?.name && v[0] !== filter.name) return false;
        if (filter?.address && obj.address !== filter.address) return false;

        if (filter?.tags && filter.tags.length > 0) {
          if (!obj.tags || obj.tags.length === 0) return false;

          for (let i = 0; i < filter.tags.length; ++ i) {
            if (!obj.tags.includes(filter.tags[i])) {
              return false
            }
          }
        }
        return true;
      }).map(v => {return {name:v[0], data:v[1]}});
    }
}

export interface QueryNameData {
  name: string;
  data: any;
};

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

  async put(name:string = LocalInfoNameDefault, content:string, bDefault:boolean=true) : Promise<void> {
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

  async get(name: string = LocalInfoNameDefault) : Promise<LocalInfo | undefined> {
    const r = await this.storage.get(name);
    if (r) {
        return JSON.parse(r);
    }
  }

  async get_default(name: string = LocalInfoNameDefault) : Promise<string | undefined> {
    const r = await this.storage.get(name);
    if (r) {
        return (JSON.parse(r) as InfoData).default;
    }
  }

  async del(name:string = LocalInfoNameDefault) : Promise<void> {
    await this.storage.del(name);
  }

  async del_content(name:string = LocalInfoNameDefault, index:number) : Promise<boolean> {
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

  async list() : Promise<QueryNameData[]> {
    return (await this.storage.iterator().all()).map(v => {return {name:v[0], data:v[1]}});
  }
}

