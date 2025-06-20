
/**
 * manage address name and tags locally
 */

import path from "path";
import os from "os";
import { Level } from "level";
import { isBrowser, retry_db } from "../common.js";
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
    private location: string;

    constructor() {
        this.location = LocalMarkLocation;
        if (!isBrowser()) {
            this.location = path.join(path.join(os.homedir(), '.wowok'), LocalMarkLocation);
        }
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

      return await retry_db (this.location, async(storage:Level) => {
        // use address as name if name is undefined or null
        if (name === undefined || name === null) {
          await storage.put(mark.address, JSON.stringify(mark));
          return mark.address
        }

        if (name.length > LocalMarkNameMaxLength) {
          name = name.substring(0, LocalMarkNameMaxLength); 
        };

        const r = await storage.get(name);
        if (r) {
          if (useAddressIfNameExist) {
            await storage.put(mark.address, JSON.stringify(mark));
            return mark.address
          } else {
            const obj = JSON.parse(r) as MarkData;
            await storage.put(obj.address, r)
          }
        }
        await storage.put(name, JSON.stringify(mark));
        return name  
      })
    }

    async get(name?: string|null) : Promise<MarkData | undefined> {
      if (name === undefined || name === null) {
        return undefined;
      }
      return await retry_db(this.location, async(storage:Level) => {
        const r = await storage.get(name);
        if (r) {
            return JSON.parse(r);
        }        
      })
    }

    async get_address(name_or_address?: string | null) : Promise<string | undefined> {
      if (IsValidAddress(name_or_address)) {
        return name_or_address!;
      }

      if (name_or_address !== undefined && name_or_address !== null) {
        return (await this.get(name_or_address))?.address;   
      }
    }

    async get_many_address(name_or_addresses: (string | null | undefined)[]) : Promise<(string | undefined)[]> {
      const check = (v: string | null | undefined) : boolean => {
        return v!==undefined && v!==null && !IsValidAddress(v)
      }
      const q = await retry_db(this.location, async(storage:Level) => {
        return (await storage.getMany(name_or_addresses.filter(v => check(v)) as string[]));
      });

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
      await retry_db(this.location, async(storage:Level) => {
        await storage.del(name);
      });
    }

    async clear() {
      await retry_db(this.location, async(storage:Level) => {
        await storage.clear();
      })
    }

    async rename(name:string, new_name:string) : Promise<boolean> {
      if (new_name.length > LocalMarkNameMaxLength) {
        new_name = new_name.substring(0, LocalMarkNameMaxLength);
      };
      return await retry_db(this.location, async(storage:Level) => {
        const r = (await storage.getMany([name, new_name]));
        if (r[0] && !r[1]) {
          await storage.put(new_name, r[0]);
          await storage.del(name);
          return true;
        }
        return false;
      })
    }

    async swap_name(name1:string, name2:string) : Promise<boolean> {
      return await retry_db(this.location, async(storage:Level) => {
        const r = await storage.getMany([name1, name2]);
        if (r[0] && r[1]) {
          await storage.put(name1, r[1]);
          await storage.put(name2, r[0]);
          return true;
        }       
        return false; 
      })
    }

    async set_tags(name:string, tags:string[] | undefined) : Promise<boolean> {
      return await retry_db(this.location, async(storage:Level) => {
        const r  = await storage.get(name);
        if (r) {
          const obj = JSON.parse(r) as MarkData;
          obj.tags = tags;
          await storage.put(name, JSON.stringify(obj));
          return true;
        }    
        return false;
      })
    }

    async list(filter?: LocalMarkFilter) : Promise<QueryNameData[]> {
      if (filter && filter.tags) filter.tags = filter.tags.filter(v => v !== '' && v);

      return await retry_db(this.location, async(storage:Level) => {
        return (await storage.iterator().all()).filter(v => {
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
      })
    }
  }

export interface QueryNameData {
  name: string;
  data: any;
};

export class LocalInfo {
  static _instance: any;
  private location: string;

  constructor() {
      this.location = LocalInfoLocation;
      if (!isBrowser()) {
          this.location = path.join(path.join(os.homedir(), '.wowok'), LocalInfoLocation);
      }
  }

  static Instance() : LocalInfo {
      if (!LocalInfo._instance) {
        LocalInfo._instance = new LocalInfo();
      }; return LocalInfo._instance
  } 

  async put(name:string = LocalInfoNameDefault, content:string, bDefault:boolean=true) : Promise<void> {
    await retry_db(this.location, async(storage:Level) => {
      const r = await storage.get(name);
      if (r)  {
        const obj = JSON.parse(r) as InfoData;
        obj.others = obj.others ? [...obj.others, content] : [content];

        if (bDefault) {
          obj.default = content;
        } 
        await storage.put(name, JSON.stringify(obj));
      } else {
        const obj : InfoData = {default:content, others:[content]};
        await storage.put(name, JSON.stringify(obj));
      }
    })
  }

  async get(name: string = LocalInfoNameDefault) : Promise<InfoData | undefined> {
    return await retry_db(this.location, async(storage:Level) => {
      const r = (await storage.get(name));
      if (r) {
          return JSON.parse(r);
      }
    })
  }

  async get_default(name: string = LocalInfoNameDefault) : Promise<string | undefined> {
    return await retry_db(this.location, async(storage:Level) => {
      const r = await storage.get(name);
      if (r) {
          return (JSON.parse(r) as InfoData)?.default;
      }      
    })
  }

  async del(name:string = LocalInfoNameDefault) : Promise<void> {
    return await retry_db(this.location, async(storage:Level) => {
      await storage.del(name);
    })
  }

  async del_content(name:string = LocalInfoNameDefault, index:number) : Promise<boolean> {
    return await retry_db(this.location, async(storage:Level) => {
      const r = await storage.get(name);
      if (r) {
          const obj =  JSON.parse(r) as InfoData;
          if (obj.others && index < obj.others.length) {
            obj.others.splice(index, 1);
            await storage.put(name, JSON.stringify(obj));
            return true;
          }
      }
      return false
    })
  }

  async clear() {
    return await retry_db(this.location, async(storage:Level) => {
      await storage.clear();  
    })
  }

  async list() : Promise<QueryNameData[]> {
    return await retry_db(this.location, async(storage:Level) => {
      return (await storage.iterator().all()).map(v => {return {name:v[0], data:v[1]}});
    })
  }
}

