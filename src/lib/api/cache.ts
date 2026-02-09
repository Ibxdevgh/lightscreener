interface CacheEntry<T> {
  data: T;
  expiry: number;
}

const cache = new Map<string, CacheEntry<unknown>>();

export function getCached<T>(key: string): T | null {
  const entry = cache.get(key) as CacheEntry<T> | undefined;
  if (!entry) return null;
  if (Date.now() > entry.expiry) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

export function setCache<T>(key: string, data: T, ttlSeconds: number): void {
  cache.set(key, { data, expiry: Date.now() + ttlSeconds * 1000 });
}

export async function withCache<T>(
  key: string,
  ttlSeconds: number,
  fetcher: () => Promise<T>
): Promise<T> {
  const cached = getCached<T>(key);
  if (cached !== null) return cached;
  try {
    const data = await fetcher();
    setCache(key, data, ttlSeconds);
    return data;
  } catch (err) {
    // On error, return stale data if available (even if expired)
    const stale = cache.get(key) as CacheEntry<T> | undefined;
    if (stale) return stale.data;
    throw err;
  }
}
