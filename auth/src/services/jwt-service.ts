import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IPasswordResetToken } from '../models/password-reset-token';

dotenv.config();
interface DecodedToken extends jwt.JwtPayload {
  userId: string,
  iat: number,
  exp: number
}
export class JwtService {

    private static readonly ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN!;
    private static readonly REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN!;
    
    
    static generateAccessToken = (userId: string) : string => {
        return jwt.sign({userId}, JwtService.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    }
    
    static generateRefreshToken = (userId: string) : string => {
        return jwt.sign({userId}, JwtService.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    }

    static verifyAccessToken = (token: string) => {
        return jwt.verify(token, JwtService.ACCESS_TOKEN_SECRET) as DecodedToken;
    }
    static verifyRefreshToken = (token: string): DecodedToken => {
        return jwt.verify(token, JwtService.REFRESH_TOKEN_SECRET) as DecodedToken;
    };
}