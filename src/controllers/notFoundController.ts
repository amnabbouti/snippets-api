import {Request, Response, NextFunction} from "express";

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        error: 'Not Found',
        message: `The requested endpoint doesn't exist.`,
        method: req.method,
        path: req.originalUrl,
    });
};