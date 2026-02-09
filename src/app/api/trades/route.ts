import { NextRequest, NextResponse } from 'next/server';
import { getTrades } from '@/lib/api/gecko-terminal';
import { withCache } from '@/lib/api/cache';
import { CACHE_TTL } from '@/lib/constants';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const network = searchParams.get('network') || '';
    const pool = searchParams.get('pool') || '';

    if (!network || !pool) {
      return NextResponse.json({ error: 'Missing network or pool' }, { status: 400 });
    }

    const cacheKey = `trades:${network}:${pool}`;
    const data = await withCache(cacheKey, CACHE_TTL.trades, () =>
      getTrades(network, pool)
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error('Trades API error:', error);
    return NextResponse.json([], { status: 500 });
  }
}
