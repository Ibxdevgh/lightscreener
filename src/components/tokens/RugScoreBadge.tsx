import type { RugScore } from '@/lib/types';
import { rugScoreColor } from '@/lib/format';

interface RugScoreBadgeProps {
  score?: RugScore;
  compact?: boolean;
}

export function RugScoreBadge({ score, compact }: RugScoreBadgeProps) {
  if (!score) {
    return (
      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-lg text-[10px] text-forest/15">
        --
      </span>
    );
  }

  const color = rugScoreColor(score.level);

  if (compact) {
    return (
      <span
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold"
        style={{ backgroundColor: `${color}15`, color }}
      >
        {score.total}
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold"
      style={{ backgroundColor: `${color}12`, color }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {score.total} {score.level.toUpperCase()}
    </span>
  );
}
