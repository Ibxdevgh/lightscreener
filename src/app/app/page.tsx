'use client';

import { useState } from 'react';
import { useTrendingPools } from '@/hooks/useTrendingPools';
import { TokenTable } from '@/components/tokens/TokenTable';
import { ChainFilter } from '@/components/tokens/ChainFilter';
import { formatUsd, formatNumber } from '@/lib/format';
import type { Chain } from '@/lib/types';

export default function Home() {
  const [chain, setChain] = useState<Chain>('all');
  const { pools, isLoading } = useTrendingPools(chain);

  const totalVolume = pools.reduce((sum, p) => sum + p.volume24h, 0);
  const totalTxns = pools.reduce((sum, p) => sum + p.txns24h.buys + p.txns24h.sells, 0);

  return (
    <div className="flex flex-col h-full">
      {/* Stats + filters */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-cream-300/60">
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 rounded-full text-[11px] font-semibold bg-forest text-cream">Trending</button>
          <button className="px-3 py-1 rounded-full text-[11px] font-medium text-forest/50 hover:text-forest/70 transition-all">Newest</button>
          <button className="px-3 py-1 rounded-full text-[11px] font-medium text-forest/50 hover:text-forest/70 transition-all">Gainers</button>
          <span className="w-px h-3.5 bg-forest/15 mx-1" />
          <ChainFilter selected={chain} onChange={setChain} />
        </div>
        <div className="flex items-center gap-4 text-[10px]">
          <div>
            <span className="text-forest/45 mr-1.5">Vol 24H</span>
            <span className="font-mono font-semibold text-forest/75">{formatUsd(totalVolume, true)}</span>
          </div>
          <div>
            <span className="text-forest/45 mr-1.5">Txns</span>
            <span className="font-mono font-semibold text-forest/75">{formatNumber(totalTxns, true)}</span>
          </div>
        </div>
      </div>

      {/* Table — light, on cream background */}
      <div className="flex-1 min-h-0 overflow-auto">
        <TokenTable
          pools={pools}
          isLoading={isLoading}
          emptyMessage="No trending tokens found. Try a different chain."
        />
      </div>
    </div>
  );
}
