'use client';

import { Panel } from '@/components/ui/Panel';
import { shortenAddress } from '@/lib/format';

interface DevWalletTrackerProps {
  network: string;
  tokenAddress: string;
}

export function DevWalletTracker({ network, tokenAddress }: DevWalletTrackerProps) {
  if (network !== 'solana') return null;

  return (
    <Panel title="Dev Wallet">
      <div className="p-4 text-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-forest/30">Deployer</span>
          <span className="font-mono text-forest/60 font-medium">
            {shortenAddress(tokenAddress, 6)}
          </span>
        </div>
        <p className="text-[9px] text-forest/20 leading-relaxed">
          Dev wallet activity tracking requires indexed transaction history.
          Check the token on Solscan for full deployer activity.
        </p>
      </div>
    </Panel>
  );
}
