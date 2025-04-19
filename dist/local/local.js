/**
 * manage object's name and tags locally
 */
import path from "path";
import os from "os";
import { Level } from "level";
import { isBrowser } from "../common.js";
import { IsValidAddress, TagName } from "wowok";
import { Account } from "./account.js";
export const LocalMarkLocation = 'wowok-mark';
export const LocalInfoLocation = 'wowok-info';
export const LocalMarkNameMaxLength = 32;
export const LocalInfoNameDefault = 'Address of delivery';
export class LocalMark {
    constructor() {
        var location = LocalMarkLocation;
        if (!isBrowser()) {
            location = path.join(path.join(os.homedir(), '.wowok'), LocalMarkLocation);
        }
        this.storage = new Level(location, { valueEncoding: 'json' });
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
        if (!IsValidAddress(mark.object) && mark.object !== '0x2' && mark.object !== '0x6') {
            return false;
        }
        ;
        // use address as name if name is undefined or null
        if (name === undefined || name === null) {
            this.storage.put(mark.object, JSON.stringify(mark));
            return true;
        }
        if (name.length > LocalMarkNameMaxLength) {
            name = name.substring(0, LocalMarkNameMaxLength);
        }
        ;
        const r = await this.storage.get(name);
        if (r) {
            if (useAddressIfNameExist) {
                this.storage.put(mark.object, JSON.stringify(mark));
                return true;
            }
            else {
                const obj = JSON.parse(r);
                await this.storage.put(obj.object, r);
            }
        }
        await this.storage.put(name, JSON.stringify(mark));
        return true;
    }
    async get(name) {
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
    async get_account(name_or_address, genNewIfNotFound = false) {
        if (name_or_address === undefined) {
            return Account.Instance().default(genNewIfNotFound);
        }
        else {
            const r = await this.get(name_or_address);
            if (r) {
                return r.object;
            }
            else {
                if (IsValidAddress(name_or_address)) {
                    return name_or_address;
                }
                if (genNewIfNotFound) {
                    const addr = await Account.Instance().gen(false);
                    await this.put(name_or_address, { object: addr, tags: [TagName.Account] });
                }
            }
        }
    }
    async del(name) {
        return await this.storage.del(name);
    }
    async clear() {
        return await this.storage.clear();
    }
    async rename(name, new_name) {
        if (new_name.length > LocalMarkNameMaxLength) {
            new_name = new_name.substring(0, LocalMarkNameMaxLength);
        }
        ;
        const r = await this.storage.getMany([name, new_name]);
        if (r[0] && !r[1]) {
            await this.storage.put(new_name, r[0]);
            await this.storage.del(name);
            return true;
        }
        return false;
    }
    async swap_name(name1, name2) {
        const r = await this.storage.getMany([name1, name2]);
        if (r[0] && r[1]) {
            await this.storage.put(name1, r[1]);
            await this.storage.put(name2, r[0]);
            return true;
        }
        return false;
    }
    async set_tags(name, tags) {
        const r = await this.storage.get(name);
        if (r) {
            const obj = JSON.parse(r);
            obj.tags = tags;
            await this.storage.put(name, JSON.stringify(obj));
            return true;
        }
        return false;
    }
    async list(filter) {
        return (await this.storage.iterator().all()).filter(v => {
            const obj = JSON.parse(v[1]);
            if (filter?.name && v[0] !== filter.name)
                return false;
            if (filter?.object && obj.object !== filter.object)
                return false;
            if (filter?.tags && obj.tags) {
                for (let i = 0; i < filter.tags.length; ++i) {
                    if (!obj.tags.includes(filter.tags[i]))
                        return false;
                }
            }
            return true;
        }).map(v => { return { name: v[0], data: v[1] }; });
    }
}
;
export class LocalInfo {
    constructor() {
        var location = LocalInfoLocation;
        if (!isBrowser()) {
            location = path.join(path.join(os.homedir(), '.wowok'), LocalInfoLocation);
        }
        this.storage = new Level(location, { valueEncoding: 'json' });
    }
    static Instance() {
        if (!LocalInfo._instance) {
            LocalInfo._instance = new LocalInfo();
        }
        ;
        return LocalInfo._instance;
    }
    async put(name = LocalInfoNameDefault, content, bDefault = true) {
        const r = await this.storage.get(name);
        if (r) {
            const obj = JSON.parse(r);
            obj.others = obj.others ? [...obj.others, content] : [content];
            if (bDefault) {
                obj.default = content;
            }
            await this.storage.put(name, JSON.stringify(obj));
        }
        else {
            const obj = { default: content, others: [content] };
            await this.storage.put(name, JSON.stringify(obj));
        }
    }
    async get(name = LocalInfoNameDefault) {
        const r = await this.storage.get(name);
        if (r) {
            return JSON.parse(r);
        }
    }
    async get_default(name = LocalInfoNameDefault) {
        const r = await this.storage.get(name);
        if (r) {
            return JSON.parse(r).default;
        }
    }
    async del(name = LocalInfoNameDefault) {
        await this.storage.del(name);
    }
    async del_content(name = LocalInfoNameDefault, index) {
        const r = await this.storage.get(name);
        if (r) {
            const obj = JSON.parse(r);
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
    async list() {
        return (await this.storage.iterator().all()).map(v => { return { name: v[0], data: v[1] }; });
    }
}
//# sourceMappingURL=local.js.map