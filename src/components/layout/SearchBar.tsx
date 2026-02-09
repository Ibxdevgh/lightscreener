'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/hooks/useSearch';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { results, isLoading } = useSearch(query);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <div className="relative">
        <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-forest/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => query.length > 1 && setIsOpen(true)}
          className="w-full bg-transparent border border-cream-300/80 rounded-lg px-2.5 pl-7 py-1.5 text-[11px] text-forest placeholder:text-forest/20 focus:outline-none focus:border-forest/15 transition-all"
        />
      </div>
      {isOpen && query.length > 1 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-cream-50 border border-cream-300/80 rounded-xl shadow-lg z-50 max-h-72 overflow-auto">
          {isLoading ? (
            <div className="p-3 text-[11px] text-forest/30 text-center">Searching...</div>
          ) : results.length === 0 ? (
            <div className="p-3 text-[11px] text-forest/30 text-center">No results</div>
          ) : (
            results.map((pool) => (
              <button
                key={`${pool.network}-${pool.address}`}
                onClick={() => {
                  router.push(`/token/${pool.network}/${pool.address}`);
                  setIsOpen(false);
                  setQuery('');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-forest/3 transition-colors text-left first:rounded-t-xl last:rounded-b-xl"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-semibold text-forest truncate">
                    {pool.baseToken.symbol}
                    <span className="text-forest/30 font-normal"> / {pool.quoteToken.symbol}</span>
                  </div>
                  <div className="text-[9px] text-forest/30 truncate">{pool.name}</div>
                </div>
                <span className="text-[8px] text-forest/25 bg-forest/5 px-1.5 py-0.5 rounded font-medium">{pool.network}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
