import { Request, Response } from "express";
import { medicineService } from "./medicineService";

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

export const medicineController = {
  createMedicine,
};
