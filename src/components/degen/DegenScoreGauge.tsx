'use client';

import { rugScoreColor } from '@/lib/format';

interface DegenScoreGaugeProps {
  score: number;
  level: string;
  size?: number;
}

export function DegenScoreGauge({ score, level, size = 100 }: DegenScoreGaugeProps) {
  const color = rugScoreColor(level);
  const circumference = Math.PI * 40;
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative" style={{ width: size, height: size / 2 + 10 }}>
        <svg
          viewBox="0 0 100 55"
          width={size}
          height={size / 2 + 10}
        >
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="rgba(26, 58, 42, 0.06)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke={color}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={`${circumference}`}
            strokeDashoffset={dashOffset}
          />
          <text
            x="50"
            y="48"
            textAnchor="middle"
            fill={color}
            fontSize="18"
            fontWeight="bold"
            fontFamily="'JetBrains Mono', monospace"
          >
            {score}
          </text>
        </svg>
      </div>
      <span
        className="text-[8px] font-semibold uppercase tracking-widest"
        style={{ color }}
      >
        {level}
      </span>
    </div>
  );
}
