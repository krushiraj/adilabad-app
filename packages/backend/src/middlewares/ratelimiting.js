import rateLimit from "express-rate-limit";

const rateLimiter = (windowMs, max) =>
  rateLimit({
    windowMs,
    max,
    standardHeaders: true,
  });

export default rateLimiter;
