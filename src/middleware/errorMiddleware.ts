import { Request, Response, NextFunction } from "express";
import { Prisma } from "../../generated/prisma/client";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    statusCode = 400;
    message = err.message;
  }

  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (err.message) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};
