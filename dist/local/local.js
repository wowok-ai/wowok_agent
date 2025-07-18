/**
 * manage address name and tags locally
 */
import path from "path";
import os from "os";
import { isBrowser, retry_db } from "../common.js";
import { ERROR, Errors, IsValidAddress } from "wowok";
export const LocalMarkLocation = 'wowok-mark';
export const LocalInfoLocation = 'wowok-info';
export const LocalMarkNameMaxLength = 32;
export const LocalInfoNameDefault = 'Address of delivery';
export class LocalMark {
    constructor() {
        this.location = LocalMarkLocation;
        if (!isBrowser()) {
            this.location = path.join(path.join(os.homedir(), '.wowok'), LocalMarkLocation);
        }
    }
    static Instance() {
        if (!LocalMark._instance) {
            LocalMark._instance = new LocalMark();
        }
        ;
        return LocalMark._instance;
    }
    // useAddressIfNameExist true: use address as the name if the name exist; 
    // otherwise, use this name and change the original name to its address.
    async put(name, mark, useAddressIfNameExist) {
        // object address invalid
        if (!IsValidAddress(mark.address) && mark.address !== '0x2' && mark.address !== '0x6') {
            ERROR(Errors.InvalidParam, `LocalMark.put.mark.address: ${mark.address}`);
        }
        ;
        return await retry_db(this.location, async (storage) => {
            // use address as name if name is undefined or null
            if (name === undefined || name === null) {
                await storage.put(mark.address, JSON.stringify(mark));
                return mark.address;
            }
            if (name.length > LocalMarkNameMaxLength) {
                name = name.substring(0, LocalMarkNameMaxLength);
            }
            ;
            const r = await storage.get(name);
            if (r) {
                if (useAddressIfNameExist) {
                    await storage.put(mark.address, JSON.stringify(mark));
                    return mark.address;
                }
                else {
                    const obj = JSON.parse(r);
                    await storage.put(obj.address, r);
                }
            }
            await storage.put(name, JSON.stringify(mark));
            return name;
        });
    }
    async get(name) {
        if (name === undefined || name === null) {
            return undefined;
        }
        return await retry_db(this.location, async (storage) => {
            const r = await storage.get(name);
            if (r) {
                return JSON.parse(r);
            }
        });
    }
    async get_address(name_or_address) {
        if (IsValidAddress(name_or_address)) {
            return name_or_address;
        }
        if (name_or_address !== undefined && name_or_address !== null) {
            return (await this.get(name_or_address))?.address;
        }
    }
    async get_many_address(name_or_addresses) {
        const check = (v) => {
            return v !== undefined && v !== null && !IsValidAddress(v);
        };
        const q = await retry_db(this.location, async (storage) => {
            return (await storage.getMany(name_or_addresses.filter(v => check(v))));
        });
        return name_or_addresses.map(v => {
            if (check(v)) {
                const r = q.shift();
                if (r) {
                    return JSON.parse(r)?.address;
                }
            }
            return v;
        });
    }
    async get_many_address2(name_or_addresses) {
        return (await this.get_many_address(name_or_addresses)).filter((v) => v !== undefined && v !== null);
    }
    async del(name) {
        await retry_db(this.location, async (storage) => {
            await storage.del(name);
        });
    }
    async clear() {
        await retry_db(this.location, async (storage) => {
            await storage.clear();
        });
    }
    async rename(name, new_name) {
        if (new_name.length > LocalMarkNameMaxLength) {
            new_name = new_name.substring(0, LocalMarkNameMaxLength);
        }
        ;
        return await retry_db(this.location, async (storage) => {
            const r = (await storage.getMany([name, new_name]));
            if (r[0] && !r[1]) {
                await storage.put(new_name, r[0]);
                await storage.del(name);
                return true;
            }
            return false;
        });
    }
    async swap_name(name1, name2) {
        return await retry_db(this.location, async (storage) => {
            const r = await storage.getMany([name1, name2]);
            if (r[0] && r[1]) {
                await storage.put(name1, r[1]);
                await storage.put(name2, r[0]);
                return true;
            }
            return false;
        });
    }
    async set_tags(name, tags) {
        return await retry_db(this.location, async (storage) => {
            const r = await storage.get(name);
            if (r) {
                const obj = JSON.parse(r);
                obj.tags = tags;
                await storage.put(name, JSON.stringify(obj));
                return true;
            }
            return false;
        });
    }
    async list(filter) {
        if (filter && filter.tags)
            filter.tags = filter.tags.filter(v => v !== '' && v);
        return await retry_db(this.location, async (storage) => {
            return (await storage.iterator().all()).filter(v => {
                const obj = JSON.parse(v[1]);
                if (filter?.name && v[0] !== filter.name)
                    return false;
                if (filter?.address && obj.address !== filter.address)
                    return false;
                if (filter?.tags && filter.tags.length > 0) {
                    if (!obj.tags || obj.tags.length === 0)
                        return false;
                    for (let i = 0; i < filter.tags.length; ++i) {
                        if (!obj.tags.includes(filter.tags[i])) {
                            return false;
                        }
                    }
                }
                return true;
            }).map(v => { return { name: v[0], data: v[1] }; });
        });
    }
}
;
export class LocalInfo {
    constructor() {
        this.location = LocalInfoLocation;
        if (!isBrowser()) {
            this.location = path.join(path.join(os.homedir(), '.wowok'), LocalInfoLocation);
        }
    }
    static Instance() {
        if (!LocalInfo._instance) {
            LocalInfo._instance = new LocalInfo();
        }
        ;
        return LocalInfo._instance;
    }
    async put(name = LocalInfoNameDefault, content, bDefault = true) {
        await retry_db(this.location, async (storage) => {
            const r = await storage.get(name);
            if (r) {
                const obj = JSON.parse(r);
                obj.others = obj.others ? [...obj.others, content] : [content];
                if (bDefault) {
                    obj.default = content;
                }
                await storage.put(name, JSON.stringify(obj));
            }
            else {
                const obj = { default: content, others: [content] };
                await storage.put(name, JSON.stringify(obj));
            }
        });
    }
    async get(name = LocalInfoNameDefault) {
        return await retry_db(this.location, async (storage) => {
            const r = (await storage.get(name));
            if (r) {
                return JSON.parse(r);
            }
        });
    }
    async get_default(name = LocalInfoNameDefault) {
        return await retry_db(this.location, async (storage) => {
            const r = await storage.get(name);
            if (r) {
                return JSON.parse(r)?.default;
            }
        });
    }
    async del(name = LocalInfoNameDefault) {
        return await retry_db(this.location, async (storage) => {
            await storage.del(name);
        });
    }
    async del_content(name = LocalInfoNameDefault, index) {
        return await retry_db(this.location, async (storage) => {
            const r = await storage.get(name);
            if (r) {
                const obj = JSON.parse(r);
                if (obj.others && index < obj.others.length) {
                    obj.others.splice(index, 1);
                    await storage.put(name, JSON.stringify(obj));
                    return true;
                }
            }
            return false;
        });
    }
    async clear() {
        return await retry_db(this.location, async (storage) => {
            await storage.clear();
        });
    }
    async list() {
        return await retry_db(this.location, async (storage) => {
            return (await storage.iterator().all()).map(v => { return { name: v[0], data: v[1] }; });
        });
    }
}
//# sourceMappingURL=local.js.map