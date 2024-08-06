import { Request, Response, NextFunction } from 'express';

export class AuthController {

    static async login(req: Request, res: Response, next: NextFunction) {
        try{
            const { email, password } = req.body;

        }
        catch (err) {
            next(err);
        }

    }

    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
        }
        catch (err) {
            next(err);
        }
    }

    static async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
        }
        catch (err) {
            next(err);
        }
    }
    static async refreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.body;
        }
        catch (err) {
            next(err);
        }
    }
}