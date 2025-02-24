
/**
 *  generate and launch a guard
 */

import { Bcs, ContextType, ERROR, Errors, IsValidU8, OperatorType, ValueType, GUARD_QUERIES, IsValidAddress, 
    concatenate, TransactionBlock, Protocol, FnCallType, hasDuplicates, insertAtHead, CallResponse, 
    IsValidDesription} from "wowok";
import { Account } from "../account";
import { CallBase, CallResult, Namedbject } from "./base";

export interface GuardConst {
    identifier: number; // 1-255, the same identifier to represent the same data in different nodes
    bWitness: boolean; // witness(verifiee provides while verifying in the future) or normal(verifier provides now)
    value_type: ValueType; // data value type
    value?: any; // if bWitness true, value ignores; otherwise, data.
}

// parameters: Child nodes arranged in parameter order, with each child node providing the type and data for that parameter
export type GuardNode = { identifier: number; } // Data from GuardConst
    | {query: number | string, object: string | number; parameters: GuardNode[];} // object: address string or identifier in GuardConst that value_type = ValueType.address
    | {logic: OperatorType.TYPE_LOGIC_AS_U256_GREATER | OperatorType.TYPE_LOGIC_AS_U256_GREATER_EQUAL
        | OperatorType.TYPE_LOGIC_AS_U256_LESSER | OperatorType.TYPE_LOGIC_AS_U256_LESSER_EQUAL 
        | OperatorType.TYPE_LOGIC_AS_U256_EQUAL | OperatorType.TYPE_LOGIC_EQUAL | OperatorType.TYPE_LOGIC_HAS_SUBSTRING 
        | OperatorType.TYPE_LOGIC_ALWAYS_TRUE | OperatorType.TYPE_LOGIC_NOT 
        | OperatorType.TYPE_LOGIC_AND | OperatorType.TYPE_LOGIC_OR;  parameters: GuardNode[];}
    | {calc: OperatorType.TYPE_NUMBER_ADD | OperatorType.TYPE_NUMBER_DEVIDE | OperatorType.TYPE_NUMBER_MOD 
        | OperatorType.TYPE_NUMBER_MULTIPLY | OperatorType.TYPE_NUMBER_SUBTRACT; parameters: GuardNode[];}
    | {value_type: ValueType; value:any; } // Data 
    | {context: ContextType.TYPE_CLOCK | ContextType.TYPE_GUARD | ContextType.TYPE_SIGNER }; // Data from run-time environment

export interface CallGuard_Data {
    namedNew?: Namedbject;
    description: string;
    table: GuardConst[]; //  data used by multiple logical guard nodes
    root: GuardNode; // root must return ValueType.TYPE_BOOL     
}
export class CallGuard extends CallBase {
    data: CallGuard_Data;
    constructor(data: CallGuard_Data) {
        super();
        this.data = data;
    }
    async call(account?:string) : Promise<CallResult> {
        if (!this.data?.root) {
            ERROR(Errors.InvalidParam, 'guard root node invalid')
        }
        if (!IsValidDesription(this.data?.description)) {
            ERROR(Errors.IsValidDesription, 'build_guard - '+this.data.description)
        }
    
        // check const
        this.data.table.forEach(v => {
            if (!IsValidU8(v.identifier) || v.identifier < 1) ERROR(Errors.InvalidParam, 'table.identifer invalid');
            if (!v.bWitness && v.value === undefined) ERROR(Errors.InvalidParam, 'table.value');
        })
    
        if (hasDuplicates(this.data.table.map(v => v.identifier))) {
            ERROR(Errors.InvalidParam, 'table.identifer duplicates')
        }
    
        // check root
        var output : Uint8Array[]= [];
        buildNode(this.data.root!, ValueType.TYPE_BOOL, this.data.table, output);
        const bytes = (concatenate(Uint8Array, ...output) as Uint8Array); 
        const txb = new TransactionBlock();
    
        const obj = txb.moveCall({
            target: Protocol.Instance().guardFn('new') as FnCallType,
            arguments: [txb.pure.string(this.data.description), txb.pure.vector('u8', [].slice.call(bytes.reverse()))],  
        });
        this.data.table.forEach((v) => {
            if (v.bWitness) {
                const n = new Uint8Array(1); n.set([v.value_type], 0);
                txb.moveCall({
                    target:Protocol.Instance().guardFn("constant_add") as FnCallType,
                    arguments:[txb.object(obj), txb.pure.u8(v.identifier), txb.pure.bool(true), txb.pure.vector('u8', [].slice.call(n)), txb.pure.bool(false)]
                }) 
            } else {
                const tmp = Uint8Array.from(Bcs.getInstance().ser(v.value_type, v.value));
                const n = insertAtHead(tmp, v.value_type);
                txb.moveCall({
                    target:Protocol.Instance().guardFn("constant_add") as FnCallType,
                    arguments:[txb.object(obj), txb.pure.u8(v.identifier), txb.pure.bool(false),  txb.pure.vector('u8', [].slice.call(n)), txb.pure.bool(false)]
                }) 
            }
        })
        const addr = txb.moveCall({
            target:Protocol.Instance().guardFn("create") as FnCallType,
            arguments:[txb.object(obj)]
        });
        this.new_with_mark(txb, addr, this.data?.namedNew, account);

        const pair = Account.Instance().get_pair(account, true);
        if (!pair) ERROR(Errors.Fail, 'account invalid')
    
        return await Protocol.Client().signAndExecuteTransaction({
            transaction: txb, 
            signer: pair!,
            options:{showObjectChanges:true},
        });
    }
}

