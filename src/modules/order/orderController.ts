import { Request, Response } from "express";
import { orderService } from "./orderService";

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json({
      message: "Order placed successfully (Cash on Delivery)",
      order,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};



export const orderController = {
  createOrder,
  
};
