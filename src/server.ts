import express, {Express, Request, Response} from 'express';
import mongoose from 'mongoose';
import {config} from './config/config';
import snippetRoutes from './routes/snippetRoutes';

const app: Express = express();

app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

// MongoDB connection
async function connectDB() {
    try {
        await mongoose.connect(config.mongoUri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

app.use('/api', snippetRoutes);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
    connectDB();
});