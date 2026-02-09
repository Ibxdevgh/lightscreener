import useSWR from 'swr';
import type { Trade } from '@/lib/types';
import { REFRESH_INTERVALS } from '@/lib/constants';

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error(`API error ${r.status}`);
    return r.json();
  });

export function useTrades(network: string, address: string) {
  const { data, error, isLoading } = useSWR<Trade[]>(
    `/api/trades?network=${network}&pool=${address}`,
    fetcher,
    { refreshInterval: REFRESH_INTERVALS.trades }
  );

  return {
    trades: data || [],
    error,
    isLoading,
  };
}
