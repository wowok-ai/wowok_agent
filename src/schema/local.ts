

import { z } from "zod";
import { BalanceOrCoin } from "../local/index.js";
import { LocalInfoNameDefault } from '../local/local.js'
import { zodToJsonSchema } from "zod-to-json-schema";

export const QueryAccountSchemaDescription = `Query local account information, including on-chain address, token balance, and list of token object addresses.`
export const QueryAccountSchema = z.object({
    name_or_address: z.string().optional().describe("Your account name or address. undefined means default account."),
    balance_or_coin: z.nativeEnum(BalanceOrCoin).optional().describe("Query the balance or coin objects of the account."),
    token_type: z.string().optional().describe("Token type, default to 0x2::sui::SUI if not specified."),
});

export const AccountOperationSchemaDescription = `Account operations, including generating new accounts, setting default accounts, suspending/reactivating accounts, naming accounts, and transferring tokens between accounts.`;
export const AccountOperationSchema = z.object({
    gen: z.object({
            name: z.string().nonempty().optional().describe("Account name."),
            default: z.boolean().optional().describe("Whether to set the generated account as the default account."),
        }).optional().describe("Generate a new account."),
    default: z.object({
            name_or_address: z.string().nonempty().describe("The name or address of the account to set as the default account."),
        }).optional().describe("Set the default account."),
    suspend: z.object({
            name_or_address: z.string().optional().describe("The name or address of the account to suspend. undefined means default account."),
            suspend: z.boolean().optional().describe("Whether to suspend the account. If not specified, suspend the default account."),
        }).optional().describe("Suspend or reactivate the account."),
    name: z.object({
            new_name: z.string().nonempty().describe("The name to set for the account."),
            name_or_address: z.string().optional().describe("The name or address of the account to set the name for. undefined means default account."), 
    }).optional().describe("Set the name of the account."),
    transfer: z.object({
            name_or_address_from: z.string().optional().describe("The name or address of the account to transfer from. undefined means default account."),
            name_or_address_to: z.string().optional().describe("The name or address of the account to transfer to. undefined means default account."),
            amount: z.union([z.string(), z.number()]).describe("The amount to transfer. Must be a positive integer."),
            token_type: z.string().optional().describe("Token type, default to 0x2::sui::SUI if not specified."),
        }).optional().describe("Transfer tokens from one account to another."),        
});

export const LocalMarkOperationSchemaDescription = `Local mark operations facilitate efficient object address management by assigning names and tags to addresses, enabling faster querying and organization. 
Supported operations include adding/setting marks (with optional names and tags), removing specific tags, and removing all marks for addresses.`
export const LocalMarkOperationSchema = z.object({
    data: z.union([
        z.object({op:z.literal('removeall')}).describe("Remove all local marks."),
        z.object({op:z.literal('add'), data: z.array(z.object({
            name: z.string().describe("The name of the mark."),
            address: z.string().describe("The address to mark."),
            tags: z.array(z.string()).optional().describe("The tags of the mark."),
            useAddressIfNameExist: z.boolean().optional().describe("Whether to use the address if the name already exists. Otherwise, use this name and change the original name to its address."),
        }))}).describe("Add or set local marks."),
        z.object({op:z.literal('remove'), data: z.array(z.string().describe('The name of the mark'))}).describe("Remove local marks."),        
    ])
});

export const LocalInfoOperationSchemaDescription = `Local info operations manage on-device storage of personal information (e.g., delivery addresses, phone numbers) for cryptographic processing and secure sharing with service providers. Supported operations include: adding info (requires name and content parameters), removing specific info entries by name, and updating existing entries with new content.`
export const LocalInfoOperationSchema = z.object({
    data: z.union([
        z.object({
            op:z.literal('removeall')
        }).describe("Whether to remove all local info."),
        z.object({
            op:z.literal('add'), 
            data: z.array(z.object({
                name: z.string().default(LocalInfoNameDefault).describe("The name of the local info."),
                content: z.string().describe("The content of the local info."),
                bdefault: z.boolean().optional().describe("Whether to set the content as default."),
            })
        )}).describe("Add local info."),
        z.object({
            op:z.literal('remove'), 
            data: z.array(z.string().describe('The name of the local info.'))
        }).describe("Remove local info by name."),        
    ])
});

