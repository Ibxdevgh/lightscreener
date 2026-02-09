export function formatUsd(value: number, compact = false): string {
  if (value === 0) return '$0';
  if (compact) {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`;
  }
  if (value < 0.0001) return `$${value.toExponential(2)}`;
  if (value < 1) return `$${value.toPrecision(4)}`;
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatPercent(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

export function formatNumber(value: number, compact = false): string {
  if (compact) {
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
  }
  return value.toLocaleString('en-US');
}

export function shortenAddress(address: string, chars = 4): string {
  if (address.length <= chars * 2 + 3) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return `${seconds}s ago`;
}

export function poolAge(createdAt: string): string {
  const now = Date.now();
  const created = new Date(createdAt).getTime();
  const diff = now - created;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 30) return `${Math.floor(days / 30)}mo`;
  if (days > 0) return `${days}d`;
  if (hours > 0) return `${hours}h`;
  return `${minutes}m`;
}

export function rugScoreLevel(score: number): 'safe' | 'caution' | 'danger' | 'rug' {
  if (score <= 25) return 'safe';
  if (score <= 50) return 'caution';
  if (score <= 75) return 'danger';
  return 'rug';
}

export function rugScoreColor(level: string): string {
  switch (level) {
    case 'safe': return '#1a7a4c';
    case 'caution': return '#f59e0b';
    case 'danger': return '#ea580c';
    case 'rug': return '#c53030';
    default: return '#9b9b9b';
  }
}
