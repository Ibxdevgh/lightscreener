import useSWR from 'swr';
import type { NormalizedPool } from '@/lib/types';
import { REFRESH_INTERVALS } from '@/lib/constants';

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error('Pool not found');
    return r.json();
  });

export function useTokenData(network: string, address: string) {
  const { data, error, isLoading } = useSWR<NormalizedPool>(
    `/api/pools/${network}/${address}`,
    fetcher,
    { refreshInterval: REFRESH_INTERVALS.poolDetail }
  );

  return {
    pool: data || null,
    error,
    isLoading,
  };
}
