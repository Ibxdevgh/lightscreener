import useSWR from 'swr';
import type { OhlcvData, TimeFrame } from '@/lib/types';

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error(`API error ${r.status}`);
    return r.json();
  });

const TF_MAP: Record<TimeFrame, { timeframe: string; aggregate: number }> = {
  '5m': { timeframe: 'minute', aggregate: 5 },
  '15m': { timeframe: 'minute', aggregate: 15 },
  '1h': { timeframe: 'hour', aggregate: 1 },
  '4h': { timeframe: 'hour', aggregate: 4 },
  '1d': { timeframe: 'day', aggregate: 1 },
};

export function useOhlcv(network: string, address: string, tf: TimeFrame = '1h') {
  const { timeframe, aggregate } = TF_MAP[tf];
  const { data, error, isLoading } = useSWR<OhlcvData[]>(
    `/api/ohlcv?network=${network}&pool=${address}&timeframe=${timeframe}&aggregate=${aggregate}`,
    fetcher,
    { refreshInterval: 60000 }
  );

  return {
    ohlcv: data || [],
    error,
    isLoading,
  };
}
