'use client';

import { useState } from 'react';
import { useTrendingPools } from '@/hooks/useTrendingPools';
import { TokenTable } from '@/components/tokens/TokenTable';
import { ChainFilter } from '@/components/tokens/ChainFilter';
import type { Chain } from '@/lib/types';

export default function MoonersPage() {
  const [chain, setChain] = useState<Chain>('all');
  const { pools, isLoading } = useTrendingPools(chain);

  const mooners = [...pools]
    .filter((p) => p.priceChange24h > 0)
    .sort((a, b) => b.priceChange24h - a.priceChange24h);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-5 py-2.5 border-b border-cream-300/60">
        <span className="text-[11px] font-semibold text-emerald-600/70">Gainers</span>
        <span className="w-px h-3.5 bg-forest/8" />
        <ChainFilter selected={chain} onChange={setChain} />
      </div>
      <div className="flex-1 min-h-0 overflow-auto">
        <TokenTable
          pools={mooners}
          isLoading={isLoading}
          emptyMessage="No mooners right now. Everything is dumping."
        />
      </div>
    </div>
  );
}
