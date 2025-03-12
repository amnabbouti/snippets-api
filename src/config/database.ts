import mongoose from 'mongoose';

import { config } from './config';

async function connectDB() {
  if (!config.mongoUri) {
    console.error('MongoDB URI is not defined');
    process.exit(1);
  }
  try {
    await mongoose.connect(config.mongoUri);
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

export default connectDB;
