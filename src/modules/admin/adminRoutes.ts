import { Router } from "express";
import { auth } from "../../middleware/authMiddleware.js";
import { adminController } from "./adminController.js";

const router = Router();

// All routes protected, admin only
router.use(auth("ADMIN"));

// Users
router.get("/users", adminController.getAllUsers);
router.patch("/users/:id", adminController.updateUserStatus);

// Orders
router.get("/orders", adminController.getAllOrders);

// Categories
router.post("/categories", adminController.createCategory);
router.put("/categories/:id", adminController.updateCategory);
router.delete("/categories/:id", adminController.deleteCategory);

export default router;
