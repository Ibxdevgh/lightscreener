'use client';

import { useState } from 'react';
import { TabSelector } from '@/components/tokens/TabSelector';
import { TransactionFeed } from './TransactionFeed';
import { HolderDistribution } from './HolderDistribution';

interface DetailTabsProps {
  network: string;
  poolAddress: string;
  tokenAddress: string;
}

const TABS = [
  { id: 'txns', label: 'Transactions', icon: '📊' },
  { id: 'holders', label: 'Holders', icon: '👥' },
];

export function DetailTabs({ network, poolAddress, tokenAddress }: DetailTabsProps) {
  const [activeTab, setActiveTab] = useState('txns');

  return (
    <div>
      <TabSelector tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
      <div className="mt-0">
        {activeTab === 'txns' && (
          <TransactionFeed network={network} poolAddress={poolAddress} />
        )}
        {activeTab === 'holders' && (
          <HolderDistribution network={network} tokenAddress={tokenAddress} />
        )}
      </div>
    </div>
  );
}
