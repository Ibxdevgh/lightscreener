interface StatRowProps {
  label: string;
  value: string | React.ReactNode;
  className?: string;
}

export function StatRow({ label, value, className = '' }: StatRowProps) {
  return (
    <div className={`flex items-center justify-between py-2 px-4 ${className}`}>
      <span className="text-[11px] text-forest/40 font-medium">{label}</span>
      <span className="text-xs font-mono font-semibold text-forest">{value}</span>
    </div>
  );
}
