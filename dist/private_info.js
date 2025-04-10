import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
const Private_FileName = 'wowok.sel.dat';
const Private_Key = 'wowok-sel-v1';
export class PrivateInfo {
    constructor(storage = 'File') {
        this.storage = 'File';
        this.storage = storage;
    }
    static Instance() {
        if (!PrivateInfo._instance) {
            PrivateInfo._instance = new PrivateInfo();
        }
        ;
        return PrivateInfo._instance;
    }
    _add(buffer, name, info, bDefault) {
        var data;
        try {
            if (buffer) {
                data = JSON.parse(buffer);
                if (data) {
                    const f = data.find(v => v.name === name);
                    if (f) {
                        f.default = bDefault;
                        f.info = info;
                    }
                    else {
                        if (bDefault) {
                            data.forEach(v => v.default = false);
                        }
                        data.push({ name: name, info: info, default: bDefault });
                    }
                }
                else {
                    data = [{ name: name, info: info, default: bDefault }];
                }
                return data;
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    _remove(buffer, name) {
        var data;
        try {
            if (buffer) {
                data = JSON.parse(buffer);
                if (data) {
                    return data.filter(v => v.name !== name);
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    _default(buffer) {
        var data;
        try {
            if (buffer) {
                data = JSON.parse(buffer);
                if (data) {
                    const f = data.find(v => v.default);
                    if (f) {
                        return f;
                    }
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    _get(buffer, name, bNotFoundReturnDefault) {
        var data;
        try {
            if (buffer) {
                data = JSON.parse(buffer);
                if (data) {
                    const f = data.find(v => v.name === name);
                    if (f) {
                        return f;
                    }
                    if (bNotFoundReturnDefault) {
                        return data.find(v => v.default);
                    }
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    _rename(buffer, oldName, newName, bSwapIfExisted = true) {
        var data;
        try {
            if (buffer) {
                data = JSON.parse(buffer);
                if (data) {
                    const f1 = data.find(v => v.name === oldName);
                    if (!f1)
                        return undefined;
                    const f2 = data.find(v => v.name === newName);
                    if (f2) {
                        if (bSwapIfExisted) {
                            f1.name = newName;
                            f2.name = oldName;
                            return data;
                        }
                    }
                    else {
                        f1.name = newName;
                        return data;
                    }
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    set_storage(storage = 'File') {
        this.storage = storage;
    }
    default() {
        try {
            if (this.storage === 'File') {
                const filePath = path.join(os.homedir(), Private_FileName);
                return this._default(fs.readFileSync(filePath, 'utf-8'));
            }
            else if (this.storage === 'Explorer') {
                return this._default(localStorage.getItem(Private_Key));
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    get(name, bNotFoundReturnDefault = true) {
        try {
            if (this.storage === 'File') {
                const filePath = path.join(os.homedir(), Private_FileName);
                return this._get(fs.readFileSync(filePath, 'utf-8'), name, bNotFoundReturnDefault);
            }
            else if (this.storage === 'Explorer') {
                return this._get(localStorage.getItem(Private_Key), name, bNotFoundReturnDefault);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    rename(oldName, newName, bSwapIfExisted = true) {
        var res;
        try {
            if (this.storage === 'File') {
                const filePath = path.join(os.homedir(), Private_FileName);
                res = this._rename(fs.readFileSync(filePath, 'utf-8'), oldName, newName, bSwapIfExisted);
                if (res) {
                    fs.writeFileSync(filePath, JSON.stringify(res), 'utf-8');
                }
            }
            else if (this.storage === 'Explorer') {
                res = this._rename(localStorage.getItem(Private_Key), oldName, newName, bSwapIfExisted);
                if (res)
                    localStorage.setItem(Private_Key, JSON.stringify(res));
            }
        }
        catch (e) {
            console.log(e);
        }
        return res ? true : false;
    }
    list() {
        try {
            if (this.storage === 'File') {
                const filePath = path.join(os.homedir(), Private_FileName);
                return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            }
            else if (this.storage === 'Explorer') {
                return JSON.parse(localStorage.getItem(Private_Key) ?? '');
            }
        }
        catch (e) {
            console.log(e);
        }
        return [];
    }
    add(name, info, bDefault) {
        try {
            if (this.storage === 'File') {
                const filePath = path.join(os.homedir(), Private_FileName);
                fs.readFile(filePath, 'utf-8', (err, d) => {
                    const data = this._add(d, name, info, bDefault);
                    fs.writeFileSync(filePath, JSON.stringify(data), 'utf-8');
                });
            }
            else if (this.storage === 'Explorer') {
                const data = this._add(localStorage.getItem(Private_Key), name, info, bDefault);
                localStorage.setItem(Private_Key, JSON.stringify(data));
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    remove(name) {
        try {
            if (this.storage === 'File') {
                const filePath = path.join(os.homedir(), Private_FileName);
                fs.readFile(filePath, 'utf-8', (err, d) => {
                    const data = this._remove(d, name);
                    fs.writeFileSync(filePath, JSON.stringify(data), 'utf-8');
                });
            }
            else if (this.storage === 'Explorer') {
                const data = this._remove(localStorage.getItem(Private_Key), name);
                localStorage.setItem(Private_Key, JSON.stringify(data));
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    removeall() {
        try {
            if (this.storage === 'File') {
                const filePath = path.join(os.homedir(), Private_FileName);
                fs.unlink(filePath, (err) => { console.log(err); });
            }
            else if (this.storage === 'Explorer') {
                localStorage.removeItem(Private_Key);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
}
//# sourceMappingURL=private_info.js.map