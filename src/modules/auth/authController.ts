import { Request, Response } from "express";
import { authServices } from "./authService";

const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await authServices.register(req.body);
    res.status(201).json({ message: "User registered", user });
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

export const authController = {
  registerUser,
};
