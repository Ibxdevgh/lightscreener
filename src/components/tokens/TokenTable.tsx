'use client';

import type { NormalizedPool, SortField, SortDirection } from '@/lib/types';
import { TokenRow } from './TokenRow';
import { Skeleton } from '@/components/ui/Skeleton';
import { useState } from 'react';

interface TokenTableProps {
  pools: NormalizedPool[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export function TokenTable({ pools, isLoading, emptyMessage }: TokenTableProps) {
  const [sortField, setSortField] = useState<SortField>('volume24h');
  const [sortDir, setSortDir] = useState<SortDirection>('desc');

  const sorted = [...pools].sort((a, b) => {
    let aVal: number, bVal: number;
    switch (sortField) {
      case 'volume24h': aVal = a.volume24h; bVal = b.volume24h; break;
      case 'priceChange24h': aVal = a.priceChange24h; bVal = b.priceChange24h; break;
      case 'priceChange1h': aVal = a.priceChange1h; bVal = b.priceChange1h; break;
      case 'liquidity': aVal = a.liquidity; bVal = b.liquidity; break;
      case 'fdv': aVal = a.fdv; bVal = b.fdv; break;
      case 'createdAt': aVal = new Date(a.createdAt).getTime(); bVal = new Date(b.createdAt).getTime(); break;
      case 'txns24h': aVal = a.txns24h.buys + a.txns24h.sells; bVal = b.txns24h.buys + b.txns24h.sells; break;
      default: return 0;
    }
    return sortDir === 'desc' ? bVal - aVal : aVal - bVal;
  });

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDir(sortDir === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <span className="ml-0.5 text-forest/30">↕</span>;
    return <span className="ml-0.5 text-lavender/80">{sortDir === 'desc' ? '↓' : '↑'}</span>;
  };

  const thSort = "text-right cursor-pointer hover:text-forest/50 select-none";

  if (isLoading) {
    return (
      <div className="space-y-1 p-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-full" />
        ))}
      </div>
    );
  }

  if (pools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-forest/45 text-xs gap-2">
        <span className="text-2xl">🏜</span>
        {emptyMessage || 'No tokens found'}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="token-table w-full">
        <thead>
          <tr>
            <th className="w-8 text-center">#</th>
            <th>Token</th>
            <th className="text-right">Price</th>
            <th className="text-right">Age</th>
            <th className={thSort} onClick={() => handleSort('volume24h')}>
              Volume<SortIcon field="volume24h" />
            </th>
            <th className={thSort} onClick={() => handleSort('txns24h')}>
              Txns<SortIcon field="txns24h" />
            </th>
            <th className="text-right">5m</th>
            <th className={thSort} onClick={() => handleSort('priceChange1h')}>
              1h<SortIcon field="priceChange1h" />
            </th>
            <th className="text-right">6h</th>
            <th className={thSort} onClick={() => handleSort('priceChange24h')}>
              24h<SortIcon field="priceChange24h" />
            </th>
            <th className={thSort} onClick={() => handleSort('liquidity')}>
              Liquidity<SortIcon field="liquidity" />
            </th>
            <th className={thSort} onClick={() => handleSort('fdv')}>
              MCap<SortIcon field="fdv" />
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((pool, i) => (
            <TokenRow
              key={`${pool.network}-${pool.address}`}
              pool={pool}
              index={i}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
