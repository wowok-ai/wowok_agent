import { TransactionBlock, CallResponse} from 'wowok';
import { PassportObject, IsValidAddress, Errors, ERROR, Permission, PermissionIndex,
    PermissionIndexType, DepositParam, Treasury, Treasury_WithdrawMode, WithdrawParam, WitnessFill
} from 'wowok';
import { OBJECT_QUERY, ObjectTreasury } from '../objects';
import { CallBase } from "./call";

export class CallTreasury extends CallBase {
    type_parameter: string;
    permission_new?: string;
    description?: string;
    withdraw_mode?: Treasury_WithdrawMode;
    withdraw_guard?: {op:'add' | 'set'; data:{guard:string, amount:string}[]} | {op:'remove', guards:string[]} | {op:'removeall'};
    deposit_guard?: string;
    deposit?: {data:DepositParam, guard?:string | 'fetch'};
    receive?: {payment:string; received_object:string};
    withdraw?:WithdrawParam;
    constructor(type_parameter:string, object: string | 'new' = 'new') { 
        super(object) 
        this.type_parameter = type_parameter;
    }
    async call(account?:string) : Promise<WitnessFill[] | CallResponse | undefined>   {
        if (!this.type_parameter) ERROR(Errors.InvalidParam, 'type_parameter');
        var checkOwner = false; const guards : string[] = [];
        const perms : PermissionIndexType[] = [];  var obj: ObjectTreasury | undefined ;

        if (this?.permission && IsValidAddress(this.permission)) {
            if (this?.object === 'new') {
                perms.push(PermissionIndex.treasury)
            }
            if (this?.permission_new !== undefined) {
                checkOwner = true;
            }
            if (this?.description !== undefined && this.object !== 'new') {
                perms.push(PermissionIndex.treasury_descritption)
            }
            if (this?.withdraw_mode !== undefined) {
                perms.push(PermissionIndex.treasury_withdraw_mode)
            }
            if (this?.withdraw_guard == undefined) { // publish is an irreversible one-time operation 
                perms.push(PermissionIndex.treasury_withdraw_guard)
            }
            if (this?.deposit_guard !== undefined) {
                perms.push(PermissionIndex.treasury_deposit_guard)
            }
            if (this?.deposit_guard !== undefined) {
                perms.push(PermissionIndex.treasury_deposit_guard)
            }
            if (this?.deposit?.guard !== undefined) {
                if (IsValidAddress(this.deposit.guard)) {
                    guards.push(this.deposit.guard)
                } else {
                    if (!obj) {
                        const r = await OBJECT_QUERY.objects({objects:[this.object], showContent:true});
                        if (r?.objects && r.objects[0].type === 'Treasury') {
                            obj = r.objects[0] as ObjectTreasury;
                        }
                    }
                    if (obj?.deposit_guard) {
                        guards.push(obj?.deposit_guard)
                    }
                }
            }
            if (this?.receive !== undefined) {
                perms.push(PermissionIndex.treasury_receive)
            }
            if (this?.withdraw?.withdraw_guard !== undefined) {
                if (typeof(this.withdraw.withdraw_guard) === 'string' && IsValidAddress(this.withdraw.withdraw_guard)) {
                    guards.push(this.withdraw.withdraw_guard)
                } else {
                    if (!obj) {
                        const r = await OBJECT_QUERY.objects({objects:[this.object], showContent:true});
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

            return await this.check_permission_and_call(this.permission, perms, guards, checkOwner, undefined, account)
        }
        return this.exec(account);
    }
    protected async operate (txb:TransactionBlock, passport?:PassportObject) {
        let obj : Treasury | undefined ; let permission: any; 
        if (this.object === 'new' && this?.type_parameter) {
            if (!this?.permission || !IsValidAddress(this?.permission)) {
                permission = Permission.New(txb, '');
            }
            obj = Treasury.New(txb, this.type_parameter, permission ?? this?.permission, this?.description??'', permission?undefined:passport)
        } else {
            if (IsValidAddress(this.object) && this.type_parameter && this.permission && IsValidAddress(this?.permission)) {
                obj = Treasury.From(txb, this.type_parameter, this.permission, this.object)
            }
        }

        if (obj) {
            if (this?.description !== undefined && this.object !== 'new') {
                obj?.set_description(this.description, passport);
            }
            if (this?.deposit_guard !== undefined) {
                obj?.set_deposit_guard(this.deposit_guard, passport);
            }
            if (this?.withdraw_mode !== undefined) {
                obj?.set_withdraw_mode(this.withdraw_mode, passport)
            }
            if (this?.withdraw_guard !== undefined) {
                switch (this.withdraw_guard.op) {
                    case 'add':
                        this.withdraw_guard.data.forEach(v => obj?.add_withdraw_guard(v.guard, BigInt(v.amount), passport))
                        break;
                    case 'remove':
                        obj?.remove_withdraw_guard(this.withdraw_guard.guards, false, passport)
                        break;
                    case 'set':
                        obj?.remove_withdraw_guard([], true, passport)
                        this.withdraw_guard.data.forEach(v => obj?.add_withdraw_guard(v.guard, BigInt(v.amount), passport))
                        break;
                    case 'removeall':
                        obj?.remove_withdraw_guard([], true, passport)
                        break;
                }
            }
            if (this?.withdraw !== undefined) {
                obj?.withdraw(this.withdraw, passport)
            }
            if (this?.receive !== undefined) {
                obj?.receive(this.receive.payment, this.receive.received_object, passport); 
            }
            if (this.deposit !== undefined) {
                obj?.deposit(this.deposit.data, passport)
            }
            if (this?.permission_new !== undefined) {
                obj?.change_permission(this.permission_new);
            }
            if (permission) {
                permission.launch();
            }
            if (this.object === 'new') {
                obj?.launch();
            }
        }
    }
}