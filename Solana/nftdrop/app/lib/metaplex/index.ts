import {
    clusterApiUrl, Connection, PublicKey,
} from '@solana/web3.js';

import type { ParsedAccountData } from '@solana/web3.js';
import { Metadata, METADATA_SCHEMA } from './schema';

import { deserializeUnchecked } from 'borsh';
import { extendBorsh } from './borsh';
import type { StringPublicKey } from './borsh';
extendBorsh();

const network = clusterApiUrl("devnet");
const connection = new Connection(network);

export const METADATA_PROGRAM_ID =
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s' as StringPublicKey;

export const VAULT_ID =
    'vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn' as StringPublicKey;

export const AUCTION_ID =
    'auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8' as StringPublicKey;

export const METAPLEX_ID =
    'p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98' as StringPublicKey;

export const MAX_NAME_LENGTH = 32;

export const MAX_SYMBOL_LENGTH = 10;

export const MAX_URI_LENGTH = 200;

export const MAX_CREATOR_LIMIT = 5;

export const MAX_CREATOR_LEN = 32 + 1 + 1;
export const MAX_METADATA_LEN =
    1 +
    32 +
    32 +
    MAX_NAME_LENGTH +
    MAX_SYMBOL_LENGTH +
    MAX_URI_LENGTH +
    MAX_CREATOR_LIMIT * MAX_CREATOR_LEN +
    2 +
    1 +
    1 +
    198;

export async function getNFTMetadata(mintPubKey: PublicKey) {
    const mintAddress = "6eNvdpQdJkZa1At6Upco94gHBCcPRKPhz1yNzJdLLiku";
    const metadataProgram = new PublicKey(METADATA_PROGRAM_ID);

    const mintData = await connection.getProgramAccounts(metadataProgram, {
        filters: [
            {
                memcmp: {
                    offset:
                        1 + // key
                        32, // update auth
                    bytes: mintAddress,
                },
            },
        ],
    });


    const data = decodeMetadata(mintData[0].account.data);
    console.log("TEHDATA", data);

    await connection.getParsedAccountInfo(mintPubKey).then(encodedAccount => {
        if (encodedAccount.value != null) {
            let mintData = encodedAccount.value.data as ParsedAccountData;
            let mintAuthority = new PublicKey(mintData?.parsed.info.mintAuthority);
    
            connection.getParsedAccountInfo(mintAuthority).then(encodedMint => {
                try {
                    console.log("encodedMint", encodedMint);
                    if (encodedMint.value != null) {
                        const mintData = encodedMint.value.data as Buffer;
                        const decodedData = decodeMetadata(mintData);
        
                        console.log("found data for mint authority:", decodedData);
                    }
                } catch (err) {
                    console.error("error", err);
                }
            });
        }
    });
}

// eslint-disable-next-line no-control-regex
const METADATA_REPLACE = new RegExp('\u0000', 'g');

export const decodeMetadata = (buffer: Buffer): Metadata => {
    const metadata = deserializeUnchecked(
        METADATA_SCHEMA,
        Metadata,
        buffer,
    ) as Metadata;
    metadata.data.name = metadata.data.name.replace(METADATA_REPLACE, '');
    metadata.data.uri = metadata.data.uri.replace(METADATA_REPLACE, '');
    metadata.data.symbol = metadata.data.symbol.replace(METADATA_REPLACE, '');
    return metadata;
};