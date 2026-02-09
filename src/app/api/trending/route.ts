import { NextRequest, NextResponse } from 'next/server';
import { getTrendingPools, normalizePool } from '@/lib/api/gecko-terminal';
import { withCache } from '@/lib/api/cache';
import { CACHE_TTL } from '@/lib/constants';
import { getGeckoNetworkId } from '@/lib/chains';

export async function GET(req: NextRequest) {
  try {
    const network = req.nextUrl.searchParams.get('network');
    const geckoNetwork = network ? getGeckoNetworkId(network) : undefined;
    const cacheKey = `trending:${geckoNetwork || 'all'}`;

    const pools = await withCache(cacheKey, CACHE_TTL.trending, async () => {
      const { pools, tokens } = await getTrendingPools(geckoNetwork);
      return pools.map((p) => normalizePool(p, tokens));
    });

    return NextResponse.json(pools);
  } catch (error) {
    console.error('Trending API error:', error);
    return NextResponse.json([], { status: 500 });
  }
}
