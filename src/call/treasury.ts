import { TransactionBlock, IsValidArgType, PassportObject, Errors, ERROR, Permission, PermissionIndex,
    PermissionIndexType, Treasury, Treasury_WithdrawMode, PermissionObject, GetRecievedBalanceObject
} from 'wowok';
import { query_objects, ObjectTreasury, Treasury_ReceivedObject, GuardWithAmount } from '../query/objects.js';
import { AccountOrMark_Address, CallBase, CallResult, GetAccountOrMark_Address, GetObjectExisted, 
    GetObjectMain, GetObjectParam, ObjectTypedMain, PayParam, TypeNamedObjectWithPermission } from "./base.js";
import { Account } from '../local/account.js';
import { LocalMark } from '../local/local.js';
import { get_object_address } from '../common.js';

export interface ReceiverParam {
    address: AccountOrMark_Address;
    amount: string|number;
}

export interface TreasuryWithdrawParam extends PayParam {
    receiver: ReceiverParam[];
    withdraw_guard?: string,
}

/// The execution priority is determined by the order in which the object attributes are arranged
export interface CallTreasury_Data {
    object: ObjectTypedMain;
    deposit?: {balance:string|number; param?:PayParam};
    receive?: {received_objects:string[]} | 'recently';
    withdraw?: TreasuryWithdrawParam;

    description?: string;
    deposit_guard?: string;
    withdraw_guard?: {op:'add' | 'set'; data:GuardWithAmount[]} | {op:'remove', guards:string[]} | {op:'removeall'};
    withdraw_mode?: Treasury_WithdrawMode;
}
export class CallTreasury extends CallBase {
    data: CallTreasury_Data;
    object_address: string | undefined = undefined;
    permission_address: string | undefined = undefined;
    type_parameter: string | undefined = undefined; 
    withdraw_guards: GuardWithAmount[] = [];

    constructor(data:CallTreasury_Data) {
        super();
        this.data = data;
    }
    
