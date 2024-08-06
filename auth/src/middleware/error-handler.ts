import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack)
    res.status(500).json({ message: 'internal server error' });
}

export default errorHandler;