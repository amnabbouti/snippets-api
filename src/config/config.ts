import dotenv from 'dotenv';

dotenv.config();

export interface Config {
    port: number;
    mongoUri: string;
    nodeEnv: string;
}

export const config: Config = {
    port: Number(process.env.PORT) || 3000,
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/snippets',
    nodeEnv: process.env.NODE_ENV || 'development',
};