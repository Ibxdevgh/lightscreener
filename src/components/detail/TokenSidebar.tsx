'use client';

import Image from 'next/image';
import type { NormalizedPool, RugScore } from '@/lib/types';
import { formatUsd, formatNumber, formatPercent, poolAge } from '@/lib/format';
import { getChainDisplay } from '@/lib/chains';
import { Panel } from '@/components/ui/Panel';
import { StatRow } from '@/components/ui/StatRow';
import { RugScorePanel } from '@/components/degen/RugScorePanel';

interface TokenSidebarProps {
  pool: NormalizedPool;
  rugScore: RugScore | null;
}

export function TokenSidebar({ pool, rugScore }: TokenSidebarProps) {
  const chain = getChainDisplay(pool.network);

  return (
    <div className="space-y-4">
      <Panel>
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-forest/5 flex items-center justify-center text-sm overflow-hidden ring-1 ring-cream-300/80">
              {pool.baseToken.imageUrl ? (
                <Image src={pool.baseToken.imageUrl} alt="" width={36} height={36} className="w-full h-full object-cover" unoptimized />
              ) : (
                <span className="text-forest/40 font-bold text-xs">{pool.baseToken.symbol.slice(0, 2)}</span>
              )}
            </div>
            <div>
              <h2 className="text-base font-serif font-bold text-forest">
                {pool.baseToken.symbol}
                <span className="text-forest/25 font-sans font-normal text-sm ml-1">/ {pool.quoteToken?.symbol ?? '???'}</span>
              </h2>
              <div className="flex items-center gap-1.5 text-[9px] text-forest/30">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: chain.color }} />
                <span>{chain.name}</span>
                <span className="text-forest/10">·</span>
                <span>{pool.dex}</span>
                <span className="text-forest/10">·</span>
                <span>{poolAge(pool.createdAt)} old</span>
              </div>
            </div>
          </div>

          <div className="text-xl font-bold font-mono text-forest mb-2">
            {formatUsd(pool.priceUsd)}
          </div>

          <div className="flex items-center gap-3">
            {[
              { label: '5m', value: pool.priceChange5m },
              { label: '1h', value: pool.priceChange1h },
              { label: '6h', value: pool.priceChange6h },
              { label: '24h', value: pool.priceChange24h },
            ].map((item) => (
              <div key={item.label} className="text-[10px]">
                <span className="text-forest/25 mr-0.5">{item.label}</span>
                <span className={item.value > 0 ? 'text-emerald-600 font-medium' : item.value < 0 ? 'text-red-500 font-medium' : 'text-forest/20'}>
                  {formatPercent(item.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      <Panel title="Pool Stats">
        <StatRow label="Liquidity" value={formatUsd(pool.liquidity, true)} />
        <StatRow label="Volume 24H" value={formatUsd(pool.volume24h, true)} />
        <StatRow label="Volume 1H" value={formatUsd(pool.volume1h, true)} />
        <StatRow label="FDV" value={formatUsd(pool.fdv, true)} />
        {pool.marketCap && <StatRow label="Market Cap" value={formatUsd(pool.marketCap, true)} />}
        <StatRow
          label="Txns 24H"
          value={
            <span>
              <span className="text-emerald-600">{formatNumber(pool.txns24h.buys)}</span>
              <span className="text-forest/15 mx-1">/</span>
              <span className="text-red-500">{formatNumber(pool.txns24h.sells)}</span>
            </span>
          }
        />
      </Panel>

      {rugScore && <RugScorePanel score={rugScore} />}
    </div>
  );
}
