import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Ed25519Keypair, fromHEX } from 'wowok';

export interface AccountData {
    name: string; 
    default?: boolean;
    key: string;
}

const Account_FileName = 'wowok.dat';
const Account_Key = 'wowok-data-v1';

export class Account {
    constructor(storage: 'File' | 'Explorer' = 'File') {
        this.storage = storage;
    }
    static _instance: any;
    
    static Instance() : Account {
        if (!Account._instance) {
            Account._instance = new Account();
        }; return Account._instance
    }

    private storage: 'File' | 'Explorer' = 'File';

    private _add(buffer:string | null | undefined, name:string, bDefault?: boolean) : AccountData[] {
        var data : AccountData[] | undefined;
        try {
            if (buffer) {
                data = JSON.parse(buffer) as AccountData[];            
            }
        } catch(_) {}

        if (data) {
            const f = data.find(v => v.name === name);
            if (f) {
                f.default = bDefault;
            } else {
                if (bDefault) {
                    data.forEach(v => v.default = false)
                }
                data.push({name:name, key:Ed25519Keypair.generate().getSecretKey(), default:bDefault})
            }
        } else {
            data = [{name:name, key:Ed25519Keypair.generate().getSecretKey(), default:bDefault}];
        }
        return data
    }

    private _default(buffer:string | null | undefined) : AccountData | undefined {
        var data : AccountData[] | undefined;
        try {
            if (buffer) {
                data = JSON.parse(buffer) as AccountData[];            
            }
        } catch(_) {}

        if (data) {
            const f = data.find(v => v.default);
            if (f) {
                return f
            } 
        } 
    }
    private _get(buffer:string | null | undefined, name?:string, bNotFoundReturnDefault?:boolean) : AccountData | undefined {
        var data : AccountData[] | undefined;
        try {
            if (buffer) {
                data = JSON.parse(buffer) as AccountData[];            
            }
        } catch(_) {}

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
    private _rename(buffer:string | null | undefined, oldName:string, newName:string, bSwapIfExisted:boolean=true) : boolean {
        var data : AccountData[] | undefined;
        try {
            if (buffer) {
                data = JSON.parse(buffer) as AccountData[];            
            }
        } catch(_) {}

        if (data) {
            const f1 = data.find(v => v.name === oldName);
            if (!f1) return false;

            const f2 = data.find(v => v.name === newName);
            if (f2) {
                if (bSwapIfExisted) {
                    f1.name = newName;
                    f2.name = oldName;
                    return true
                } 
            } else {
                f1.name = newName;
                return true;
            }
        } 
        return false
    }
    
    set_storage(storage: 'File' | 'Explorer' = 'File') {
        this.storage = storage
    }

    gen(name:string, bDefault?: boolean) {       
        try {
            if (this.storage === 'File') {
                const filePath = path.join(os.homedir(), Account_FileName);
                const data = this._add(fs.readFileSync(filePath, 'utf-8'), name, bDefault);
                fs.writeFileSync(filePath, JSON.stringify(data), 'utf8')
            } else if (this.storage === 'Explorer') {
                const data = this._add(localStorage.getItem(Account_Key), name, bDefault);
                localStorage.setItem(Account_Key, JSON.stringify(data))
            }            
        } catch (_) {}
    }
    default() : AccountData | undefined {
        try {
            if (this.storage === 'File') {
                const filePath = path.join(os.homedir(), Account_FileName);
                return this._default(fs.readFileSync(filePath, 'utf-8'));
            } else if (this.storage === 'Explorer') {
                return this._default(localStorage.getItem(Account_Key));
            }            
        } catch (_) {}
    }
    get(name?: string, bNotFoundReturnDefault:boolean=true) : AccountData | undefined {  
        try {
            if (this.storage === 'File') {
                const filePath = path.join(os.homedir(), Account_FileName);
                return this._get(fs.readFileSync(filePath, 'utf-8'), name, bNotFoundReturnDefault);
            } else if (this.storage === 'Explorer') {
                return this._get(localStorage.getItem(Account_Key), name, bNotFoundReturnDefault);
            }            
        } catch (_) {}
    }
    rename(oldName:string, newName:string, bSwapIfExisted:boolean=true) : boolean {
        try {
            if (this.storage === 'File') {
                const filePath = path.join(os.homedir(), Account_FileName);
                return this._rename(fs.readFileSync(filePath, 'utf-8'), oldName, newName, bSwapIfExisted);
            } else if (this.storage === 'Explorer') {
                return this._rename(localStorage.getItem(Account_Key), oldName, newName, bSwapIfExisted);
            }            
        } catch (_) {}
        return false
    }

    get_address(name?:string, bNotFoundReturnDefault=true) : string | undefined {
        const a = this.get(name, bNotFoundReturnDefault);
        if (a) {
            return Ed25519Keypair.fromSecretKey(fromHEX(a.key)).getPublicKey().toSuiAddress()
        }
    }
    get_pubkey(name?:string, bNotFoundReturnDefault=true) : string | undefined {
        const a = this.get(name, bNotFoundReturnDefault);
        if (a) {
            return Ed25519Keypair.fromSecretKey(fromHEX(a.key)).getPublicKey().toSuiPublicKey()
        }
    }
    get_pair(name?:string, bNotFoundReturnDefault=true) : Ed25519Keypair | undefined {
        const a = this.get(name, bNotFoundReturnDefault);
        if (a) {
            return Ed25519Keypair.fromSecretKey(fromHEX(a.key))
        }
    }
}