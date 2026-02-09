import type { Trade } from '@/lib/types';

export interface HoneypotResult {
  isHoneypot: boolean;
  buyCount: number;
  sellCount: number;
  ratio: number;
  warning: string | null;
}

export function checkHoneypot(trades: Trade[]): HoneypotResult {
  if (trades.length < 10) {
    return { isHoneypot: false, buyCount: 0, sellCount: 0, ratio: 0, warning: null };
  }

  const buys = trades.filter((t) => t.kind === 'buy').length;
  const sells = trades.filter((t) => t.kind === 'sell').length;
  const ratio = buys / Math.max(sells, 1);

  if (sells === 0 && buys > 5) {
    return {
      isHoneypot: true,
      buyCount: buys,
      sellCount: sells,
      ratio: Infinity,
      warning: 'No sells detected - potential honeypot',
    };
  }

  if (ratio > 10) {
    return {
      isHoneypot: false,
      buyCount: buys,
      sellCount: sells,
      ratio,
      warning: `Suspicious buy/sell ratio: ${ratio.toFixed(1)}x`,
    };
  }

  return { isHoneypot: false, buyCount: buys, sellCount: sells, ratio, warning: null };
}
