'use client';

import { useTokenData } from '@/hooks/useTokenData';
import { useRugScore } from '@/hooks/useRugScore';
import { useTrades } from '@/hooks/useTrades';
import { TokenChart } from '@/components/detail/TokenChart';
import { TokenSidebar } from '@/components/detail/TokenSidebar';
import { DetailTabs } from '@/components/detail/DetailTabs';
import { HoneypotIndicator } from '@/components/degen/HoneypotIndicator';
import { DevWalletTracker } from '@/components/degen/DevWalletTracker';
import { Skeleton } from '@/components/ui/Skeleton';
import Link from 'next/link';

interface TokenPageProps {
  params: { network: string; address: string };
}

export default function TokenPage({ params }: TokenPageProps) {
  const { network, address } = params;
  const { pool, isLoading } = useTokenData(network, address);
  const { rugScore } = useRugScore(network, pool?.baseToken?.address || '');
  const { trades } = useTrades(network, address);

  if (isLoading) {
    return (
      <div className="p-5 space-y-4">
        <Skeleton className="h-5 w-40" />
        <div className="grid grid-cols-[1fr_280px] gap-4">
          <Skeleton className="h-[420px]" />
          <div className="space-y-4">
            <Skeleton className="h-36" />
            <Skeleton className="h-52" />
          </div>
        </div>
      </div>
    );
  }

  if (!pool || !pool.baseToken) {
    return (
      <div className="flex flex-col items-center justify-center h-52 gap-3">
        <p className="text-forest/25 text-xs">Pool not found</p>
        <Link href="/" className="text-[11px] font-medium text-forest/50 hover:text-forest transition-all">
          Back to trending
        </Link>
      </div>
    );
  }

  return (
    <div className="p-5 space-y-4">
      <div className="flex items-center gap-1.5 text-[10px] text-forest/25">
        <Link href="/" className="hover:text-forest/50 transition-colors">Trending</Link>
        <span>/</span>
        <span className="text-forest/60 font-medium">{pool.baseToken.symbol} / {pool.quoteToken?.symbol ?? '???'}</span>
      </div>

      {trades.length > 0 && <HoneypotIndicator trades={trades} />}

      <div className="grid grid-cols-[1fr_280px] gap-4">
        <div className="space-y-4">
          <div className="border border-cream-300/60 rounded-2xl overflow-hidden">
            <TokenChart network={network} poolAddress={address} />
          </div>
          <div className="border border-cream-300/60 rounded-2xl overflow-hidden">
            <DetailTabs
              network={network}
              poolAddress={address}
              tokenAddress={pool.baseToken.address}
            />
          </div>
        </div>

        <div className="space-y-4">
          <TokenSidebar pool={pool} rugScore={rugScore} />
          <DevWalletTracker network={network} tokenAddress={pool.baseToken.address} />
        </div>
      </div>
    </div>
  );
}
