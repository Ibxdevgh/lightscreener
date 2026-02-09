'use client';

import { useWhaleAlerts } from '@/hooks/useWhaleAlerts';
import { formatUsd, shortenAddress } from '@/lib/format';

export function WhaleAlertBanner() {
  const { alerts } = useWhaleAlerts();

  if (alerts.length === 0) {
    return (
      <div className="h-6 bg-cream-50 border-b border-cream-300 flex items-center justify-center overflow-hidden">
        <span className="text-[9px] text-forest/50 tracking-wide">
          Scanning for whale activity...
        </span>
      </div>
    );
  }

  const doubled = [...alerts, ...alerts];

  return (
    <div className="h-6 bg-cream-50 border-b border-cream-300 flex items-center overflow-hidden">
      <div className="whale-ticker">
        {doubled.map((alert, i) => (
          <span
            key={`${alert.id}-${i}`}
            className="inline-flex items-center gap-1 px-3 text-[9px] whitespace-nowrap"
          >
            <span className="text-[8px]">{alert.type === 'buy' ? '●' : '●'}</span>
            <span className="text-forest/50 font-mono">{shortenAddress(alert.wallet)}</span>
            <span className={alert.type === 'buy' ? 'text-emerald-600 font-medium' : 'text-red-500 font-medium'}>
              {alert.type === 'buy' ? 'bought' : 'sold'}
            </span>
            <span className="text-forest/80 font-semibold">{formatUsd(alert.amount_usd, true)}</span>
            <span className="text-forest/40">of</span>
            <span className="text-forest/90 font-semibold">{alert.token_symbol}</span>
            <span className="text-forest/25 mx-1.5">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
