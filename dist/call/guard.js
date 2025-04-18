/**
 *  generate and launch a guard
 */
import { Bcs, ContextType, ERROR, Errors, IsValidU8, OperatorType, ValueType, GUARD_QUERIES, IsValidAddress, concatenate, Protocol, hasDuplicates, insertAtHead, IsValidDesription, IsValidGuardIdentifier } from "wowok";
import { CallBase } from "./base.js";
export class CallGuard extends CallBase {
    constructor(data) {
        super();
        this.data = data;
    }
    async call(account) {
        return await this.exec(account);
    }
    async operate(txb, passport, account) {
        if (!this.data?.root) {
            ERROR(Errors.InvalidParam, 'guard root node invalid');
        }
        if (this.data?.description && !IsValidDesription(this.data?.description)) {
            ERROR(Errors.IsValidDesription, 'build_guard - ' + this.data.description);
        }
        // check const
        this.data?.table?.forEach(v => {
            if (!IsValidU8(v.identifier) || v.identifier < 1)
                ERROR(Errors.InvalidParam, 'table.identifer invalid');
            if (!v.bWitness && v.value === undefined)
                ERROR(Errors.InvalidParam, 'table.value');
        });
        if (this.data?.table && hasDuplicates(this.data?.table?.map(v => v.identifier))) {
            ERROR(Errors.InvalidParam, 'table.identifer duplicates');
        }
        // check root
        var output = [];
        buildNode(this.data.root, ValueType.TYPE_BOOL, this.data?.table ?? [], output);
        const bytes = concatenate(Uint8Array, ...output);
        const obj = txb.moveCall({
            target: Protocol.Instance().guardFn('new'),
            arguments: [txb.pure.string(this.data.description ?? ''), txb.pure.vector('u8', [].slice.call(bytes.reverse()))],
        });
        this.data?.table?.forEach((v) => {
            if (v.bWitness) {
                const n = new Uint8Array(1);
                n.set([v.value_type], 0);
                txb.moveCall({
                    target: Protocol.Instance().guardFn("constant_add"),
                    arguments: [txb.object(obj), txb.pure.u8(v.identifier), txb.pure.bool(true), txb.pure.vector('u8', [].slice.call(n)), txb.pure.bool(false)]
                });
            }
            else {
                const tmp = Uint8Array.from(Bcs.getInstance().ser(v.value_type, v.value));
                const n = insertAtHead(tmp, v.value_type);
                txb.moveCall({
                    target: Protocol.Instance().guardFn("constant_add"),
                    arguments: [txb.object(obj), txb.pure.u8(v.identifier), txb.pure.bool(false), txb.pure.vector('u8', [].slice.call(n)), txb.pure.bool(false)]
                });
            }
        });
        const addr = txb.moveCall({
            target: Protocol.Instance().guardFn("create"),
            arguments: [txb.object(obj)]
        });
        await this.new_with_mark('Guard', txb, addr, this.data?.namedNew, account);
    }
}
//export const MAX_CHILD_NODE_COUNT = 6;
const buildNode = (guard_node, type_required, table, output) => {
    const node = guard_node;
    if (node?.identifier !== undefined) {
        const f = table.find(v => v.identifier === node.identifier);
        if (f) {
            checkType(f.value_type, type_required, node);
            output.push(Bcs.getInstance().ser(ValueType.TYPE_U8, ContextType.TYPE_CONSTANT));
            output.push(Bcs.getInstance().ser(ValueType.TYPE_U8, node.identifier));
        }
        else {
            ERROR(Errors.InvalidParam, 'node identifier - ' + JSON.stringify(node));
        }
    }
    else if (node?.query !== undefined) {
        var q;
        if (typeof (node.query) === 'string') {
            q = GUARD_QUERIES.find(v => v.query_name === node.query);
        }
        else if (typeof (node.query) === 'number') {
            q = GUARD_QUERIES.find(v => v.query_id === node.query);
        }
        if (!q)
            ERROR(Errors.InvalidParam, 'query invalid - ' + node?.query);
        checkType(q.return, type_required, node); // Return type checking
        if (q.parameters.length === node.parameters.length) {
            for (let i = node.parameters.length - 1; i >= 0; --i) { // stack: first in, last out
                buildNode(node.parameters[i], q.parameters[i], table, output); // Recursive check
            }
        }
        else {
            ERROR(Errors.InvalidParam, 'node query parameters length not match - ' + JSON.stringify(node));
        }
        output.push(Bcs.getInstance().ser(ValueType.TYPE_U8, OperatorType.TYPE_QUERY)); // QUERY TYPE + addr + cmd
        if (typeof (node.object) === 'string') {
            if (!IsValidAddress(node.object)) {
                ERROR(Errors.InvalidParam, 'node object from address string - ' + JSON.stringify(node));
            }
            output.push(Bcs.getInstance().ser(ValueType.TYPE_U8, ValueType.TYPE_ADDRESS));
            output.push(Bcs.getInstance().ser(ValueType.TYPE_ADDRESS, node.object)); // object address             
        }
        else {
            const f = table.find(v => v.identifier === node.object);
            if (f) {
                checkType(f.value_type, ValueType.TYPE_ADDRESS, node);
                output.push(Bcs.getInstance().ser(ValueType.TYPE_U8, ContextType.TYPE_CONSTANT));
                output.push(Bcs.getInstance().ser(ValueType.TYPE_U8, node.object)); // object id
            }
            else {
                ERROR(Errors.InvalidParam, 'node object from identifier - ' + JSON.stringify(node));
            }
        }
        output.push(Bcs.getInstance().ser('u16', q.query_id)); // cmd(u16)
    }
    else if (node?.logic !== undefined) {
        checkType(ValueType.TYPE_BOOL, type_required, node); // bool
        switch (node?.logic) {
            case OperatorType.TYPE_LOGIC_AND:
            case OperatorType.TYPE_LOGIC_OR:
                if (node.parameters.length < 2)
                    ERROR(Errors.InvalidParam, 'node logic parameters length must >= 2' + JSON.stringify(node));
                node.parameters.reverse().forEach(v => buildNode(v, ValueType.TYPE_BOOL, table, output)); // reserve
                output.push(Bcs.getInstance().ser(ValueType.TYPE_U8, node.logic)); // TYPE 
                output.push((Bcs.getInstance().ser(ValueType.TYPE_U8, node.parameters.length)));
                break;
            case OperatorType.TYPE_LOGIC_NOT:
                if (node.parameters.length !== 1)
                    ERROR(Errors.InvalidParam, 'node logic parameters length must be 1' + JSON.stringify(node));
                node.parameters.reverse().forEach(v => buildNode(v, ValueType.TYPE_BOOL, table, output)); // reserve
                output.push(Bcs.getInstance().ser(ValueType.TYPE_U8, node.logic)); // TYPE 
                break;
            case OperatorType.TYPE_LOGIC_AS_U256_GREATER:
            case OperatorType.TYPE_LOGIC_AS_U256_GREATER_EQUAL:
            case OperatorType.TYPE_LOGIC_AS_U256_LESSER:
            case OperatorType.TYPE_LOGIC_AS_U256_LESSER_EQUAL:
            case OperatorType.TYPE_LOGIC_AS_U256_EQUAL:
                if (node.parameters.length < 2)
                    ERROR(Errors.InvalidParam, 'node logic parameters length must >= 2' + JSON.stringify(node));
                node.parameters.reverse().forEach(v => buildNode(v, 'number', table, output));
                output.push(Bcs.getInstance().ser(ValueType.TYPE_U8, node.logic)); // TYPE 
                output.push((Bcs.getInstance().ser(ValueType.TYPE_U8, node.parameters.length)));
                break;
            case OperatorType.TYPE_LOGIC_EQUAL:
                if (node.parameters.length < 2)
                    ERROR(Errors.InvalidParam, 'node logic parameters length must >= 2' + JSON.stringify(node));
                var any_type = 'variable';
                node.parameters.reverse().forEach(v => buildNode(v, any_type, table, output));
                output.push(Bcs.getInstance().ser(ValueType.TYPE_U8, node.logic)); // TYPE 
                output.push((Bcs.getInstance().ser(ValueType.TYPE_U8, node.parameters.length)));
                break;
            case OperatorType.TYPE_LOGIC_HAS_SUBSTRING:
                if (node.parameters.length < 2)
                    ERROR(Errors.InvalidParam, 'node logic parameters length must >= 2' + JSON.stringify(node));
                node.parameters.reverse().forEach(v => buildNode(v, ValueType.TYPE_STRING, table, output));
                output.push(Bcs.getInstance().ser(ValueType.TYPE_U8, node.logic)); // TYPE 
                output.push((Bcs.getInstance().ser(ValueType.TYPE_U8, node.parameters.length)));
                break;
        }
    }
    else if (node?.calc !== undefined) {
        if (node?.calc === OperatorType.TYPE_NUMBER_ADDRESS) {
            checkType(ValueType.TYPE_ADDRESS, type_required, node);
            if (node.parameters.length !== 1)
                ERROR(Errors.InvalidParam, 'node TYPE_NUMBER_ADDRESS parameters length must == 1' + JSON.stringify(node));
            node.parameters.reverse().forEach(v => buildNode(v, 'number', table, output));
            output.push(Bcs.getInstance().ser(ValueType.TYPE_U8, node.calc)); // TYPE 
        }
        else {
            checkType(ValueType.TYPE_U256, type_required, node);
            if (node.parameters.length < 2)
                ERROR(Errors.InvalidParam, 'node calc parameters length must >= 2' + JSON.stringify(node));
            node.parameters.reverse().forEach(v => buildNode(v, 'number', table, output));
            output.push(Bcs.getInstance().ser(ValueType.TYPE_U8, node.calc)); // TYPE 
            output.push((Bcs.getInstance().ser(ValueType.TYPE_U8, node.parameters.length)));
        }
    }
    else if (node?.value_type !== undefined) {
        checkType(node?.value_type, type_required, node);
        if (node?.value === undefined)
            ERROR(Errors.InvalidParam, 'node value undefined - ' + JSON.stringify(node));
        output.push(Bcs.getInstance().ser(ValueType.TYPE_U8, node.value_type)); // TYPE
        if (node.value_type == ValueType.TYPE_STRING || node.value_type === ValueType.TYPE_VEC_U8) {
            if (typeof (node.value) == 'string') {
                output.push(Bcs.getInstance().ser(ValueType.TYPE_STRING, node.value));
            }
            else {
                output.push(Bcs.getInstance().ser(ValueType.TYPE_VEC_U8, node.value));
            }
        }
        else {
            output.push(Bcs.getInstance().ser(node?.value_type, node.value));
        }
    }
    else if (node?.context !== undefined) {
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
    }
    else if (node?.identifier !== undefined) {
        if (!IsValidGuardIdentifier(node.identifier))
            ERROR(Errors.IsValidGuardIdentifier, 'node - ' + JSON.stringify(node));
        const i = table.find(v => v.identifier === node.identifier);
        if (!i)
            ERROR(Errors.InvalidParam, 'identifier not found. node - ' + JSON.stringify(node));
        checkType(i.value_type, type_required, node);
        output.push(Bcs.getInstance().ser(ValueType.TYPE_U8, ContextType.TYPE_CONSTANT));
        output.push(Bcs.getInstance().ser(ValueType.TYPE_U8, node.identifier));
    }
    else {
        ERROR(Errors.InvalidParam, 'node - ' + JSON.stringify(node));
    }
};
const checkType = (type, type_required, node) => {
    if (type_required === 'variable') {
        type_required = type;
    }
    else if (type_required === 'number') {
        if (type === ValueType.TYPE_U128 || type === ValueType.TYPE_U256 || type === ValueType.TYPE_U8 ||
            type === ValueType.TYPE_U64 || type === ContextType.TYPE_CLOCK) {
            return;
        }
    }
    else if (type_required === ValueType.TYPE_ADDRESS) {
        if (type === ContextType.TYPE_SIGNER || type === ContextType.TYPE_GUARD) {
            return;
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
        if (node)
            str = ' - ' + JSON.stringify(node);
        ERROR(Errors.InvalidParam, 'checkType: ' + type + ' require type: ' + type_required + str);
    }
};
//# sourceMappingURL=guard.js.map