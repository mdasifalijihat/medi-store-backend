import { Router } from "express";
import { authController } from "./authController";

const router = Router();

router.post("/register", authController.registerUser);

export const authRouter: Router = router;
