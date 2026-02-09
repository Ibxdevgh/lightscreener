'use client';

import { CHAINS } from '@/lib/chains';
import type { Chain } from '@/lib/types';

interface ChainFilterProps {
  selected: Chain;
  onChange: (chain: Chain) => void;
}

export function ChainFilter({ selected, onChange }: ChainFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto">
      <button
        onClick={() => onChange('all')}
        className={`text-[10px] transition-all whitespace-nowrap ${
          selected === 'all'
            ? 'text-forest/70 font-semibold'
            : 'text-forest/45 hover:text-forest/70'
        }`}
      >
        All
      </button>
      {CHAINS.map((chain) => (
        <button
          key={chain.id}
          onClick={() => onChange(chain.id as Chain)}
          className={`flex items-center gap-1 text-[10px] transition-all whitespace-nowrap ${
            selected === chain.id
              ? 'text-forest/70 font-semibold'
              : 'text-forest/45 hover:text-forest/70'
          }`}
        >
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: chain.color }}
          />
          {chain.name}
        </button>
      ))}
    </div>
  );
}
