'use client';

import { useEffect, useRef, useState } from 'react';
import { createChart, type IChartApi, type CandlestickData, type Time, ColorType } from 'lightweight-charts';
import { useOhlcv } from '@/hooks/useOhlcv';
import type { TimeFrame } from '@/lib/types';

interface TokenChartProps {
  network: string;
  poolAddress: string;
}

const TIMEFRAMES: { label: string; value: TimeFrame }[] = [
  { label: '5m', value: '5m' },
  { label: '15m', value: '15m' },
  { label: '1H', value: '1h' },
  { label: '4H', value: '4h' },
  { label: '1D', value: '1d' },
];

export function TokenChart({ network, poolAddress }: TokenChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const [timeframe, setTimeframe] = useState<TimeFrame>('1h');
  const { ohlcv, isLoading } = useOhlcv(network, poolAddress, timeframe);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#f5f0e8' },
        textColor: '#b8b2a5',
        fontSize: 10,
      },
      grid: {
        vertLines: { color: 'rgba(26, 58, 42, 0.04)' },
        horzLines: { color: 'rgba(26, 58, 42, 0.04)' },
      },
      crosshair: {
        vertLine: { color: '#c4b5fd', width: 1, style: 3 },
        horzLine: { color: '#c4b5fd', width: 1, style: 3 },
      },
      rightPriceScale: {
        borderColor: 'rgba(26, 58, 42, 0.08)',
      },
      timeScale: {
        borderColor: 'rgba(26, 58, 42, 0.08)',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const series = chart.addCandlestickSeries({
      upColor: '#059669',
      downColor: '#dc2626',
      borderUpColor: '#059669',
      borderDownColor: '#dc2626',
      wickUpColor: '#059669',
      wickDownColor: '#dc2626',
    });

    chartRef.current = chart;

    if (ohlcv.length > 0) {
      const data: CandlestickData[] = ohlcv
        .map((d) => ({
          time: d.dt as Time,
          open: d.o,
          high: d.h,
          low: d.l,
          close: d.c,
        }))
        .sort((a, b) => (a.time as number) - (b.time as number));
      series.setData(data);
      chart.timeScale().fitContent();
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        chart.applyOptions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      chartRef.current = null;
    };
  }, [ohlcv]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-1 px-4 py-2 border-b border-cream-300/60">
        {TIMEFRAMES.map((tf) => (
          <button
            key={tf.value}
            onClick={() => setTimeframe(tf.value)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${
              timeframe === tf.value
                ? 'bg-forest/8 text-forest/70 font-semibold'
                : 'text-forest/25 hover:text-forest/50'
            }`}
          >
            {tf.label}
          </button>
        ))}
      </div>
      <div className="flex-1 relative min-h-[400px]">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <span className="text-xs text-forest/20 animate-pulse">Loading chart...</span>
          </div>
        )}
        <div ref={chartContainerRef} className="absolute inset-0" />
      </div>
    </div>
  );
}
