import { CHAIN_IDS, CHAIN_DISPLAY } from './constants';

export interface ChainInfo {
  id: string;
  geckoId: string;
  name: string;
  color: string;
  icon: string;
}

export const CHAINS: ChainInfo[] = [
  { id: 'solana', geckoId: 'solana', name: 'Solana', color: '#9945FF', icon: '◎' },
  { id: 'ethereum', geckoId: 'eth', name: 'Ethereum', color: '#627EEA', icon: 'Ξ' },
  { id: 'base', geckoId: 'base', name: 'Base', color: '#0052FF', icon: '🔵' },
  { id: 'bsc', geckoId: 'bsc', name: 'BSC', color: '#F3BA2F', icon: '🟡' },
  { id: 'arbitrum', geckoId: 'arbitrum', name: 'Arbitrum', color: '#28A0F0', icon: '🔷' },
  { id: 'polygon', geckoId: 'polygon_pos', name: 'Polygon', color: '#8247E5', icon: '🟣' },
  { id: 'avalanche', geckoId: 'avax', name: 'Avalanche', color: '#E84142', icon: '🔺' },
];

export function getGeckoNetworkId(chain: string): string {
  return CHAIN_IDS[chain] || chain;
}

export function getChainDisplay(geckoNetworkId: string) {
  return CHAIN_DISPLAY[geckoNetworkId] || { name: geckoNetworkId, color: '#666', icon: '?' };
}

export function getChainFromGeckoId(geckoId: string): ChainInfo | undefined {
  return CHAINS.find(c => c.geckoId === geckoId);
}
