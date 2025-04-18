/**
 * manage object's name and tags locally
 */
import path from "path";
import os from "os";
import { Level } from "level";
import { isBrowser } from "./common.js";
export const LocalMarkLocation = 'wowok-mark';
export const LocalInfoLocation = 'wowok-info';
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
    async put(name, mark, replaceIfExist = true) {
        if (await this.storage.get(name)) {
            if (!replaceIfExist) {
                return false;
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
    async del(name) {
        return await this.storage.del(name);
    }
    async clear() {
        return await this.storage.clear();
    }
    async rename(name, new_name) {
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
}
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
    async put(name, content, bDefault = true) {
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
    async get(name) {
        const r = await this.storage.get(name);
        if (r) {
            return JSON.parse(r);
        }
    }
    async get_default(name) {
        const r = await this.storage.get(name);
        if (r) {
            return JSON.parse(r).default;
        }
    }
    async del(name) {
        return await this.storage.del(name);
    }
    async del_content(name, index) {
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
}
//# sourceMappingURL=local.js.map