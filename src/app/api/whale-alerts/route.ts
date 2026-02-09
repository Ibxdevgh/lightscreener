import { NextRequest } from 'next/server';
import { getTrendingPools, normalizePool } from '@/lib/api/gecko-terminal';
import { getTrades } from '@/lib/api/gecko-terminal';
import { withCache } from '@/lib/api/cache';
import { WHALE_THRESHOLD_USD, CACHE_TTL } from '@/lib/constants';
import type { WhaleAlert, NormalizedPool } from '@/lib/types';

export const dynamic = 'force-dynamic';

async function getCachedTrending(): Promise<NormalizedPool[]> {
  return withCache('whale-trending', CACHE_TTL.trending, async () => {
    const { pools, tokens } = await getTrendingPools();
    return pools.map((p) => normalizePool(p, tokens));
  });
}

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();
  let closed = false;

  const stream = new ReadableStream({
    async start(controller) {
      const send = (alert: WhaleAlert) => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(alert)}\n\n`));
        } catch {
          closed = true;
        }
      };

      // Send initial batch — use cached trending, only fetch trades for 2 pools
      try {
        const normalized = await getCachedTrending();

        for (const pool of normalized.slice(0, 2)) {
          if (closed) break;
          try {
            const trades = await withCache(
              `whale-trades:${pool.network}:${pool.address}`,
              60,
              () => getTrades(pool.network, pool.address, WHALE_THRESHOLD_USD)
            );
            for (const trade of trades.slice(0, 3)) {
              send({
                id: `${trade.tx_hash}-${trade.block_number}`,
                type: trade.kind,
                amount_usd: parseFloat(trade.volume_in_usd),
                token_symbol: pool.baseToken.symbol,
                wallet: trade.tx_from_address,
                timestamp: new Date(trade.block_timestamp).getTime(),
                pool_address: pool.address,
                network: pool.network,
              });
            }
          } catch {
            // skip pool on error
          }
        }
      } catch (e) {
        console.error('Whale alerts initial fetch error:', e);
      }

      // Poll every 90s (uses cached trending, only 1 trades call)
      const interval = setInterval(async () => {
        if (closed) {
          clearInterval(interval);
          return;
        }
        try {
          const pools = await getCachedTrending();
          const pool = pools[Math.floor(Math.random() * Math.min(pools.length, 10))];
          if (!pool) return;
          const trades = await withCache(
            `whale-trades:${pool.network}:${pool.address}`,
            60,
            () => getTrades(pool.network, pool.address, WHALE_THRESHOLD_USD)
          );
          const trade = trades[0];
          if (trade) {
            send({
              id: `${trade.tx_hash}-${Date.now()}`,
              type: trade.kind,
              amount_usd: parseFloat(trade.volume_in_usd),
              token_symbol: pool.baseToken.symbol,
              wallet: trade.tx_from_address,
              timestamp: new Date(trade.block_timestamp).getTime(),
              pool_address: pool.address,
              network: pool.network,
            });
          }
        } catch {
          // ignore polling errors
        }
      }, 90000);

      req.signal.addEventListener('abort', () => {
        closed = true;
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
