import { NextRequest, NextResponse } from 'next/server';
import { getNewPools, normalizePool } from '@/lib/api/gecko-terminal';
import { withCache } from '@/lib/api/cache';
import { CACHE_TTL } from '@/lib/constants';
import { getGeckoNetworkId } from '@/lib/chains';

export async function GET(req: NextRequest) {
  try {
    const network = req.nextUrl.searchParams.get('network');
    const geckoNetwork = network ? getGeckoNetworkId(network) : undefined;
    const cacheKey = `new-pools:${geckoNetwork || 'all'}`;

    const pools = await withCache(cacheKey, CACHE_TTL.newPools, async () => {
      const { pools, tokens } = await getNewPools(geckoNetwork);
      return pools.map((p) => normalizePool(p, tokens));
    });

    return NextResponse.json(pools);
  } catch (error) {
    console.error('New pools API error:', error);
    return NextResponse.json([], { status: 500 });
  }
}
