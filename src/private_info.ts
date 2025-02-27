import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { BuyRequiredEnum } from 'wowok';

const Private_FileName = 'wowok.sel.dat';
const Private_Key = 'wowok-sel-v1';

export interface PrivateInfo_Data {
    name: string; 
    default?: boolean;
    info: Map<BuyRequiredEnum | string, string>;
}

export class PrivateInfo {
    constructor(storage: 'File' | 'Explorer' = 'File') {
        this.storage = storage;
    }
    static _instance: any;
    
    static Instance() : PrivateInfo {
        if (!PrivateInfo._instance) {
            PrivateInfo._instance = new PrivateInfo();
        }; return PrivateInfo._instance
    }

    private storage: 'File' | 'Explorer' = 'File';

    private _add(buffer:string | null | undefined, name:string, info:Map<BuyRequiredEnum | string, string>, bDefault?: boolean) : PrivateInfo_Data[] | undefined{
        var data : PrivateInfo_Data[] | undefined;

        try {
            if (buffer) {
                data = JSON.parse(buffer) as PrivateInfo_Data[];       
                if (data) {
                    const f = data.find(v => v.name === name);
                    if (f) {
                        f.default = bDefault;
                        f.info = info;
                    } else {
                        if (bDefault) {
                            data.forEach(v => v.default = false)
                        }
                        data.push({name:name, info:info, default:bDefault})
                    }
                } else {
                    data = [{name:name, info:info, default:bDefault}];
                }
                return data
            }
        } catch(e) { console.log(e) }
    }

    private _remove(buffer:string | null | undefined, name:string) : PrivateInfo_Data[] | undefined{
        var data : PrivateInfo_Data[] | undefined;

        try {
            if (buffer) {
                data = JSON.parse(buffer) as PrivateInfo_Data[];       
                if (data) {
                    return data.filter(v => v.name !== name);
                }
            }
        } catch(e) { console.log(e) }
    }

    private _default(buffer:string | null | undefined) : PrivateInfo_Data | undefined {
        var data : PrivateInfo_Data[] | undefined;
        try {
            if (buffer) {
                data = JSON.parse(buffer) as PrivateInfo_Data[];      
                if (data) {
                    const f = data.find(v => v.default);
                    if (f) {
                        return f
                    } 
                }       
            }
        } catch(e) { console.log(e) }
    }
    private _get(buffer:string | null | undefined, name?:string, bNotFoundReturnDefault?:boolean) : PrivateInfo_Data | undefined {
        var data : PrivateInfo_Data[] | undefined;
        try {
            if (buffer) {
                data = JSON.parse(buffer) as PrivateInfo_Data[];  
                if (data) {
                    const f = data.find(v => v.name === name);
                    if (f) {
                        return f
                    } 
                    if (bNotFoundReturnDefault) {
                        return data.find(v => v.default)
                    }
                }           
            }
        } catch(e) { console.log(e) }
    }

    private _rename(buffer:string | null | undefined, oldName:string, newName:string, bSwapIfExisted:boolean=true) : PrivateInfo_Data[] | undefined {
        var data : PrivateInfo_Data[] | undefined;
        try {
            if (buffer) {
                data = JSON.parse(buffer) as PrivateInfo_Data[];            
            
                if (data) {
                    const f1 = data.find(v => v.name === oldName);
                    if (!f1) return undefined;
        
                    const f2 = data.find(v => v.name === newName);
                    if (f2) {
                        if (bSwapIfExisted) {
                            f1.name = newName;
                            f2.name = oldName;
                            return data
                        } 
                    } else {
                        f1.name = newName;
                        return data;
                    }
                } 
            }
        } catch(e) { console.log(e) }
    }
    
    set_storage(storage: 'File' | 'Explorer' = 'File') {
        this.storage = storage
    }

    default() : PrivateInfo_Data | undefined {
        try {
            if (this.storage === 'File') {
                const filePath = path.join(os.homedir(), Private_FileName);
                return this._default(fs.readFileSync(filePath, 'utf-8'));
            } else if (this.storage === 'Explorer') {
                return this._default(localStorage.getItem(Private_Key));
            }            
        } catch (e) { console.log(e) }
    }
    get(name?: string, bNotFoundReturnDefault:boolean=true) : PrivateInfo_Data | undefined {  
        try {
            if (this.storage === 'File') {
                const filePath = path.join(os.homedir(), Private_FileName);
                return this._get(fs.readFileSync(filePath, 'utf-8'), name, bNotFoundReturnDefault);
            } else if (this.storage === 'Explorer') {
                return this._get(localStorage.getItem(Private_Key), name, bNotFoundReturnDefault);
            }            
        } catch (e) { console.log(e) }
    }
    rename(oldName:string, newName:string, bSwapIfExisted:boolean=true) : boolean {
        var res : PrivateInfo_Data[] | undefined;
        try {
            if (this.storage === 'File') {
                const filePath = path.join(os.homedir(), Private_FileName);
                res = this._rename(fs.readFileSync(filePath, 'utf-8'), oldName, newName, bSwapIfExisted);
                if (res) {fs.writeFileSync(filePath, JSON.stringify(res), 'utf-8') }
            } else if (this.storage === 'Explorer') {
                res = this._rename(localStorage.getItem(Private_Key), oldName, newName, bSwapIfExisted);
                if (res) localStorage.setItem(Private_Key, JSON.stringify(res));
            }            
        } catch (e) { console.log(e) }
        return res ? true : false
    }

    list() : PrivateInfo_Data[] {
        try {
            if (this.storage === 'File') {
                const filePath = path.join(os.homedir(), Private_FileName);
                return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as PrivateInfo_Data[];
            } else if (this.storage === 'Explorer') {
                return JSON.parse(localStorage.getItem(Private_Key) ?? '') as PrivateInfo_Data[];
            }            
        } catch (e) { console.log(e) }
        return []
    }
    
    add(name:string, info:Map<BuyRequiredEnum | string, string>, bDefault?: boolean) {       
        try {
            if (this.storage === 'File') {
                const filePath = path.join(os.homedir(), Private_FileName);
                fs.readFile(filePath, 'utf-8', (err, d) => {
                    const data = this._add(d, name, info, bDefault);
                    fs.writeFileSync(filePath, JSON.stringify(data), 'utf-8')                    
                });
            } else if (this.storage === 'Explorer') {
                const data = this._add(localStorage.getItem(Private_Key), name, info, bDefault);
                localStorage.setItem(Private_Key, JSON.stringify(data))
            }            
        } catch (e) { console.log(e) }
    }
    
    remove(name:string) {
        try {
            if (this.storage === 'File') {
                const filePath = path.join(os.homedir(), Private_FileName);
                fs.readFile(filePath, 'utf-8', (err, d) => {
                    const data = this._remove(d, name);
                    fs.writeFileSync(filePath, JSON.stringify(data), 'utf-8')                    
                });
            } else if (this.storage === 'Explorer') {
                const data = this._remove(localStorage.getItem(Private_Key), name);
                localStorage.setItem(Private_Key, JSON.stringify(data))
            }            
        } catch (e) { console.log(e) }
    }

    removeall() {
        try {
            if (this.storage === 'File') {
                const filePath = path.join(os.homedir(), Private_FileName);
                fs.unlink(filePath, (err) => {console.log(err)});
            } else if (this.storage === 'Explorer') {
                localStorage.removeItem(Private_Key)
            }            
        } catch (e) { console.log(e) }   
    }
}

