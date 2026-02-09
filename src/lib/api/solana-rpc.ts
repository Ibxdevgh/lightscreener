import { Connection, PublicKey } from '@solana/web3.js';
import { getMint } from '@solana/spl-token';

const RPC_URL = process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';
const connection = new Connection(RPC_URL, 'confirmed');

export async function getMintInfo(mintAddress: string) {
  try {
    const mint = await getMint(connection, new PublicKey(mintAddress));
    return {
      supply: Number(mint.supply),
      decimals: mint.decimals,
      mintAuthorityEnabled: mint.mintAuthority !== null,
      freezeAuthorityEnabled: mint.freezeAuthority !== null,
    };
  } catch {
    return null;
  }
}

export async function getTopHolders(mintAddress: string, limit = 10) {
  try {
    const accounts = await connection.getTokenLargestAccounts(new PublicKey(mintAddress));
    return accounts.value.slice(0, limit).map((a) => ({
      address: a.address.toBase58(),
      amount: Number(a.amount),
      uiAmount: a.uiAmount || 0,
    }));
  } catch {
    return [];
  }
}

export async function getTokenAccountOwner(tokenAccount: string) {
  try {
    const info = await connection.getParsedAccountInfo(new PublicKey(tokenAccount));
    const data = info.value?.data;
    if (data && 'parsed' in data) {
      return data.parsed?.info?.owner || null;
    }
    return null;
  } catch {
    return null;
  }
}
