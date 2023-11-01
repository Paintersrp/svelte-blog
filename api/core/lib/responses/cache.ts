export const CacheSystemResponses = {
  CACHE_HIT: (key: number) => `Cache hit for key ${key}`,
  CACHE_MISS: (key: number) => `Cache miss for key ${key}`,
  CACHE_UPDATE: (key: number) => `Cache updated for key ${key}`,
  CACHE_DELETE: (key: number) => `Cache deleted for key ${key}`,
  CACHE_DELETE_FAIL: (key: number) =>
    `Cache deletion for key ${key} has failed`,
  CACHE_CLEAR: "Cache Clear",
};
