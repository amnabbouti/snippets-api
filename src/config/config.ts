import dotenv from 'dotenv';

dotenv.config();
export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3001'),
  mongoUri: process.env.MONGO_URI || '',
} as const;
