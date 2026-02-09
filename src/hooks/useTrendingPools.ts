import useSWR from 'swr';
import type { NormalizedPool, Chain } from '@/lib/types';
import { REFRESH_INTERVALS } from '@/lib/constants';

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error(`API error ${r.status}`);
    return r.json();
  });

export function useTrendingPools(chain: Chain = 'all') {
  const params = chain !== 'all' ? `?network=${chain}` : '';
  const { data, error, isLoading } = useSWR<NormalizedPool[]>(
    `/api/trending${params}`,
    fetcher,
    { refreshInterval: REFRESH_INTERVALS.trending, errorRetryInterval: 3000, errorRetryCount: 5 }
  );

  return {
    pools: data || [],
    error,
    isLoading,
  };
}
