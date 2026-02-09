import type { Trade } from '@/lib/types';
import { SNIPER_BLOCK_WINDOW } from '@/lib/constants';

export interface SniperInfo {
  wallet: string;
  blockNumber: number;
  blockDelta: number;
}

export function detectSnipers(trades: Trade[], poolCreationBlock?: number): SniperInfo[] {
  if (!poolCreationBlock) return [];

  return trades
    .filter((t) => t.kind === 'buy' && t.block_number - poolCreationBlock <= SNIPER_BLOCK_WINDOW)
    .map((t) => ({
      wallet: t.tx_from_address,
      blockNumber: t.block_number,
      blockDelta: t.block_number - poolCreationBlock,
    }));
}
