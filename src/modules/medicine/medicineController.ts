import { Request, Response } from "express";
import { medicineService } from "./medicineService";

// create medicine
const createMedicine = async (req: Request, res: Response) => {
  try {
    const medicine = await medicineService.createMedicine(req.body);
    res.status(201).json({
      message: "Medicine created successfully",
      medicine,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// get all medicien
const getAllMedicines = async (req: Request, res: Response) => {
  try {
    const medicines = await medicineService.getAllMedicines(req.query);
    res.json(medicines);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// get by id
const getMedicineById = async (req: Request, res: Response) => {
  try {
    const medicine = await medicineService.getMedicineById(
      Number(req.params.id),
    );
    res.json(medicine);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// update medicine
const updateMedicine = async (req: Request, res: Response) => {
  try {
    const medicine = await medicineService.updateMedicine(
      Number(req.params.id),
      req.body,
    );
    res.json({
      message: "Medicine updated successfully",
      medicine,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// deleted medicine
const deleteMedicine = async (req: Request, res: Response) => {
  try {
    await medicineService.deleteMedicine(Number(req.params.id));
    res.json({ message: "Medicine deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const medicineController = {
  createMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
};
