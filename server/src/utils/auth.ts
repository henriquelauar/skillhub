import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

interface JwtPayload {
    userId: number;
    iat: number;
    exp: number;
}

const JWT_SECRET = process.env.JWT_SECRET || 'SEGREDO'
const SALT_ROUNDS = 10;

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (userId: number): string => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' }); 
};

export const verifyToken = (token: string): JwtPayload => {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
};