'use client';

import useSWR from 'swr';
import { Skeleton } from '@/components/ui/Skeleton';

interface HolderDistributionProps {
  network: string;
  tokenAddress: string;
}

export function HolderDistribution({ network, tokenAddress }: HolderDistributionProps) {
  const isSolana = network === 'solana';

  if (!isSolana) {
    return (
      <div className="flex items-center justify-center h-28 text-xs text-forest/30">
        Holder analysis available for Solana tokens only
      </div>
    );
  }

  return <SolanaHolders tokenAddress={tokenAddress} />;
}

function SolanaHolders({ tokenAddress }: { tokenAddress: string }) {
  const { isLoading } = useSWR(
    `/api/rug-score?address=${tokenAddress}`,
    (url: string) => fetch(url).then((r) => r.json()),
    { revalidateOnFocus: false }
  );

  if (isLoading) {
    return (
      <div className="space-y-1 p-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-5 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 text-xs text-forest/40">
      <p>Top holder data is included in the Rug Score analysis panel.</p>
      <p className="mt-1.5 text-[10px] text-forest/25">Holder concentration is factored into the rug score calculation.</p>
    </div>
  );
}
