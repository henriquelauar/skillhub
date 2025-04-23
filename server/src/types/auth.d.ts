import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  userId: number;
}

declare global {
  namespace Express {
    interface Request {
      userId: number; // adiciona a propriedade userId
    }
  }
}
