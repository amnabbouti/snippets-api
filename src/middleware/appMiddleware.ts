import express from 'express';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

export const appMiddleware = [
  express.json({ limit: '10mb' }),
  express.urlencoded({ extended: true }),
  limiter,
];
