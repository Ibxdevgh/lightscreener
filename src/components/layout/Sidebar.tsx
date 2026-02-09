'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SearchBar } from './SearchBar';
import { CHAINS } from '@/lib/chains';

const NAV_ITEMS = [
  { href: '/app', label: 'Trending', icon: '🔥' },
  { href: '/app/fresh-meat', label: 'Fresh Meat', icon: '🥩' },
  { href: '/app/mooners', label: 'Mooners', icon: '🚀' },
  { href: '/app/rugged', label: 'Rugged', icon: '💀' },
];

const TOOLS = [
  { href: '#', label: 'Multicharts', icon: '📊' },
  { href: '#', label: 'Watchlist', icon: '⭐' },
  { href: '#', label: 'Alerts', icon: '🔔' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-[200px] shrink-0 flex-col border-r border-cream-300/80 overflow-y-auto">
      <div className="p-4 pb-3">
        <Link href="/app" className="flex items-center gap-2 mb-4">
          <span className="text-base font-serif font-bold text-forest tracking-tight">Screener</span>
        </Link>
        <SearchBar />
      </div>

      <nav className="px-3 pb-2">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === '/app'
              ? pathname === '/app'
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[12px] transition-all ${
                isActive
                  ? 'bg-lavender/15 text-forest font-semibold'
                  : 'text-forest/60 hover:text-forest/80 font-medium'
              }`}
            >
              <span className="text-xs w-4 text-center">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-2 mt-1">
        <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-forest/40 px-2.5 mb-1">
          Tools
        </p>
        {TOOLS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[12px] text-forest/55 hover:text-forest/80 transition-all font-medium"
          >
            <span className="text-xs w-4 text-center">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>

      <div className="px-3 pb-3 mt-auto border-t border-cream-300/60 pt-3">
        <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-forest/40 px-2.5 mb-1.5">
          Chains
        </p>
        {CHAINS.map((chain) => (
          <div
            key={chain.id}
            className="flex items-center gap-2 px-2.5 py-1 text-[11px] text-forest/55 hover:text-forest/80 transition-all cursor-pointer"
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: chain.color }}
            />
            {chain.name}
          </div>
        ))}
      </div>
    </aside>
  );
}
