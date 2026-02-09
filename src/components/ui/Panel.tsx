interface PanelProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function Panel({ children, className = '', title }: PanelProps) {
  return (
    <div className={`border border-cream-300/60 rounded-2xl ${className}`}>
      {title && (
        <div className="px-4 py-2 border-b border-cream-300/60">
          <h3 className="text-[10px] font-semibold text-forest/30 uppercase tracking-wider">{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
}
