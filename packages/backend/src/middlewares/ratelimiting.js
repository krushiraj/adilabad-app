import rateLimit from "express-rate-limit";

const rateLimiter = (windowMs, max) =>
  rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    validate: {
      xForwardedForHeader: true,
    }
  });

export default rateLimiter;
