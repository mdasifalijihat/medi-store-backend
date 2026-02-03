import { Router } from "express";
import { orderController } from "./orderController";

const router = Router();

// customer
router.post("/", orderController.createOrder);
router.get("/", orderController.getMyOrders);
router.get("/:id", orderController.getOrderById);

// admin / seller
router.patch("/:id/status", orderController.updateOrderStatus);

export const orderRoutes = router;
