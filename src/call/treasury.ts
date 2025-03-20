import { TransactionBlock, IsValidArgType, PassportObject, IsValidAddress, Errors, ERROR, Permission, PermissionIndex,
    PermissionIndexType, Treasury, Treasury_WithdrawMode, WithdrawParam, 
} from 'wowok';
import { query_objects, ObjectTreasury } from '../objects';
import { CallBase, CallResult, Namedbject } from "./base";
import { Account } from '../account';

/// The execution priority is determined by the order in which the object attributes are arranged
export interface CallTreasury_Data {
    type_parameter: string;
    object?: {address:string} | {namedNew: Namedbject}; // undefined or {named_new...} for creating a new object
    permission?: {address:string} | {namedNew: Namedbject, description?:string}; 
    description?: string;
    deposit?: {data:{balance:string|number; index?:number; remark?:string; for_object?:string; for_guard?:string}; guard?:string | 'fetch'};
    receive?: {payment:string; received_object:string};
    withdraw?:WithdrawParam;
    deposit_guard?: string;
    withdraw_guard?: {op:'add' | 'set'; data:{guard:string, amount:string|number}[]} | {op:'remove', guards:string[]} | {op:'removeall'};
    withdraw_mode?: Treasury_WithdrawMode;
}
export class CallTreasury extends CallBase {
    data: CallTreasury_Data;
    constructor(data:CallTreasury_Data) {
        super();
        this.data = data;
    }
    
    async call(account?:string) : Promise<CallResult>  {
        if (!this.data.type_parameter || !IsValidArgType(this.data.type_parameter)) {
            ERROR(Errors.IsValidArgType, 'treasury.type_parameter');
        }

        var checkOwner = false; const guards : string[] = [];
        const perms : PermissionIndexType[] = [];  var obj: ObjectTreasury | undefined ;
        const permission_address = (this.data?.permission as any)?.address;
        const object_address = (this.data?.object as any)?.address;

        if (permission_address && IsValidAddress(permission_address)) {
            if (!this.data?.object) {
                perms.push(PermissionIndex.treasury)
            }
            if (this.data?.description !== undefined && object_address) {
                perms.push(PermissionIndex.treasury_descritption)
            }
            if (this.data?.withdraw_mode !== undefined) {
                perms.push(PermissionIndex.treasury_withdraw_mode)
            }
            if (this.data?.withdraw_guard == undefined) { // publish is an irreversible one-time operation 
                perms.push(PermissionIndex.treasury_withdraw_guard)
            }
            if (this.data?.deposit_guard !== undefined) {
                perms.push(PermissionIndex.treasury_deposit_guard)
            }
            if (this.data?.deposit_guard !== undefined) {
                perms.push(PermissionIndex.treasury_deposit_guard)
            }
            if (this.data?.deposit?.guard !== undefined) {
                if (IsValidAddress(this.data.deposit.guard)) {
                    guards.push(this.data.deposit.guard)
                } else {
                    if (!this.data.object) {
                        if (this.data?.deposit_guard && IsValidAddress(this.data?.deposit_guard)) {
                            guards.push(this.data.deposit_guard)
                        }
                    } else {
                        if (!obj) {
                            const r = await query_objects({objects:[object_address], showContent:true});
                            if (r?.objects && r.objects[0].type === 'Treasury') {
                                obj = r.objects[0] as ObjectTreasury;
                            }
                        }
                        if (obj?.deposit_guard) {
                            guards.push(obj?.deposit_guard)
                        }                        
                    }

                }
            }
            if (this.data?.receive !== undefined) {
                perms.push(PermissionIndex.treasury_receive)
            }
            if (this.data?.withdraw?.withdraw_guard !== undefined) {
                if (typeof(this.data.withdraw.withdraw_guard) === 'string' && IsValidAddress(this.data.withdraw.withdraw_guard)) {
                    guards.push(this.data.withdraw.withdraw_guard)
                } else if (this.data.object) {
                    if (!obj) {
                        const r = await query_objects({objects:[object_address], showContent:true});
                        if (r?.objects && r.objects[0].type === 'Treasury') {
                            obj = r.objects[0] as ObjectTreasury;
                        }
                    }
                    if (typeof(obj?.withdraw_guard) === 'string') {
                        guards.push(obj?.withdraw_guard)
                    }
                }
            } else {
                perms.push(PermissionIndex.treasury_withdraw)
            }
            return await this.check_permission_and_call(permission_address, perms, guards, checkOwner, undefined, account)
        }
        return await this.exec(account);
    }
    protected async operate (txb:TransactionBlock, passport?:PassportObject, account?:string) {
        let obj : Treasury | undefined ; let permission: any; 
        const permission_address = (this.data?.permission as any)?.address;
        const object_address = (this.data?.object as any)?.address;

        if (!object_address) {
            if (!permission_address || !IsValidAddress(permission_address)) {
                const d = (this.data?.permission as any)?.description ?? '';
                permission = Permission.New(txb, d);
            }
            obj = Treasury.New(txb, this.data.type_parameter!, permission ? permission.get_object() : permission_address, this.data?.description??'', permission?undefined:passport)
        } else {
            if (IsValidAddress(object_address) && this.data.type_parameter && permission_address && IsValidAddress(permission_address)) {
                obj = Treasury.From(txb, this.data.type_parameter, permission_address, object_address)
            } else {
                ERROR(Errors.InvalidParam, 'object or permission address invalid.')
            }
        }

        if (obj) {
            const pst = permission?undefined:passport;
            if (this.data?.description !== undefined && object_address) {
                obj?.set_description(this.data.description, pst);
            }
            if (this.data.deposit !== undefined) {
                const coin = await Account.Instance().get_coin_object(txb, this.data.deposit.data.balance, account, this.data.type_parameter);
                if (coin) {
                    const index = this.data.deposit.data?.index ?? 0;
                    obj?.deposit({coin:coin, index:BigInt(index), remark:this.data.deposit.data.remark ??'', 
                        for_guard:this.data.deposit.data?.for_guard,
                        for_object: this.data.deposit.data?.for_object
                    })
                }
            }
            if (this.data?.receive !== undefined) {
                obj?.receive(this.data.receive.payment, this.data.receive.received_object, pst); 
            }
            if (this.data?.withdraw !== undefined) {
                obj?.withdraw(this.data.withdraw, pst)
            }

            if (this.data?.deposit_guard !== undefined) {
                obj?.set_deposit_guard(this.data.deposit_guard, pst);
            }
            if (this.data?.withdraw_guard !== undefined) {
                switch (this.data.withdraw_guard.op) {
                    case 'add':
                        this.data.withdraw_guard.data.forEach(v => obj?.add_withdraw_guard(v.guard, BigInt(v.amount), pst))
                        break;
                    case 'remove':
                        obj?.remove_withdraw_guard(this.data.withdraw_guard.guards, false, pst)
                        break;
                    case 'set':
                        obj?.remove_withdraw_guard([], true, pst)
                        this.data.withdraw_guard.data.forEach(v => obj?.add_withdraw_guard(v.guard, BigInt(v.amount), pst))
                        break;
                    case 'removeall':
                        obj?.remove_withdraw_guard([], true, pst)
                        break;
                }
            }
            if (this.data?.withdraw_mode !== undefined) {
                obj?.set_withdraw_mode(this.data.withdraw_mode, pst)
            }
            if (permission) {
                await this.new_with_mark(txb, permission.launch(), (this.data?.permission as any)?.namedNew, account);
            }
            if (!object_address) {
                await this.new_with_mark(txb, obj.launch(), (this.data?.object as any)?.namedNew, account);
            } 
        }
    }
}