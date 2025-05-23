import { TransactionBlock, IsValidArgType, PassportObject, IsValidAddress, Errors, ERROR, Permission, PermissionIndex,
    PermissionIndexType, Treasury, Treasury_WithdrawMode, WithdrawParam, 
} from 'wowok';
import { query_objects, ObjectTreasury } from '../query/objects.js';
import { CallBase, CallResult, Namedbject } from "./base.js";
import { Account } from '../local/account.js';
import { LocalMark } from '../local/local.js';
import { get_object_address } from '../common.js';

/// The execution priority is determined by the order in which the object attributes are arranged
export interface CallTreasury_Data {
    type_parameter: string;
    object?: {address:string} | {namedNew?: Namedbject}; // undefined or {named_new...} for creating a new object
    permission?: {address:string} | {namedNew?: Namedbject, description?:string}; 
    description?: string;
    deposit?: {data:{balance:string|number; index?:number|string; remark?:string; for_object?:string; for_guard?:string}; guard?:string};
    receive?: {payment:string; received_object:string};
    withdraw?: WithdrawParam;
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
        var [permission_address, object_address, treasury_address] = 
            await LocalMark.Instance().get_many_address(
                [(this.data?.permission as any)?.address, 
                (this.data?.object as any)?.address]);

        if (object_address) {
            if (!this.data.type_parameter || !permission_address) {
                await this.update_content(object_address, 'Treasury');
                if (this.content) {
                    permission_address = (this.content as ObjectTreasury).permission;     
                    this.data.type_parameter =  this.content.type_raw!;             
                }
            } 
        } else {
            if (!this.data?.type_parameter || !IsValidArgType(this.data.type_parameter)) {
                ERROR(Errors.IsValidArgType, 'CallTreasury_Data.data.type_parameter')
            }
        }

        if (permission_address) {
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
            if (this.data?.deposit !== undefined) {
                if (this.data.deposit.guard) {
                    const guard = await LocalMark.Instance().get_address(this.data?.deposit?.guard);
                    if (guard) {
                        guards.push(guard)
                    }
                } else {
                    if (!object_address) {
                        const guard = await LocalMark.Instance().get_address(this.data.deposit_guard);
                        if (guard) {
                            guards.push(guard);
                        }
                    } else {
                        await this.update_content(object_address, 'Treasury');
    
                        if ((this.content as ObjectTreasury)?.deposit_guard) {
                            guards.push((this.content as ObjectTreasury).deposit_guard!)
                        }                         
                    }
                }
            }
            if (this.data?.receive !== undefined) {
                perms.push(PermissionIndex.treasury_receive)
            }
            if (this.data?.withdraw?.withdraw_guard !== undefined) { // withdraw with guard
                const guard = await get_object_address(this.data.withdraw.withdraw_guard);
                if (guard) {
                    guards.push(guard)
                } 
            } else { // withdraw with permission
                perms.push(PermissionIndex.treasury_withdraw)
            }
            return await this.check_permission_and_call(permission_address, perms, guards, checkOwner, undefined, account)
        }
        return await this.exec(account);
    }
    protected async operate (txb:TransactionBlock, passport?:PassportObject, account?:string) {
        let obj : Treasury | undefined ; let permission: any; 
        var [permission_address, object_address] = this?.content ? 
            [(this.content as ObjectTreasury).permission, this.content.object] : 
            await LocalMark.Instance().get_many_address(
                [(this.data?.permission as any)?.address, 
                (this.data?.object as any)?.address]);

        if (!object_address) {
            if (!permission_address) {
                const d = (this.data?.permission as any)?.description ?? '';
                permission = Permission.New(txb, d);
            }
            obj = Treasury.New(txb, this.data.type_parameter!, permission ? permission.get_object() : permission_address, this.data?.description??'', permission?undefined:passport)
        } else {
            if (this.data.type_parameter && permission_address) {
                obj = Treasury.From(txb, this.data.type_parameter, permission_address, object_address)
            } else {
                ERROR(Errors.InvalidParam, 'CallTreasury_Data.data.type_parameter or permission')
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
                        for_guard:await get_object_address(this.data.deposit.data?.for_guard),
                        for_object:await get_object_address(this.data.deposit.data?.for_object)
                    })
                }
            }
            if (this.data?.receive !== undefined) {
                const [payment, receive] = await LocalMark.Instance().get_many_address([this.data.receive.payment, this.data.receive.received_object])
                if (payment && receive) obj?.receive(payment, receive, pst); 
            }

            if (this.data?.withdraw !== undefined) {
                this.data.withdraw.for_guard = await get_object_address(this.data.withdraw.for_guard);
                this.data.withdraw.for_object = await get_object_address(this.data.withdraw.for_object);
                this.data.withdraw.withdraw_guard = await get_object_address(this.data.withdraw.withdraw_guard);
                obj?.withdraw(this.data.withdraw, pst)
            }

            if (this.data?.deposit_guard !== undefined) {
                const guard = await LocalMark.Instance().get_address(this.data?.deposit_guard);
                obj?.set_deposit_guard(guard, pst);
            }
            if (this.data?.withdraw_guard !== undefined) {
                switch (this.data.withdraw_guard.op) {
                    case 'add':
                    case 'set':
                        if (this.data.withdraw_guard.op === 'set') obj?.remove_withdraw_guard([], true, pst);
                        for (let i = 0; i < this.data.withdraw_guard.data.length; ++ i) {
                            let v = this.data.withdraw_guard.data[i];
                            const guard = await LocalMark.Instance().get_address(v.guard);
                            if (guard) obj?.add_withdraw_guard(guard, BigInt(v.amount), pst);
                        }
                        break;
                    case 'remove':
                        obj?.remove_withdraw_guard(await LocalMark.Instance().get_many_address2(this.data.withdraw_guard.guards), false, pst)
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
                await this.new_with_mark('Permission', txb, permission.launch(), (this.data?.permission as any)?.namedNew, account);
            }
            if (!object_address) {
                await this.new_with_mark('Treasury', txb, obj.launch(), (this.data?.object as any)?.namedNew, account);
            } 
        }
    }
}