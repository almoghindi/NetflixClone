import bcrypt from 'bcryptjs';
import User from '../models/User';
import { JwtService } from '../services/jwt-service';
import crypto from 'crypto';
import { PasswordResetToken } from '../models/password-reset-token';
import { sendEmail } from './email-service';
import decryptObject from '../utils/decryption';


export class AuthService {

    static async register(email: string, password: string) {
        const existingUser = await User.findOne({ email });
    
        if (existingUser) {
          throw new Error('User already exists');
        }
    
        const decryptedPassword = decryptObject(password);
    
        if (!decryptedPassword) {
          throw new Error('Password decryption failed');
        }
    
        const hashedPassword = await bcrypt.hash(decryptedPassword, 10);
        console.log(hashedPassword);
    
        const user = new User({ email, password: hashedPassword });
    
        const refreshToken = JwtService.generateRefreshToken(user._id.toString());
        const accessToken = JwtService.generateAccessToken(user._id.toString());
    
        user.token = refreshToken;
        await user.save();
    
        return { accessToken, refreshToken, userId: user._id.toString() };
    }
    

    static async login(email: string, password: string){

        const existingUser = await User.findOne({email});
        if (!existingUser) {
            throw new Error('User does not exist');
        }

        const decryptedPassword = decryptObject(password);

        if (!decryptedPassword) {
            throw new Error('Password decryption failed');
        }

        const isPasswordMatch = await bcrypt.compare(decryptedPassword,existingUser.password)
    
        if (!isPasswordMatch) {
            throw new Error('Incorrect password');
        }

        const refreshedToken = JwtService.generateRefreshToken(existingUser._id.toString());
        const accessToken = JwtService.generateAccessToken(existingUser._id.toString());

        existingUser.token = refreshedToken;
        await existingUser.save();

        return {accessToken, refreshToken: refreshedToken, user: existingUser};
    }

    static async refreshToken(refreshToken: string) {

        const verifyRefreshToken = JwtService.verifyRefreshToken(refreshToken); 
        if (!verifyRefreshToken) {
            throw new Error('Invalid refresh token');
        }
        const user = await User.findOne({token:refreshToken});
        if (!user) {
            throw new Error('Error verifying refresh token');
        }

        const accessToken = JwtService.generateAccessToken(user._id.toString());
        const newRefreshToken = JwtService.generateRefreshToken(user._id.toString());
        
        user.token = newRefreshToken;
        await user.save();
    
        return { accessToken, refreshToken: newRefreshToken };
    }

    static async logout(userId: string){
        const user = await User.findById(userId);
        
        if (!user){
            throw new Error('User not found');
        }

        user.token = null;
        await user.save();
    }

    static async generateResetToken(email: string): Promise<string> {

        const user = await User.findOne({ email });
        
        if (!user) {
            throw new Error('User not found');
        }

        const token = crypto.randomBytes(32).toString('hex');

        console.log("Token is " + token);
        await PasswordResetToken.findOneAndDelete({ userId: user._id });
        await PasswordResetToken.create({ userId: user._id, token });

        return token;
    }

    static async resetPassword(token: string, newPassword: string) : Promise<void> {

        const passwordResetToken = await PasswordResetToken.findOne({ token });
        console.log("Password reset token is " + passwordResetToken);
        if (!passwordResetToken) {
            throw new Error('Invalid password reset token');
        }

        const user = await User.findById(passwordResetToken.userId);

        if (!user) {
            throw new Error('User not found');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        await PasswordResetToken.deleteOne({_id: passwordResetToken._id});
    }

    static async requestPasswordReset(email: string): Promise<void> {
        const token = await this.generateResetToken(email);

        await sendEmail({
            to: email,
            from: process.env.EMAIL_FROM!,
            templateId: process.env.SENDGRID_RESET_TEMPLATE_ID!,
            dynamicTemplateData: {
                username: email.split('@')[0],
                email: email,
                resetLink: `${process.env.FRONTEND_URL}/reset-password?token=${token}`
            }
        })

        console.log("The Email SENT")
    }
}