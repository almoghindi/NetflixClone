import jwt from 'jsonwebtoken';

export class JwtService {

    private static readonly ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN!;
    private static readonly REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN!;

    static generateAccessToken = (userId: string) : string => {
        return jwt.sign({userId}, this.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    }


    static generateRefreshToken = (userId: string) : string => {
        return jwt.sign({userId}, this.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    }

    static verifyAccessToken = (token: string) => {
        return jwt.verify(token, this.ACCESS_TOKEN_SECRET);
    }

    static verifyRefreshToken = (token: string) => {
        return jwt.verify(token, this.REFRESH_TOKEN_SECRET);
    }
}