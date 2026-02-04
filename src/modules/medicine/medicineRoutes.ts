import { Router } from "express";
import { medicineController } from "./medicineController";
import { auth } from "../../middleware/authMiddleware";

const router = Router();

// public
router.get("/", medicineController.getAllMedicines);
router.get("/:id", medicineController.getMedicineById);

// privete hobe
router.post("/", auth("SELLER", "ADMIN"), medicineController.createMedicine);
router.put("/:id", auth("SELLER", "ADMIN"), medicineController.updateMedicine);
router.delete(
  "/:id",
  auth("SELLER", "ADMIN"),
  medicineController.deleteMedicine,
);

export const medicineRoutes: Router = router;
