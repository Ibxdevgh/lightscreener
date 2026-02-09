import { NextRequest, NextResponse } from 'next/server';
import { getPoolDetail, normalizePool } from '@/lib/api/gecko-terminal';
import { withCache } from '@/lib/api/cache';
import { CACHE_TTL } from '@/lib/constants';

export async function GET(
  req: NextRequest,
  { params }: { params: { network: string; address: string } }
) {
  try {
    const { network, address } = params;
    const cacheKey = `pool:${network}:${address}`;

    const pool = await withCache(cacheKey, CACHE_TTL.poolDetail, async () => {
      const { pool, tokens } = await getPoolDetail(network, address);
      return normalizePool(pool, tokens);
    });

    return NextResponse.json(pool);
  } catch (error) {
    console.error('Pool detail API error:', error);
    return NextResponse.json({ error: 'Pool not found' }, { status: 404 });
  }
}
