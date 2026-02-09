import { GECKO_TERMINAL_BASE } from '../constants';
import type { Pool, Token, OhlcvData, Trade, NormalizedPool } from '../types';

const HEADERS = {
  Accept: 'application/json',
};

async function geckoFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${GECKO_TERMINAL_BASE}${path}`, { headers: HEADERS });
  if (!res.ok) {
    throw new Error(`GeckoTerminal API error: ${res.status} ${res.statusText} for ${path}`);
  }
  const json = await res.json();
  if (json.status?.error_code) {
    throw new Error(`GeckoTerminal API error: ${json.status.error_code} ${json.status.error_message}`);
  }
  return json;
}

export async function getTrendingPools(network?: string, page = 1): Promise<{ pools: Pool[]; tokens: Token[] }> {
  const path = network
    ? `/networks/${network}/trending_pools?page=${page}`
    : `/networks/trending_pools?page=${page}`;
  const data = await geckoFetch<{ data: Pool[]; included?: Token[] }>(path);
  return { pools: data.data, tokens: data.included || [] };
}

export async function getNewPools(network?: string, page = 1): Promise<{ pools: Pool[]; tokens: Token[] }> {
  const path = network
    ? `/networks/${network}/new_pools?page=${page}`
    : `/networks/new_pools?page=${page}`;
  const data = await geckoFetch<{ data: Pool[]; included?: Token[] }>(path);
  return { pools: data.data, tokens: data.included || [] };
}

export async function getPoolDetail(network: string, address: string): Promise<{ pool: Pool; tokens: Token[] }> {
  const data = await geckoFetch<{ data: Pool; included?: Token[] }>(
    `/networks/${network}/pools/${address}?include=base_token,quote_token`
  );
  return { pool: data.data, tokens: data.included || [] };
}

export async function getOhlcv(
  network: string,
  poolAddress: string,
  timeframe: string = 'day',
  aggregate = 1,
  limit = 100
): Promise<OhlcvData[]> {
  const data = await geckoFetch<{
    data: { attributes: { ohlcv_list: number[][] } };
  }>(
    `/networks/${network}/pools/${poolAddress}/ohlcv/${timeframe}?aggregate=${aggregate}&limit=${limit}`
  );
  return data.data.attributes.ohlcv_list.map(([dt, o, h, l, c, v]) => ({
    dt, o, h, l, c, v,
  }));
}

export async function getTrades(
  network: string,
  poolAddress: string,
  tradeVolumeInUsdGreaterThan?: number
): Promise<Trade[]> {
  let path = `/networks/${network}/pools/${poolAddress}/trades`;
  if (tradeVolumeInUsdGreaterThan) {
    path += `?trade_volume_in_usd_greater_than=${tradeVolumeInUsdGreaterThan}`;
  }
  const data = await geckoFetch<{ data: Array<{ attributes: Trade }> }>(path);
  return data.data.map((d) => d.attributes);
}

export async function searchPools(query: string, network?: string): Promise<Pool[]> {
  const path = network
    ? `/search/pools?query=${encodeURIComponent(query)}&network=${network}`
    : `/search/pools?query=${encodeURIComponent(query)}`;
  const data = await geckoFetch<{ data: Pool[] }>(path);
  return data.data;
}

function findToken(tokens: Token[], tokenRef: { id: string }): Token | undefined {
  return tokens.find((t) => t.id === tokenRef.id);
}

export function normalizePool(pool: Pool, tokens: Token[]): NormalizedPool {
  const a = pool.attributes;
  const baseTokenRef = pool.relationships.base_token.data;
  const quoteTokenRef = pool.relationships.quote_token.data;
  const baseToken = findToken(tokens, baseTokenRef);
  const quoteToken = findToken(tokens, quoteTokenRef);
  const networkId = pool.relationships.network?.data?.id || pool.id.split('_')[0] || '';

  return {
    address: a.address,
    name: a.name,
    network: networkId,
    dex: pool.relationships.dex?.data?.id || '',
    priceUsd: parseFloat(a.base_token_price_usd) || 0,
    priceChange5m: parseFloat(a.price_change_percentage?.m5) || 0,
    priceChange1h: parseFloat(a.price_change_percentage?.h1) || 0,
    priceChange6h: parseFloat(a.price_change_percentage?.h6) || 0,
    priceChange24h: parseFloat(a.price_change_percentage?.h24) || 0,
    volume24h: parseFloat(a.volume_usd?.h24) || 0,
    volume1h: parseFloat(a.volume_usd?.h1) || 0,
    volume5m: parseFloat(a.volume_usd?.m5) || 0,
    liquidity: parseFloat(a.reserve_in_usd) || 0,
    fdv: parseFloat(a.fdv_usd) || 0,
    marketCap: a.market_cap_usd ? parseFloat(a.market_cap_usd) : null,
    txns24h: a.transactions?.h24 || { buys: 0, sells: 0 },
    txns1h: a.transactions?.h1 || { buys: 0, sells: 0 },
    txns5m: a.transactions?.m5 || { buys: 0, sells: 0 },
    baseToken: {
      address: baseToken?.attributes?.address || baseTokenRef.id.split('_').pop() || '',
      name: baseToken?.attributes?.name || '',
      symbol: baseToken?.attributes?.symbol || a.name.split(' / ')[0] || '',
      imageUrl: baseToken?.attributes?.image_url || null,
    },
    quoteToken: {
      address: quoteToken?.attributes?.address || quoteTokenRef.id.split('_').pop() || '',
      name: quoteToken?.attributes?.name || '',
      symbol: quoteToken?.attributes?.symbol || a.name.split(' / ')[1] || '',
      imageUrl: quoteToken?.attributes?.image_url || null,
    },
    createdAt: a.pool_created_at,
  };
}
