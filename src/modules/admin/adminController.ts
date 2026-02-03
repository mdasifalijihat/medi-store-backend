import { Request, Response } from "express";
import { adminService } from "./adminService.js";

// Users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await adminService.getAllUsers();
    res.json(users);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const user = await adminService.updateUserStatus(Number(id), status);

    res.json({ message: "User status updated", user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Orders
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await adminService.getAllOrders();
    res.json(orders);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Categories
const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await adminService.createCategory(req.body.name);
    res.status(201).json({ message: "Category created", category });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const category = await adminService.updateCategory(
      Number(req.params.id),
      req.body.name,
    );
    res.json({ message: "Category updated", category });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    await adminService.deleteCategory(Number(req.params.id));
    res.json({ message: "Category deleted" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const adminController = {
  getAllUsers,
  updateUserStatus,
  getAllOrders,
  createCategory,
  updateCategory,
  deleteCategory,
};
