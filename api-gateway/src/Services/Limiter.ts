import rateLimit from "express-rate-limit";

export const readLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
});
