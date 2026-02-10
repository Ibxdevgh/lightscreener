import { NextRequest, NextResponse } from 'next/server';
import { searchPools } from '@/lib/api/gecko-terminal';

export interface ListingSubmission {
  address: string;
  network: string;
  name: string;
  symbol: string;
  twitter?: string;
  description?: string;
  submittedAt: number;
  verified: boolean;
  priceUsd?: number;
  volume24h?: number;
}

// In-memory store — resets on serverless cold start.
// For production, swap with Vercel KV or any Redis/DB.
const submissions: ListingSubmission[] = [];

export async function GET() {
  return NextResponse.json(submissions);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { address, network, twitter, description } = body;

    if (!address || !network) {
      return NextResponse.json(
        { error: 'Token address and network are required' },
        { status: 400 }
      );
    }

    // Check for duplicate
    if (submissions.find((s) => s.address.toLowerCase() === address.toLowerCase() && s.network === network)) {
      return NextResponse.json(
        { error: 'This token has already been submitted' },
        { status: 409 }
      );
    }

    // Verify token exists on GeckoTerminal
    let verified = false;
    let name = '';
    let symbol = '';
    let priceUsd = 0;
    let volume24h = 0;

    try {
      const pools = await searchPools(address, network);
      if (pools.length > 0) {
        verified = true;
        const pool = pools[0];
        name = pool.attributes.name || '';
        symbol = name.split(' / ')[0] || '';
        priceUsd = parseFloat(pool.attributes.base_token_price_usd) || 0;
        volume24h = parseFloat(pool.attributes.volume_usd?.h24) || 0;
      }
    } catch {
      // Token not found or API error — still accept submission
    }

    const submission: ListingSubmission = {
      address,
      network,
      name,
      symbol,
      twitter: twitter || undefined,
      description: description || undefined,
      submittedAt: Date.now(),
      verified,
      priceUsd,
      volume24h,
    };

    submissions.unshift(submission);

    // Keep only latest 100
    if (submissions.length > 100) submissions.length = 100;

    return NextResponse.json({
      success: true,
      verified,
      submission,
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
