import { Badge } from '@/components/ui/Badge';
import type { Trade } from '@/lib/types';

interface HoneypotIndicatorProps {
  trades: Trade[];
}

export function HoneypotIndicator({ trades }: HoneypotIndicatorProps) {
  if (trades.length < 10) return null;

  const buys = trades.filter((t) => t.kind === 'buy').length;
  const sells = trades.filter((t) => t.kind === 'sell').length;

  if (sells === 0 && buys > 5) {
    return (
      <Badge variant="danger">
        Potential Honeypot - No sells detected
      </Badge>
    );
  }

  const ratio = buys / Math.max(sells, 1);
  if (ratio > 10) {
    return (
      <Badge variant="warning">
        Suspicious - Buy/Sell ratio: {ratio.toFixed(1)}x
      </Badge>
    );
  }

  return null;
}
