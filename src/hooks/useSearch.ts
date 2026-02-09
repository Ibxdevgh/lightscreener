import useSWR from 'swr';
import type { NormalizedPool } from '@/lib/types';

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error(`API error ${r.status}`);
    return r.json();
  });

export function useSearch(query: string) {
  const { data, error, isLoading } = useSWR<NormalizedPool[]>(
    query.length > 1 ? `/api/search?q=${encodeURIComponent(query)}` : null,
    fetcher,
    { dedupingInterval: 500, revalidateOnFocus: false }
  );

  return {
    results: data || [],
    error,
    isLoading,
  };
}
