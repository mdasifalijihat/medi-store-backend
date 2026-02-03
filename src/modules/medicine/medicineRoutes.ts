import { Router } from "express";
import { medicineController } from "./medicineController";

const router = Router();

// public

// privete hobe
router.post("/", medicineController.createMedicine);

export const medicineRoutes: Router = router;
