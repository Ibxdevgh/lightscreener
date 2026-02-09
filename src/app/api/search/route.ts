import { NextRequest, NextResponse } from 'next/server';
import { searchPools, normalizePool } from '@/lib/api/gecko-terminal';
import { withCache } from '@/lib/api/cache';
import { CACHE_TTL } from '@/lib/constants';

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get('q') || '';
    if (query.length < 2) {
      return NextResponse.json([]);
    }

    const cacheKey = `search:${query}`;
    const pools = await withCache(cacheKey, CACHE_TTL.search, async () => {
      const results = await searchPools(query);
      return results.map((p) => normalizePool(p, [])).slice(0, 20);
    });

    return NextResponse.json(pools);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json([], { status: 500 });
  }
}
