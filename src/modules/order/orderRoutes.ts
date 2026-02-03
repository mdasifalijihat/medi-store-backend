import { Router } from "express";
import { orderController } from "./orderController";

const router = Router();

// customer
router.post("/", orderController.createOrder);
router.get("/", orderController.getMyOrders);


export const orderRoutes = router;
