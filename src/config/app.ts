// src/config/app.ts
import express, {Express} from 'express';
import {securityMiddleware} from '../middleware/securityMiddleware';
import {errorHandler} from '../middleware/errorMiddleware';
import {appMiddleware} from '../middleware/appMiddleware';
import {notFoundHandler} from '../controllers/notFoundController';
import {renderHome} from '../controllers/homeController';
import snippetRoutes from '../routes/snippetRoutes';

export function configureApp(): Express {
    const app = express();

    // Middleware
    app.use(securityMiddleware);
    app.use(express.json());
    app.use(appMiddleware);
    app.use(express.static('src/public'));

    // View engine
    app.set('view engine', 'ejs');
    app.set('views', '../../src/views');

    // Routes
    app.get('/', renderHome);
    app.use('/api', snippetRoutes);

    // Handle 404s
    app.use(notFoundHandler);

    // Error handling must be last
    app.use(errorHandler);

    return app;
}