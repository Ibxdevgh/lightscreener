import useSWR from 'swr';
import type { RugScore } from '@/lib/types';

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error(`API error ${r.status}`);
    return r.json();
  });

export function useRugScore(network: string, tokenAddress: string) {
  const isSolana = network === 'solana';
  const { data, error, isLoading } = useSWR<RugScore>(
    isSolana ? `/api/rug-score?address=${tokenAddress}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    rugScore: data || null,
    error,
    isLoading,
  };
}