    protected async prepare(): Promise<void> {
        if (!this.object_address) {
            this.object_address = (await LocalMark.Instance().get_address(GetObjectExisted(this.data.object)));
        }

        if (this.object_address) {
            await this.update_content('Treasury', this.object_address);
            if (!this.content) ERROR(Errors.InvalidParam, 'CallArbitration_Data.data.object:' + this.object_address);                

            this.withdraw_guards = (this.content as ObjectTreasury).withdraw_guard;
            this.permission_address = (this.content as ObjectTreasury).permission;
            this.type_parameter = Treasury.parseObjectType((this.content as ObjectTreasury).type_raw);
        } else {
            const n = GetObjectMain(this.data.object) as TypeNamedObjectWithPermission;
            if (!IsValidArgType(n?.type_parameter)) {
                ERROR(Errors.IsValidArgType, 'CallTreasury_Data.data.object.type_parameter');
            }        
            this.permission_address = (await LocalMark.Instance().get_address(GetObjectExisted(n?.permission)));
            this.type_parameter = (n as any)?.type_parameter;
        } 
    }
    async call(account?:string) : Promise<CallResult>  {
        var checkOwner = false; const guards : string[] = [];
        const perms : PermissionIndexType[] = []; 

        await this.prepare();
        if (this.permission_address) {
            if (!this.data?.object) {
                perms.push(PermissionIndex.treasury)
            }
            if (this.data?.description != null && this.object_address) {
                perms.push(PermissionIndex.treasury_descritption)
            }
            if (this.data?.withdraw_mode != null) {
                perms.push(PermissionIndex.treasury_withdraw_mode)
            }
            if (this.data?.withdraw_guard != null) { // publish is an irreversible one-time operation 
                perms.push(PermissionIndex.treasury_withdraw_guard)
            }
            if (this.data?.deposit_guard != null) {
                perms.push(PermissionIndex.treasury_deposit_guard)
            }
            if (this.data?.deposit != null) {
                if (this.object_address) {
                    if ((this.content as ObjectTreasury)?.deposit_guard) {
                        guards.push((this.content as ObjectTreasury).deposit_guard!)
                    }
                }
            }
            if (this.data?.receive != null) {
                perms.push(PermissionIndex.treasury_receive)
            }

            if (this.data.withdraw !== null) {
                if (this.data?.withdraw?.withdraw_guard) { // withdraw with guard
                    const guard = await get_object_address(this.data.withdraw.withdraw_guard);
                    if (!guard) ERROR(Errors.InvalidParam, `CallTreasury_Data.withdraw.withdraw_guard ${this.data.withdraw.withdraw_guard}`)
                    const f = this.withdraw_guards.find(v => v.guard === guard);
                    if (!f) ERROR(Errors.Fail, `CallTreasury_Data.withdraw.withdraw_guard not found in existed Treasury object ${this.data.withdraw.withdraw_guard}`) 
                    let total:bigint = 0n;
                    this.data.withdraw.receiver.forEach(v => {
                        total += BigInt(v.amount);
                    });
                    console.log(total)
                    if (BigInt(f.max_withdrawal_amount) < total) ERROR(Errors.Fail, `CallTreasury_Data.withdraw.withdraw_guard: The total amount withdrawaled > the maximum limit(${f.max_withdrawal_amount}) set by the withdraw Guard  `)

                    if (guard) {
                        guards.push(guard)
                    } 
                } else { // withdraw with permission
                    perms.push(PermissionIndex.treasury_withdraw)
                }                
            }

            return await this.check_permission_and_call(this.permission_address, perms, guards, checkOwner, undefined, account)
        }
        return await this.exec(account);
    }
    protected async operate (txb:TransactionBlock, passport?:PassportObject, account?:string) {
        let obj : Treasury | undefined ; let perm: Permission | undefined;
        let permission : PermissionObject | undefined;
        
        if (this.object_address) {
            obj = Treasury.From(txb, this.type_parameter!, this.permission_address!, this.object_address);
            permission = this.permission_address;
        } else {
            const n = GetObjectMain(this.data.object) as TypeNamedObjectWithPermission;
            permission = await LocalMark.Instance().get_address(GetObjectExisted(n?.permission));
            if (!permission) {
                perm = Permission.New(txb, GetObjectParam(n?.permission)?.description ?? '');
                permission =  perm.get_object();
            }
            obj = Treasury.New(txb, this.type_parameter!, permission,
                this.data?.description??'', perm?undefined:passport)    
        }

        if (!obj) ERROR(Errors.InvalidParam, 'CallTreasury_Data.object:' + this.object_address);
        if (!permission) ERROR(Errors.InvalidParam, 'CallTreasury_Data.permission:' + this.permission_address);

        const pst = perm?undefined:passport;
        if (this.data.deposit != null) {
            const coin = await Account.Instance().get_coin_object(txb, this.data.deposit.balance, account, this.type_parameter);
            if (coin) {
                const index = this.data.deposit?.param?.index ?? 0;
                const [for_guard, for_object] = await LocalMark.Instance().get_many_address([this.data.deposit?.param?.for_guard, this.data.deposit?.param?.for_object])
                obj?.deposit({coin:coin, index:BigInt(index), remark:this.data.deposit?.param?.remark ??'', for_guard, for_object});
            }
        }
        if (this.data?.receive != null && this.object_address) {
            if (this.data.receive === 'recently') {
                const r = await GetRecievedBalanceObject(this.object_address, this.type_parameter!);
                if (!r) {
                    ERROR(Errors.InvalidParam, 'CallTreasury_Data.data.receive.received_objects');
                }
                r.received.forEach(v => {
                    obj?.receive(v.payment, v.id, pst);
                })
            } else if (this.data.receive?.received_objects?.length > 0) {
                const r = await query_objects({objects:this.data.receive.received_objects});
                if (r?.objects?.length!== this.data.receive.received_objects.length) {
                    ERROR(Errors.InvalidParam, 'CallTreasury_Data.data.receive.received_objects');
                }

                for (let i=0; i<r?.objects?.length; ++i) {
                    if (r.objects[i].type !== 'Treasury_ReceivedObject') {
                        ERROR(Errors.InvalidParam, 'CallTreasury_Data.data.receive.received_objects:'+ r.objects[i].object);
                    }
                    const v = r.objects[i] as Treasury_ReceivedObject;
                    obj?.receive(v.payment, v.object, pst);
                }
            }
        }

        if (this.data?.withdraw != null) {
            const [for_guard, for_object] = await LocalMark.Instance().get_many_address([this.data.withdraw?.for_guard, this.data.withdraw?.for_object]);
            const receiver = [];
            for (let i=0;i < this.data.withdraw.receiver.length; ++i) {
                const v = this.data.withdraw.receiver[i];
                const address = await GetAccountOrMark_Address(v.address);
                if (!address) ERROR(Errors.InvalidParam, 'CallTreasury_Data.data.withdraw.receiver:'+ v.address);

                receiver.push({address:address, amount:BigInt(v.amount)})
            }
            obj?.withdraw({items:receiver, index:this.data.withdraw.index ?? 0, remark:this.data.withdraw.remark??'',
                for_guard, for_object, withdraw_guard: await LocalMark.Instance().get_address(this.data.withdraw.withdraw_guard)}, pst);
        }

        if (this.data?.description != null && this.object_address) {
            obj?.set_description(this.data.description, pst);
        }
        if (this.data?.deposit_guard != null) {
            const guard = await LocalMark.Instance().get_address(this.data?.deposit_guard);
            obj?.set_deposit_guard(guard, pst);
        }
        if (this.data?.withdraw_guard != null) {
            switch (this.data.withdraw_guard.op) {
                case 'add':
                case 'set':
                    if (this.data.withdraw_guard.op === 'set') obj?.remove_withdraw_guard([], true, pst);
                    for (let i = 0; i < this.data.withdraw_guard.data.length; ++ i) {
                        let v = this.data.withdraw_guard.data[i];
                        const guard = await LocalMark.Instance().get_address(v.guard);
                        if (guard) obj?.add_withdraw_guard(guard, BigInt(v.max_withdrawal_amount), pst);
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
        if (this.data?.withdraw_mode != null) {
            obj?.set_withdraw_mode(this.data.withdraw_mode, pst)
        }
        if (perm) {
            const n = GetObjectMain(this.data.object) as TypeNamedObjectWithPermission;
            await this.new_with_mark('Permission', txb, perm.launch(), GetObjectParam(n?.permission), account);
        }
        if (!this.object_address) {
            await this.new_with_mark('Treasury', txb, obj.launch(), GetObjectMain(this.data?.object), account);
        } 
    }
}