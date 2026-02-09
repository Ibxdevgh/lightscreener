'use client';

import { useTrades } from '@/hooks/useTrades';
import { formatUsd, shortenAddress, timeAgo } from '@/lib/format';
import { Skeleton } from '@/components/ui/Skeleton';

interface TransactionFeedProps {
  network: string;
  poolAddress: string;
}

export function TransactionFeed({ network, poolAddress }: TransactionFeedProps) {
  const { trades, isLoading } = useTrades(network, poolAddress);

  if (isLoading) {
    return (
      <div className="space-y-1 p-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-7 w-full" />
        ))}
      </div>
    );
  }

  if (trades.length === 0) {
    return (
      <div className="flex items-center justify-center h-28 text-xs text-forest/30">
        No recent trades
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-cream-300">
            <th className="text-[9px] font-semibold text-forest/30 uppercase tracking-wider py-1.5 px-3 text-left">Time</th>
            <th className="text-[9px] font-semibold text-forest/30 uppercase tracking-wider py-1.5 px-3 text-left">Type</th>
            <th className="text-[9px] font-semibold text-forest/30 uppercase tracking-wider py-1.5 px-3 text-right">Price</th>
            <th className="text-[9px] font-semibold text-forest/30 uppercase tracking-wider py-1.5 px-3 text-right">Volume</th>
            <th className="text-[9px] font-semibold text-forest/30 uppercase tracking-wider py-1.5 px-3 text-right">Maker</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade, i) => (
            <tr key={`${trade.tx_hash}-${i}`} className="border-b border-cream-200/50 hover:bg-cream-200/40 transition-colors">
              <td className="py-1 px-3 text-[10px] text-forest/40">
                {timeAgo(trade.block_timestamp)}
              </td>
              <td className="py-1 px-3">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg ${
                  trade.kind === 'buy' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                }`}>
                  {trade.kind.toUpperCase()}
                </span>
              </td>
              <td className="py-1 px-3 text-[10px] text-right font-mono text-forest">
                {formatUsd(parseFloat(trade.price_to_in_usd))}
              </td>
              <td className="py-1 px-3 text-[10px] text-right font-mono text-forest font-semibold">
                {formatUsd(parseFloat(trade.volume_in_usd), true)}
              </td>
              <td className="py-1 px-3 text-[10px] text-right font-mono text-forest/30">
                {shortenAddress(trade.tx_from_address, 4)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
