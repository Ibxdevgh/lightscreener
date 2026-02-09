export interface Pool {
  id: string;
  type: string;
  attributes: {
    name: string;
    address: string;
    base_token_price_usd: string;
    quote_token_price_usd: string;
    base_token_price_native_currency: string;
    fdv_usd: string;
    market_cap_usd: string | null;
    price_change_percentage: {
      m5: string;
      h1: string;
      h6: string;
      h24: string;
    };
    transactions: {
      m5: { buys: number; sells: number };
      h1: { buys: number; sells: number };
      h6: { buys: number; sells: number };
      h24: { buys: number; sells: number };
    };
    volume_usd: {
      m5: string;
      h1: string;
      h6: string;
      h24: string;
    };
    reserve_in_usd: string;
    pool_created_at: string;
  };
  relationships: {
    base_token: { data: { id: string; type: string } };
    quote_token: { data: { id: string; type: string } };
    dex: { data: { id: string; type: string } };
    network: { data: { id: string; type: string } };
  };
}

export interface Token {
  id: string;
  type: string;
  attributes: {
    address: string;
    name: string;
    symbol: string;
    image_url: string | null;
    coingecko_coin_id: string | null;
  };
}

export interface OhlcvData {
  dt: number;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
}

export interface Trade {
  block_number: number;
  tx_hash: string;
  tx_from_address: string;
  kind: 'buy' | 'sell';
  volume_in_usd: string;
  price_from_in_currency_token: string;
  price_to_in_currency_token: string;
  price_from_in_usd: string;
  price_to_in_usd: string;
  block_timestamp: string;
}

export interface RugScore {
  total: number;
  breakdown: {
    liquidityLocked: { score: number; max: 25; detail: string };
    holderConcentration: { score: number; max: 25; detail: string };
    mintAuthority: { score: number; max: 20; detail: string };
    freezeAuthority: { score: number; max: 15; detail: string };
    devWalletSold: { score: number; max: 15; detail: string };
  };
  level: 'safe' | 'caution' | 'danger' | 'rug';
}

export interface WhaleAlert {
  id: string;
  type: 'buy' | 'sell';
  amount_usd: number;
  token_symbol: string;
  wallet: string;
  timestamp: number;
  pool_address: string;
  network: string;
}

export interface NormalizedPool {
  address: string;
  name: string;
  network: string;
  dex: string;
  priceUsd: number;
  priceChange5m: number;
  priceChange1h: number;
  priceChange6h: number;
  priceChange24h: number;
  volume24h: number;
  volume1h: number;
  volume5m: number;
  liquidity: number;
  fdv: number;
  marketCap: number | null;
  txns24h: { buys: number; sells: number };
  txns1h: { buys: number; sells: number };
  txns5m: { buys: number; sells: number };
  baseToken: { address: string; name: string; symbol: string; imageUrl: string | null };
  quoteToken: { address: string; name: string; symbol: string; imageUrl: string | null };
  createdAt: string;
  rugScore?: RugScore;
}

export interface SearchResult {
  id: string;
  network: string;
  address: string;
  name: string;
  symbol: string;
  imageUrl: string | null;
  priceUsd: string;
  pools: string[];
}

export type TimeFrame = '5m' | '15m' | '1h' | '4h' | '1d';
export type SortField = 'volume24h' | 'priceChange24h' | 'priceChange1h' | 'liquidity' | 'fdv' | 'createdAt' | 'txns24h';
export type SortDirection = 'asc' | 'desc';
export type Chain = 'all' | 'solana' | 'ethereum' | 'base' | 'bsc' | 'arbitrum' | 'polygon' | 'avalanche';
