import rateLimit from 'koa-ratelimit';

export const rateLimitMiddleware = rateLimit({
  driver: 'memory',
  db: new Map(),
  duration: 60000,
  max: 100,
  errorMessage: 'Too many requests, please try again later.',
  headers: {
    remaining: 'Rate-Limit-Remaining',
    reset: 'Rate-Limit-Reset',
    total: 'Rate-Limit-Total',
  },
});
