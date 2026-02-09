'use client';

import { useState, useEffect, useRef } from 'react';
import type { WhaleAlert } from '@/lib/types';

export function useWhaleAlerts() {
  const [alerts, setAlerts] = useState<WhaleAlert[]>([]);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    const es = new EventSource('/api/whale-alerts');
    eventSourceRef.current = es;

    es.onmessage = (event) => {
      try {
        const alert: WhaleAlert = JSON.parse(event.data);
        setAlerts((prev) => {
          const next = [alert, ...prev].slice(0, 50);
          return next;
        });
      } catch {
        // ignore parse errors
      }
    };

    es.onerror = () => {
      es.close();
      // reconnect after 5s
      setTimeout(() => {
        if (eventSourceRef.current === es) {
          eventSourceRef.current = new EventSource('/api/whale-alerts');
        }
      }, 5000);
    };

    return () => {
      es.close();
      eventSourceRef.current = null;
    };
  }, []);

  return { alerts };
}
