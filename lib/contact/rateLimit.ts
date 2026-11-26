import "server-only";

type RateLimitEntry = {
  count: number;
  expiresAt: number;
};

type RateLimitResult = {
  allowed: boolean;
  retryAfter: number;
};

const WINDOW_MS = 60_000;
const MAX_ENTRIES = 5000;

const requests = new Map<string, RateLimitEntry>();

export function checkContactRateLimit(
  key: string,
  maxRequests: number
): RateLimitResult {
  const now = Date.now();

  for (const [entryKey, entry] of requests) {
    if (entry.expiresAt <= now) {
      requests.delete(entryKey);
    }
  }

  const existing = requests.get(key);

  if (!existing) {
    if (requests.size >= MAX_ENTRIES) {
      return {
        allowed: false,
        retryAfter: 60,
      };
    }

    requests.set(key, {
      count: 1,
      expiresAt: now + WINDOW_MS,
    });

    return {
      allowed: true,
      retryAfter: 0,
    };
  }

  if (existing.count >= maxRequests) {
    return {
      allowed: false,
      retryAfter: Math.max(
        1,
        Math.ceil(
          (existing.expiresAt - now) / 1000
        )
      ),
    };
  }

  existing.count += 1;

  return {
    allowed: true,
    retryAfter: 0,
  };
}