export const QueryLocalMarkSchemaDescription = `Query local mark by name. Accepts a local mark name (string) as input, and returns an object containing: address (on-chain object address), name (assigned human-readable name), and tags (array of string tags). Local marks enable faster address management by mapping addresses to memorable names and categorized tags for efficient querying.`; 
export const QueryLocalMarkSchema = z.object({
    name: z.string().describe("The name of the local mark."),
});

export const QueryLocalInfoSchemaDescription = `Query local info by name. Local info allows storing personal information (e.g. addresses, phone numbers) on-device, which can be cryptographically processed and shared with service providers.`;   
export const QueryLocalInfoSchema = z.object({  
    name: z.string().default(LocalInfoNameDefault).describe("The name of the local info."),
});

export const localMarkListDescription = 'List local marks. Local marks facilitate efficient object address management by assigning names and tags to addresses, enabling faster querying and organization.'
export const LocalMarkFilterSchemaDescription = `Filter local marks by optional criteria: name (string), tags (array of strings), or object address (string). Parameters can be used individually or in combination for precise queries. Returns an array of local mark objects, each containing: address (on-chain object address), name (human-readable name), and tags (categorical tags). Local marks enhance address management efficiency through flexible multi-condition filtering.`; 
export const LocalMarkFilterSchema = z.object({
    name: z.string().optional().describe("The name of the local mark."),
    tags: z.array(z.string()).optional().describe("The tags of the local mark."),
    address: z.string().optional().describe("The object or address of the local mark."),
});

export const LocalInfoListSchemaDescription = `List local information entries. Local info enables on-device storage of personal data (e.g., addresses, phone numbers) structured as name-content pairs, supporting cryptographic processing and secure sharing with service providers.`; 
export const LocalInfoListSchema = z.object({
});

export const AccountListSchemaDescription = `List local accounts stored on the device. Accounts provide cryptographic signatures for on-chain operations and support management/operation of their owned on-chain objects and funds. If showSuspendedAccount is set to true (default: false), suspended accounts will be included in the result.`; 
export const AccountListSchema = z.object({
    showSuspendedAccount: z.boolean().optional().default(false).describe("Whether to display suspended accounts."),
});

export const LocalSchemaDescription = `Local schema for querying accounts, address names/tags, and personal information stored on the device. 
- **Accounts**: Manages local accounts used for signing on-chain transactions.
- **Address Marks**: Supports naming and tagging of addresses to enable object address retrieval by name.
- **Personal Information**: Stores private data (e.g., addresses, phone numbers) for on-chain usage.
Supports both collection-level queries (retrieving multiple entries) and individual item queries (fetching specific records).`;
export const LocalSchema = z.object({
    query: z.union([
        z.object({name:z.literal('account_list'), data:AccountListSchema}).describe(AccountListSchemaDescription),
        z.object({name:z.literal('info_list'), data:LocalInfoListSchema}).describe(LocalInfoListSchemaDescription),
        z.object({name:z.literal('mark_list'), data:LocalMarkFilterSchema}).describe(LocalMarkFilterSchemaDescription),
        z.object({name:z.literal('account'), data:QueryAccountSchema}).describe(QueryAccountSchemaDescription),
        z.object({name:z.literal('mark'), data:QueryLocalMarkSchema}).describe(QueryLocalMarkSchemaDescription),
        z.object({name:z.literal('info'), data:QueryLocalInfoSchema}).describe(QueryLocalInfoSchemaDescription),
    ])
});
export const LocalSchemaInput = () => {
    return zodToJsonSchema(LocalSchema);
}