//export const MAX_CHILD_NODE_COUNT = 6;

const buildNode = (guard_node:GuardNode, type_required:ValueType | 'number' | 'variable', table:GuardConst[], output:Uint8Array[]) => {
    const node: any = guard_node as any;
    if (node?.identifier !== undefined) {
        const f = table.find(v=>v.identifier === node.identifier);
        if (f) {
            checkType(f.value_type, type_required, node);
            output.push(Bcs.getInstance().ser(ValueType.TYPE_U8, ContextType.TYPE_CONSTANT)); 
            output.push(Bcs.getInstance().ser(ValueType.TYPE_U8, node.identifier))
        } else {
            ERROR(Errors.InvalidParam, 'node identifier - ' + node.toString());
        }
    } else if (node?.query !== undefined) {
        var q: any[] | undefined;
        if (typeof(node.query === 'string')) {
            q = GUARD_QUERIES.find(v=>v[1] === node.query);
        } else if (typeof(node.query === 'number')) {
            q = GUARD_QUERIES.find(v=>v[2] === node.query);
        }

        if (q) {
            checkType(q[4], type_required, node); // Return type checking
            if ((q[3]).length === node.parameters.length) {
                for (let i = node.parameters.length - 1; i >= 0; --i) { // stack: first in, last out
                    buildNode(node.parameters[i], q[3][i], table, output); // Recursive check
                }
            } else {
                ERROR(Errors.InvalidParam, 'node query parameters length not match - ' + node.toString())
            }
        } else {
            ERROR(Errors.InvalidParam, 'node query not found - ' + node.toString());
        }

        if (typeof(node.object) === 'string') {
            if (!IsValidAddress(node.object)) {
                ERROR(Errors.InvalidParam, 'node object from address string - ' + node.toString())
            }
            output.push(Bcs.getInstance().ser(ValueType.TYPE_U8, ValueType.TYPE_ADDRESS)); 
            output.push(Bcs.getInstance().ser(ValueType.TYPE_ADDRESS, node.object)); // object address             
        } else {
            const f = table.find(v=>v.identifier === node.object);
            if (f) {
                checkType(f.value_type, ValueType.TYPE_ADDRESS, node);
                output.push(Bcs.getInstance().ser(ValueType.TYPE_U8, ContextType.TYPE_CONSTANT));
                output.push(Bcs.getInstance().ser(ValueType.TYPE_U8, node.object)); // object id
            } else {
                ERROR(Errors.InvalidParam, 'node object from identifier - ' + node.toString());
            }
        }
    } else if (node?.logic !== undefined) {
        checkType(ValueType.TYPE_BOOL, type_required, node); // bool
        switch (node?.logic) {
            case OperatorType.TYPE_LOGIC_ALWAYS_TRUE:
                if (node.parameters.length !== 0) ERROR(Errors.InvalidParam, 'node logic parameters length must be 0'+ node.toString());
                output.push(Bcs.getInstance().ser(ValueType.TYPE_U8, node.logic)); // TYPE 
                break;
            case OperatorType.TYPE_LOGIC_AND:
            case OperatorType.TYPE_LOGIC_OR:
                if (node.parameters.length < 2) ERROR(Errors.InvalidParam, 'node logic parameters length must >= 2'+ node.toString()); 
                (node.parameters as GuardNode[]).reverse().forEach(v => buildNode(v, ValueType.TYPE_BOOL, table, output)); // reserve
                output.push(Bcs.getInstance().ser(ValueType.TYPE_U8, node.logic)); // TYPE 
                output.push((Bcs.getInstance().ser(ValueType.TYPE_U8, node.parameters.length)));
                break;
            case OperatorType.TYPE_LOGIC_NOT:
                if (node.parameters.length !== 1) ERROR(Errors.InvalidParam, 'node logic parameters length must be 1'+ node.toString());
                (node.parameters as GuardNode[]).reverse().forEach(v => buildNode(v, ValueType.TYPE_BOOL, table, output)); // reserve
                output.push(Bcs.getInstance().ser(ValueType.TYPE_U8, node.logic)); // TYPE 
                break;
            case OperatorType.TYPE_LOGIC_AS_U256_GREATER:
            case OperatorType.TYPE_LOGIC_AS_U256_GREATER_EQUAL:
            case OperatorType.TYPE_LOGIC_AS_U256_LESSER:
            case OperatorType.TYPE_LOGIC_AS_U256_LESSER_EQUAL:
            case OperatorType.TYPE_LOGIC_AS_U256_EQUAL:
                if (node.parameters.length < 2) ERROR(Errors.InvalidParam, 'node logic parameters length must >= 2'+ node.toString());
                (node.parameters as GuardNode[]).reverse().forEach(v => buildNode(v, ValueType.TYPE_BOOL, table, output)); 
                output.push(Bcs.getInstance().ser(ValueType.TYPE_U8, node.logic)); // TYPE 
                output.push((Bcs.getInstance().ser(ValueType.TYPE_U8, node.parameters.length)));
                break;
            case OperatorType.TYPE_LOGIC_EQUAL:
                if (node.parameters.length < 2) ERROR(Errors.InvalidParam, 'node logic parameters length must >= 2'+ node.toString());
                var any_type: any = 'variable';
                (node.parameters as GuardNode[]).reverse().forEach(v => buildNode(v, any_type, table, output)); 
                output.push(Bcs.getInstance().ser(ValueType.TYPE_U8, node.logic)); // TYPE 
                output.push((Bcs.getInstance().ser(ValueType.TYPE_U8, node.parameters.length)));
                break;               
            case OperatorType.TYPE_LOGIC_HAS_SUBSTRING:
                if (node.parameters.length < 2) ERROR(Errors.InvalidParam, 'node logic parameters length must >= 2'+ node.toString());
                (node.parameters as GuardNode[]).reverse().forEach(v => buildNode(v, ValueType.TYPE_BOOL, table, output)); 
                output.push(Bcs.getInstance().ser(ValueType.TYPE_U8, node.logic)); // TYPE 
                output.push((Bcs.getInstance().ser(ValueType.TYPE_U8, node.parameters.length)));
                break;
        }
    } else if (node?.calc !== undefined) {
        checkType(ValueType.TYPE_U256, type_required, node);
        if (node.parameters.length < 2) ERROR(Errors.InvalidParam, 'node calc parameters length must >= 2'+ node.toString());
        (node.parameters as GuardNode[]).reverse().forEach(v => buildNode(v, ValueType.TYPE_BOOL, table, output)); 
        output.push(Bcs.getInstance().ser(ValueType.TYPE_U8, node.calc)); // TYPE 
        output.push((Bcs.getInstance().ser(ValueType.TYPE_U8, node.parameters.length)));
    } else if (node?.value_type !== undefined) {
        checkType(node?.value_type, type_required, node);
        if (node?.value === undefined) ERROR(Errors.InvalidParam, 'node value undefined - ' + node.toString());
        output.push(Bcs.getInstance().ser(ValueType.TYPE_U8, node.value_type)); // TYPE

        if (node.value_type == ValueType.TYPE_STRING || node.value_type === ValueType.TYPE_VEC_U8) {
            if (typeof(node.value) == 'string') {
                output.push(Bcs.getInstance().ser(ValueType.TYPE_STRING, node.value));
            } else {
                output.push(Bcs.getInstance().ser(ValueType.TYPE_VEC_U8, node.value));
            }
        } else {
            output.push(Bcs.getInstance().ser(node?.value_type, node.value));            
        }
    } else if (node?.context !== undefined) {
        output.push(Bcs.getInstance().ser(ValueType.TYPE_U8, node.context));
        switch (node.context) {
            case ContextType.TYPE_CLOCK:
                checkType(ValueType.TYPE_U64, type_required, node);
                break;
            case ContextType.TYPE_GUARD: 
            case ContextType.TYPE_SIGNER:
                checkType(ValueType.TYPE_ADDRESS, type_required, node);
                break;
        }
    } else {
        ERROR(Errors.InvalidParam, 'node - ' + node.toString())
    }
}


const checkType = (type: ValueType | ContextType.TYPE_CLOCK | ContextType.TYPE_GUARD | ContextType.TYPE_SIGNER, 
    type_required:ValueType | 'number' | 'variable', node?: GuardNode) => {
    if (type_required === 'variable') {
        type_required = type as number;
    } else if (type_required === 'number') {
        if (type === ValueType.TYPE_U128 || type === ValueType.TYPE_U256 || type === ValueType.TYPE_U8 ||
            type === ValueType.TYPE_U64 || type === ContextType.TYPE_CLOCK) {
                return
            }
    } else if (type_required === ValueType.TYPE_ADDRESS) {
        if (type === ContextType.TYPE_SIGNER || type === ContextType.TYPE_GUARD) {
            return
        }
    } /*else if (type_required === ValueType.TYPE_STRING) {
        if (type === ValueType.TYPE_VEC_U8) {
            return
        }
    } else if (type_required === ValueType.TYPE_VEC_U8) {
        if (type === ValueType.TYPE_STRING) {
            return 
        }
    } */

    if (type !== type_required) {
        var str = '';
        if (node) str = ' - ' + node.toString();
        ERROR(Errors.InvalidParam, 'checkType: ' + type + ' require type: ' + type_required + str);
    }
}