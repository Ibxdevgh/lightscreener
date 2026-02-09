'use client';

import Link from 'next/link';
import { CHAINS } from '@/lib/chains';
import { WhaleAlertBanner } from '@/components/degen/WhaleAlertBanner';

export function TopBar() {
  return (
    <div className="shrink-0">
      <WhaleAlertBanner />
      <div className="h-9 border-b border-cream-300/80 flex items-center px-5 gap-3 overflow-x-auto">
        <Link
          href="/"
          className="text-[11px] font-semibold text-forest/70 hover:text-forest transition-colors whitespace-nowrap"
        >
          All Chains
        </Link>
        <span className="w-px h-3 bg-forest/20" />
        {CHAINS.map((chain) => (
          <button
            key={chain.id}
            className="flex items-center gap-1.5 text-[11px] text-forest/55 hover:text-forest/80 transition-colors whitespace-nowrap"
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: chain.color }}
            />
            {chain.name}
          </button>
        ))}
      </div>
    </div>
  );
}
