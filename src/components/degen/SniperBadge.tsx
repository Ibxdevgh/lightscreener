import { Badge } from '@/components/ui/Badge';

interface SniperBadgeProps {
  blockNumber: number;
  poolCreationBlock?: number;
}

export function SniperBadge({ blockNumber, poolCreationBlock }: SniperBadgeProps) {
  if (!poolCreationBlock) return null;
  const diff = blockNumber - poolCreationBlock;
  if (diff > 5) return null;

  return (
    <Badge variant="warning">
      🎯 Sniper (block +{diff})
    </Badge>
  );
}
