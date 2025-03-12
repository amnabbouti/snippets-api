import express, { Express, Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { config } from './config/config';
import connectDB from './config/database';
import { appMiddleware } from './middleware/appMiddleware';
import { errorHandler } from './middleware/errorMiddleware';
import { securityMiddleware } from './middleware/securityMiddleware';
import snippetRoutes from './routes/snippetRoutes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app: Express = express();

// Middleware
app.use(securityMiddleware);
app.use(errorHandler);
app.use(express.json());
app.use(appMiddleware);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, './public')));

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
