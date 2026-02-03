import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";


interface JwtPayload {
  userId: number;
  role: "CUSTOMER" | "SELLER" | "ADMIN";
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role: string;
      };
    }
  }
}

export const auth =
  (...roles: ("CUSTOMER" | "SELLER" | "ADMIN")[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      if (roles.length && !roles.includes(user.role as any)) {
        return res.status(403).json({
          message: "Forbidden",
        });
      }

      req.user = {
        id: user.id,
        role: user.role,
      };

      next();
    } catch (error) {
      next(error);
    }
  };
