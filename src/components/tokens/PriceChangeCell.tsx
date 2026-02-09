import { formatPercent } from '@/lib/format';

interface PriceChangeCellProps {
  value: number;
}

export function PriceChangeCell({ value }: PriceChangeCellProps) {
  if (value === 0) return <span className="text-cream/25 text-[11px] font-mono">0.00%</span>;
  return (
    <span className={`text-[11px] font-mono ${value > 0 ? 'text-emerald-300' : 'text-red-300'}`}>
      {formatPercent(value)}
    </span>
  );
}
