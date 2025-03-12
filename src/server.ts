import express, {Express, Request, Response} from 'express';
import mongoose from 'mongoose';
import {config} from './config/config';
import snippetRoutes from './routes/snippetRoutes';
import {securityMiddleware} from './middleware/securityMiddleware';

const app: Express = express();

// Security Middleware
app.use(securityMiddleware);

// Regular Middleware
app.use(express.json());
app.use(express.static('src/public'));
app.set('view engine', 'ejs');
app.set('views', './src/views');

// MongoDB connection
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

// Routes
app.get('/', (req: Request, res: Response) => {
    res.render('index');
});
app.use('/api', snippetRoutes);

// Start server
const port = config.port;
app.listen(port, () => {
    console.log(`Server running on port ${port} in ${config.nodeEnv} mode`);
    connectDB();
});