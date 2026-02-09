'use client';

import type { RugScore } from '@/lib/types';
import { Panel } from '@/components/ui/Panel';
import { DegenScoreGauge } from './DegenScoreGauge';

interface RugScorePanelProps {
  score: RugScore;
}

export function RugScorePanel({ score }: RugScorePanelProps) {
  return (
    <Panel title="Rug Score">
      <div className="p-4">
        <div className="flex items-center justify-center mb-4">
          <DegenScoreGauge score={score.total} level={score.level} />
        </div>

        <div className="space-y-3">
          {Object.entries(score.breakdown).map(([key, item]) => {
            const pct = (item.score / item.max) * 100;
            const color = item.score === 0 ? '#059669' : item.score >= item.max * 0.7 ? '#dc2626' : '#d97706';
            return (
              <div key={key} className="space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-forest/35 capitalize font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span style={{ color }} className="font-mono font-semibold">
                    {item.score}/{item.max}
                  </span>
                </div>
                <div className="h-1 bg-forest/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
                <p className="text-[9px] text-forest/20">{item.detail}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}
