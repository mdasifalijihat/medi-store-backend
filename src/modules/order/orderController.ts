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

const getMyOrders = async (req: Request, res: Response) => {
  try {
    // const customerId = Number(req.query.customerId);

    // if (!customerId || isNaN(customerId)) {
    //   return res.status(400).json({
    //     message: "customerId query parameter is required",
    //   });
    // }
    // const customerId = req.user.id;
    const customerId = 1;

    const orders = await orderService.getOrdersByCustomer(customerId);
    res.json(orders);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await orderService.getOrderById(Number(req.params.id));
    res.json(order);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};



export const orderController = {
  createOrder,
  getMyOrders,
  getOrderById,

};
