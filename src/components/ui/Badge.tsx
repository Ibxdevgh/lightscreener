interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'info';
  className?: string;
}

const VARIANT_STYLES = {
  default: 'bg-forest/5 text-forest/60',
  success: 'bg-emerald-50 text-emerald-700',
  danger: 'bg-red-50 text-red-700',
  warning: 'bg-amber-50 text-amber-700',
  info: 'bg-lavender/20 text-forest',
};

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-xl text-[10px] font-semibold ${VARIANT_STYLES[variant]} ${className}`}>
      {children}
    </span>
  );
}
