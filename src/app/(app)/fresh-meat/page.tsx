'use client';

import { useState } from 'react';
import { useNewPools } from '@/hooks/useNewPools';
import { TokenTable } from '@/components/tokens/TokenTable';
import { ChainFilter } from '@/components/tokens/ChainFilter';
import type { Chain } from '@/lib/types';

export default function FreshMeatPage() {
  const [chain, setChain] = useState<Chain>('all');
  const { pools, isLoading } = useNewPools(chain);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-5 py-2.5 border-b border-cream-300/60">
        <span className="text-[11px] font-semibold text-forest/60">New Pairs</span>
        <span className="w-px h-3.5 bg-forest/8" />
        <ChainFilter selected={chain} onChange={setChain} />
      </div>
      <div className="flex-1 min-h-0 overflow-auto">
        <TokenTable
          pools={pools}
          isLoading={isLoading}
          emptyMessage="No new pools found. Try a different chain."
        />
      </div>
    </div>
  );
}
