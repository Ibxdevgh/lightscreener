import { NextRequest, NextResponse } from 'next/server';
import { computeRugScore } from '@/lib/analysis/rug-score';
import { withCache } from '@/lib/api/cache';
import { CACHE_TTL } from '@/lib/constants';

export async function GET(req: NextRequest) {
  try {
    const address = req.nextUrl.searchParams.get('address');
    if (!address) {
      return NextResponse.json({ error: 'Missing address' }, { status: 400 });
    }

    const cacheKey = `rug-score:${address}`;
    const score = await withCache(cacheKey, CACHE_TTL.rugScore, () =>
      computeRugScore(address)
    );

    return NextResponse.json(score);
  } catch (error) {
    console.error('Rug score API error:', error);
    return NextResponse.json({ error: 'Failed to compute rug score' }, { status: 500 });
  }
}
