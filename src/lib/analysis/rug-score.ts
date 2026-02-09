import { getMintInfo, getTopHolders } from '@/lib/api/solana-rpc';
import type { RugScore } from '@/lib/types';
import { rugScoreLevel } from '@/lib/format';

export async function computeRugScore(tokenAddress: string): Promise<RugScore> {
  const breakdown: RugScore['breakdown'] = {
    liquidityLocked: { score: 15, max: 25, detail: 'Unable to verify' },
    holderConcentration: { score: 10, max: 25, detail: 'Checking...' },
    mintAuthority: { score: 0, max: 20, detail: 'Revoked' },
    freezeAuthority: { score: 0, max: 15, detail: 'Revoked' },
    devWalletSold: { score: 5, max: 15, detail: 'Unable to verify' },
  };

  // Check mint/freeze authority
  const mintInfo = await getMintInfo(tokenAddress);
  if (mintInfo) {
    if (mintInfo.mintAuthorityEnabled) {
      breakdown.mintAuthority = { score: 20, max: 20, detail: 'Active - can mint more tokens' };
    } else {
      breakdown.mintAuthority = { score: 0, max: 20, detail: 'Revoked' };
    }

    if (mintInfo.freezeAuthorityEnabled) {
      breakdown.freezeAuthority = { score: 15, max: 15, detail: 'Active - can freeze accounts' };
    } else {
      breakdown.freezeAuthority = { score: 0, max: 15, detail: 'Revoked' };
    }
  }

  // Check holder concentration
  const holders = await getTopHolders(tokenAddress);
  if (holders.length > 0) {
    const totalFromTop = holders.reduce((sum, h) => sum + h.uiAmount, 0);
    // We don't have total supply easily, so use mintInfo
    if (mintInfo && mintInfo.supply > 0) {
      const topPct = (totalFromTop / (mintInfo.supply / Math.pow(10, mintInfo.decimals))) * 100;
      if (topPct > 80) {
        breakdown.holderConcentration = { score: 25, max: 25, detail: `Top 10 hold ${topPct.toFixed(1)}%` };
      } else if (topPct > 50) {
        breakdown.holderConcentration = { score: 15, max: 25, detail: `Top 10 hold ${topPct.toFixed(1)}%` };
      } else if (topPct > 30) {
        breakdown.holderConcentration = { score: 8, max: 25, detail: `Top 10 hold ${topPct.toFixed(1)}%` };
      } else {
        breakdown.holderConcentration = { score: 3, max: 25, detail: `Top 10 hold ${topPct.toFixed(1)}%` };
      }
    }
  }

  const total = Object.values(breakdown).reduce((sum, b) => sum + b.score, 0);

  return {
    total,
    breakdown,
    level: rugScoreLevel(total),
  };
}
