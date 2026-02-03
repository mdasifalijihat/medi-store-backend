import { Router } from "express";
import { orderController } from "./orderController";

const router = Router();

// customer
router.post("/", orderController.createOrder);


export const orderRoutes = router;
