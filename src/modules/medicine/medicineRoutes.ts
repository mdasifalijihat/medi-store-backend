import { Router } from "express";
import { medicineController } from "./medicineController";

const router = Router();

// public
router.get("/", medicineController.getAllMedicines);
router.get("/:id", medicineController.getMedicineById);

// privete hobe
router.post("/", medicineController.createMedicine);
router.put("/:id", medicineController.updateMedicine);
router.delete("/:id", medicineController.deleteMedicine);

export const medicineRoutes: Router = router;
