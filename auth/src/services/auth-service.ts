import bcrypt from 'bcryptjs';
import User from '../models/User';
import { JwtService } from '../services/jwt-service';



export class AuthService {

    static async register(email: string, password: string) {
        const existingUser = await User.findOne({email});

        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash( password, 10 );

        const user = new User({email, password: hashedPassword});
        //await user.save();
        
        const refreshedToken = JwtService.generateRefreshToken(user._id.toString());
        const accessToken = JwtService.generateAccessToken(user._id.toString());

        user.token = refreshedToken;
        await user.save();

        return {accessToken, refreshToken: refreshedToken};
    }

    static async login(email: string, password: string){

        const existingUser = await User.findOne({email});
        if (!existingUser) {
            throw new Error('User does not exist');
        }

        const isPasswordMatch = await bcrypt.compare(password,existingUser.password)
    
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
        const user = await User.findOne({token: verifyRefreshToken});
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
}