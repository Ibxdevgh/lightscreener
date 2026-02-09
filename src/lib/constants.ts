export const GECKO_TERMINAL_BASE = 'https://api.geckoterminal.com/api/v2';

export const CHAIN_IDS: Record<string, string> = {
  solana: 'solana',
  ethereum: 'eth',
  base: 'base',
  bsc: 'bsc',
  arbitrum: 'arbitrum',
  polygon: 'polygon_pos',
  avalanche: 'avax',
};

export const CHAIN_DISPLAY: Record<string, { name: string; color: string; icon: string }> = {
  solana: { name: 'Solana', color: '#9945FF', icon: '◎' },
  eth: { name: 'Ethereum', color: '#627EEA', icon: 'Ξ' },
  base: { name: 'Base', color: '#0052FF', icon: '🔵' },
  bsc: { name: 'BSC', color: '#F3BA2F', icon: '🟡' },
  arbitrum: { name: 'Arbitrum', color: '#28A0F0', icon: '🔷' },
  polygon_pos: { name: 'Polygon', color: '#8247E5', icon: '🟣' },
  avax: { name: 'Avalanche', color: '#E84142', icon: '🔺' },
};

export const WHALE_THRESHOLD_USD = 10000;
export const SNIPER_BLOCK_WINDOW = 5;

export const CACHE_TTL = {
  trending: 120,
  newPools: 120,
  poolDetail: 60,
  ohlcv: 120,
  trades: 30,
  search: 300,
  rugScore: 600,
} as const;

export const REFRESH_INTERVALS = {
  trending: 120000,
  newPools: 120000,
  poolDetail: 60000,
  trades: 30000,
  search: 0,
} as const;
