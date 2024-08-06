import { Request, Response, NextFunction } from 'express';


export const validateLogoutBody = (req: Request, res: Response, next: NextFunction) => {

    if (!req.body || typeof req.body.userId !== 'string') {
        return res.status(400).json({ message: 'Invalid request body. User ID is required and must be a string!' });
    }
    next();
}