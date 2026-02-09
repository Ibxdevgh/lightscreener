'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { NormalizedPool } from '@/lib/types';
import { formatUsd, formatNumber, formatPercent, poolAge } from '@/lib/format';
import { getChainDisplay } from '@/lib/chains';

interface TokenRowProps {
  pool: NormalizedPool;
  index: number;
}

function PriceCell({ value }: { value: number }) {
  if (value === 0) return <span className="text-forest/30">-</span>;
  return (
    <span className={value > 0 ? 'text-emerald-600' : 'text-red-500'}>
      {formatPercent(value)}
    </span>
  );
}

export function TokenRow({ pool, index }: TokenRowProps) {
  const chain = getChainDisplay(pool.network);
  const totalTxns = pool.txns24h.buys + pool.txns24h.sells;

  return (
    <tr>
      <td className="text-center">
        <span className="text-forest/40 text-[10px] font-mono">{index + 1}</span>
      </td>
      <td>
        <Link
          href={`/token/${pool.network}/${pool.address}`}
          className="flex items-center gap-2.5"
        >
          <div className="w-7 h-7 rounded-full bg-forest/5 flex items-center justify-center text-[9px] overflow-hidden shrink-0 ring-1 ring-forest/8">
            {pool.baseToken.imageUrl ? (
              <Image
                src={pool.baseToken.imageUrl}
                alt=""
                width={28}
                height={28}
                className="w-full h-full object-cover"
                unoptimized
              />
            ) : (
              <span className="text-forest/40 font-bold">{pool.baseToken.symbol.slice(0, 2)}</span>
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-forest text-xs">{pool.baseToken.symbol}</span>
              <span className="text-forest/45 text-[10px]">/ {pool.quoteToken.symbol}</span>
            </div>
            <div className="flex items-center gap-1 text-[9px] text-forest/40">
              <span
                className="w-1.5 h-1.5 rounded-full inline-block shrink-0"
                style={{ backgroundColor: chain.color }}
              />
              <span className="truncate">{pool.dex}</span>
            </div>
          </div>
        </Link>
      </td>
      <td className="text-right font-mono text-forest/80 text-xs">
        {formatUsd(pool.priceUsd)}
      </td>
      <td className="text-right text-forest/50 text-[10px]">
        {poolAge(pool.createdAt)}
      </td>
      <td className="text-right font-mono text-forest/80 text-xs">
        {formatUsd(pool.volume24h, true)}
      </td>
      <td className="text-right text-forest/55 text-[10px] font-mono">
        {formatNumber(totalTxns)}
      </td>
      <td className="text-right text-[11px] font-mono"><PriceCell value={pool.priceChange5m} /></td>
      <td className="text-right text-[11px] font-mono"><PriceCell value={pool.priceChange1h} /></td>
      <td className="text-right text-[11px] font-mono"><PriceCell value={pool.priceChange6h} /></td>
      <td className="text-right text-[11px] font-mono"><PriceCell value={pool.priceChange24h} /></td>
      <td className="text-right font-mono text-forest/55 text-xs">
        {formatUsd(pool.liquidity, true)}
      </td>
      <td className="text-right font-mono text-forest/55 text-xs">
        {formatUsd(pool.fdv, true)}
      </td>
    </tr>
  );
}
