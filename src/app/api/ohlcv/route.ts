import { NextRequest, NextResponse } from 'next/server';
import { getOhlcv } from '@/lib/api/gecko-terminal';
import { withCache } from '@/lib/api/cache';
import { CACHE_TTL } from '@/lib/constants';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const network = searchParams.get('network') || '';
    const pool = searchParams.get('pool') || '';
    const timeframe = searchParams.get('timeframe') || 'day';
    const aggregate = parseInt(searchParams.get('aggregate') || '1');
    const limit = parseInt(searchParams.get('limit') || '100');

    if (!network || !pool) {
      return NextResponse.json({ error: 'Missing network or pool' }, { status: 400 });
    }

    const cacheKey = `ohlcv:${network}:${pool}:${timeframe}:${aggregate}`;
    const data = await withCache(cacheKey, CACHE_TTL.ohlcv, () =>
      getOhlcv(network, pool, timeframe, aggregate, limit)
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error('OHLCV API error:', error);
    return NextResponse.json([], { status: 500 });
  }
}
