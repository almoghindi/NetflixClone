import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth-service';
import { sendEmail } from '../services/email-service';

export class AuthController {

    static async login(req: Request, res: Response, next: NextFunction) {
        try{
            const { email, password } = req.body;
            const result = await AuthService.login(email, password); 
            res.json(result);
        }
        catch (err) {
            next(err);
        }

    }

    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const result = await AuthService.register(email, password);
            res.status(201).json(result);
        }
        catch (err) {
            next(err);
        }
    }

    static async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.body;
            console.log("UserId is"+userId);

            if (!userId){
                return res.status(400).json({ message: 'User ID is required in the request body!' });
            }
            
            await AuthService.logout(userId);
            res.sendStatus(204);
        }
        catch (err) {
            next(err);
        }
    }
    static async refreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.body;


            if (!refreshToken) {
                return res.status(400).json({ message: 'Refresh token is required in the request body!' });
            }

            const result = await AuthService.refreshToken(refreshToken);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    }

    static async requestPasswordReset(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
    
            // Generate a reset token and save it
            await AuthService.generateResetToken(email);
    
            await AuthService.requestPasswordReset(email);

            res.status(200).json({ message: 'If an account with that email exists, a password reset link has been sent.' });

        }
        catch (err) {
            next(err);
        }
    }



    static async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { token, newPassword } = req.body;
        
            await AuthService.resetPassword(token, newPassword);

            res.status(200).json({ message: 'Password reset successful.' });
    
        }
        catch (err) {
            next(err);
        }
    }
}