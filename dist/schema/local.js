import { z } from "zod";
import { BalanceOrCoin } from "../local/index.js";
import { LocalInfoNameDefault } from '../local/local.js';
import { zodToJsonSchema } from "zod-to-json-schema";
import * as D from './const.js';
import { SessionSchema } from "./call.js";
export const QueryAccountSchemaDescription = `Query local account information, including on-chain address, token balance, and list of token object addresses.`;
export const QueryAccountSchema = z.object({
    name_or_address: z.string().optional().describe("Your account name or address. undefined means default account."),
    balance_or_coin: z.nativeEnum(BalanceOrCoin).optional().describe("Query the balance or coin objects of the account."),
    token_type: z.string().optional().describe("Token type, default to 0x2::sui::SUI if not specified."),
    session: SessionSchema,
});
export const AccountOperationSchemaDescription = `Account operations, including generating new accounts, suspending/resume accounts, naming accounts, 
swapping names of two accounts, and transferring tokens between accounts. Note that the 'name' or 'name_or_address' undefined or equal to '' means the 'default' account`;
export const AccountOperationSchema = z.object({
    gen: z.object({
        name: z.string().optional().describe("Account name"),
    }).optional().describe("Generate a new account"),
    suspend: z.object({
        name_or_address: z.string().optional().describe("The name or address of the account to suspend"),
    }).optional().describe("Suspend an account."),
    resume: z.object({
        address: z.string().describe("The address of the account to resume"),
        name: z.string().optional().describe("The name to set for the account"),
    }).optional().describe("Resume an account"),
    name: z.object({
        new_name: z.string().nonempty().describe("The name to set for the account"),
        name_or_address: z.string().optional().describe("The name or address of the account to set the name for"),
    }).optional().describe("Set the name of the account"),
    swap_names: z.object({
        name1: z.string().optional().describe("The name of the first account"),
        name2: z.string().optional().describe("The name of the second account"),
    }).optional().describe("Swap the names of two accounts"),
    transfer: z.object({
        name_or_address_from: z.string().optional().describe("The name or address of the account to transfer from"),
        name_or_address_to: z.string().optional().describe("The name or address of the account to transfer to"),
        amount: z.union([z.string(), z.number()]).describe("The amount to transfer. Must be a positive integer"),
        token_type: z.string().optional().describe("Token type, default to 0x2::sui::SUI if not specified"),
    }).optional().describe("Transfer tokens from one account to another"),
    faucet: z.boolean().optional().describe(D.Faucet)
});
export const AccountOperationSchemaInput = () => {
    return zodToJsonSchema(AccountOperationSchema);
};
export const LocalMarkOperationSchemaDescription = `Local mark operations facilitate efficient object address management by assigning names and tags to addresses, enabling faster querying and organization. 
Supported operations include adding/setting marks (with optional names and tags), removing specific tags, and removing all marks for addresses.`;
export const LocalMarkOperationSchema = z.object({
    data: z.union([
        z.object({ op: z.literal('removeall') }).describe("Remove all local marks."),
        z.object({ op: z.literal('add'), data: z.array(z.object({
                name: z.string().describe("The name of the mark."),
                address: z.string().describe("The address to mark."),
                tags: z.array(z.string()).optional().describe("The tags of the mark."),
                useAddressIfNameExist: z.boolean().optional().describe("Whether to use the address if the name already exists. Otherwise, use this name and change the original name to its address."),
            })) }).describe("Add or set local marks."),
        z.object({ op: z.literal('remove'), data: z.array(z.string().describe('The name of the mark')) }).describe("Remove local marks."),
    ])
});
export const LocalMarkOperationSchemaInput = () => {
    return zodToJsonSchema(LocalMarkOperationSchema);
};
export const LocalInfoOperationSchemaDescription = `Local info operations manage on-device storage of personal information (e.g., delivery addresses, phone numbers) for cryptographic processing and secure sharing with service providers. Supported operations include: adding info (requires name and content parameters), removing specific info entries by name, and updating existing entries with new content.`;
export const LocalInfoOperationSchema = z.object({
    data: z.union([
        z.object({
            op: z.literal('removeall')
        }).describe("Whether to remove all local info."),
        z.object({
            op: z.literal('add'),
            data: z.array(z.object({
                name: z.string().default(LocalInfoNameDefault).describe("The name of the local info."),
                content: z.string().describe("The content of the local info."),
                bdefault: z.boolean().optional().describe("Whether to set the content as default."),
            }))
        }).describe("Add local info."),
        z.object({
            op: z.literal('remove'),
            data: z.array(z.string().describe('The name of the local info.'))
        }).describe("Remove local info by name."),
    ])
});
export const LocalInfoOperationSchemaInput = () => {
    return zodToJsonSchema(LocalInfoOperationSchema);
};
export const QueryLocalMarkSchemaDescription = `Query local mark by name. Accepts a local mark name (string) as input, and returns an object containing: address (on-chain object address), name (assigned human-readable name), and tags (array of string tags). Local marks enable faster address management by mapping addresses to memorable names and categorized tags for efficient querying.`;
export const QueryLocalMarkSchema = z.object({
    name: z.string().describe("The name of the local mark."),
});
export const QueryLocalMarkSchemaInput = () => {
    return zodToJsonSchema(QueryLocalMarkSchema);
};
export const QueryLocalInfoSchemaDescription = `Query local info by name. Local info allows storing personal information (e.g. addresses, phone numbers) on-device, which can be cryptographically processed and shared with service providers.`;
export const QueryLocalInfoSchema = z.object({
    name: z.string().default(LocalInfoNameDefault).describe("The name of the local info."),
});
export const QueryLocalInfoSchemaInput = () => {
    return zodToJsonSchema(QueryLocalInfoSchema);
};
export const localMarkListDescription = 'List local marks. Local marks facilitate efficient object address management by assigning names and tags to addresses, enabling faster querying and organization.';
export const LocalMarkFilterSchemaDescription = `Filter local marks by optional criteria: name (string), tags (array of strings), or object address (string). Parameters can be used individually or in combination for precise queries. Returns an array of local mark objects, each containing: address (on-chain object address), name (human-readable name), and tags (categorical tags). Local marks enhance address management efficiency through flexible multi-condition filtering.`;
export const LocalMarkFilterSchema = z.object({
    name: z.string().optional().describe("The name of the local mark."),
    tags: z.array(z.string()).optional().describe("The tags of the local mark."),
    address: z.string().optional().describe("The object or address of the local mark."),
});
export const LocalInfoListSchemaDescription = `List local information entries. Local info enables on-device storage of personal data (e.g., addresses, phone numbers) structured as name-content pairs, supporting cryptographic processing and secure sharing with service providers.`;
export const LocalInfoListSchema = z.object({});
export const AccountListSchemaDescription = `List local accounts stored on the device. Accounts provide cryptographic signatures for on-chain operations and support management/operation of their owned on-chain objects and funds. If showSuspendedAccount is set to true (default: false), suspended accounts will be included in the result.`;
export const AccountListSchema = z.object({
    showSuspendedAccount: z.boolean().optional().default(false).describe("Whether to display suspended accounts."),
});
export const QueryLocalSchemaDescription = `Local schema for querying accounts, address names/tags, and personal information stored on the device. 
- **Accounts**: Manages local accounts used for signing on-chain transactions.
- **Address Marks**: Supports naming and tagging of addresses to enable object address retrieval by name.
- **Personal Information**: Stores private data (e.g., addresses, phone numbers) for on-chain usage.
Supports both collection-level queries (retrieving multiple entries) and individual item queries (fetching specific records).`;
export const QueryLocalSchema = z.object({
    query: z.union([
        z.object({ name: z.literal('account_list'), data: AccountListSchema }).describe(AccountListSchemaDescription),
        z.object({ name: z.literal('info_list'), data: LocalInfoListSchema }).describe(LocalInfoListSchemaDescription),
        z.object({ name: z.literal('mark_list'), data: LocalMarkFilterSchema }).describe(LocalMarkFilterSchemaDescription),
        z.object({ name: z.literal('account'), data: QueryAccountSchema }).describe(QueryAccountSchemaDescription),
        z.object({ name: z.literal('mark'), data: QueryLocalMarkSchema }).describe(QueryLocalMarkSchemaDescription),
        z.object({ name: z.literal('info'), data: QueryLocalInfoSchema }).describe(QueryLocalInfoSchemaDescription),
    ])
});
export const QueryLocalSchemaInput = () => {
    return zodToJsonSchema(QueryLocalSchema);
};
export const QueryCoinInfoSchema = z.object({
    filter: z.union([z.object({
            alias_or_name: z.string().optional().describe(`by alias or name`),
            symbol: z.string().optional().describe(`by symbol`),
            coinType: z.string().optional().describe(`by coin type(e.g., 0x168da5bf1f48dafc111b0a488fa454aca95e0b5e::usdc::USDC)`),
        }), z.literal('all fetched').describe('Query all the coin information that has been fetched')]),
    session: SessionSchema
}).describe(`By specifying (all-satisfying) information, query coin information`);
export const QueryCoinInfoSchemaInput = () => {
    return zodToJsonSchema(QueryCoinInfoSchema);
};
export const CoinInfoFetchSchema = z.object({
    coinType: z.string().describe(`Coin type(e.g., 0x168da5bf1f48dafc111b0a488fa454aca95e0b5e::usdc::USDC)`),
    alias: z.string().optional().describe(`alias name`),
    session: SessionSchema,
}).describe(`Fetch detailed information about the coin`);
export const CoinInfoFetchSchemaInput = () => {
    return zodToJsonSchema(CoinInfoFetchSchema);
};
//# sourceMappingURL=local.js.map