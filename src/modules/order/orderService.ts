import { prisma } from "../../lib/prisma";

interface OrderItemInput {
  medicineId: number;
  quantity: number;
}

interface CreateOrderInput {
  customerId: number;
  address: string;
  items: OrderItemInput[];
}

type OrderItemCreateInput = {
  medicineId: number;
  quantity: number;
  price: number;
};

const createOrder = async (data: CreateOrderInput) => {
  if (!data.items || data.items.length === 0) {
    throw new Error("Order items cannot be empty");
  }

  const orderItems: OrderItemCreateInput[] = [];
  let totalPrice = 0;

  for (const item of data.items) {
    const medicine = await prisma.medicine.findUnique({
      where: { id: item.medicineId },
    });

    if (!medicine) {
      throw new Error(`Medicine not found: ID ${item.medicineId}`);
    }

    if (medicine.stock < item.quantity) {
      throw new Error(`Not enough stock for ${medicine.name}`);
    }

    totalPrice += medicine.price * item.quantity;

    orderItems.push({
      medicineId: medicine.id,
      quantity: item.quantity,
      price: medicine.price,
    });
  }

  const order = await prisma.$transaction(async (tx) => {
    const createdOrder = await tx.order.create({
      data: {
        userId: data.customerId,
        address: data.address,
        totalPrice,
        status: "PLACED",
        items: {
          create: orderItems,
        },
      },
      include: { items: true },
    });

    for (const item of orderItems) {
      await tx.medicine.update({
        where: { id: item.medicineId },
        data: {
          stock: { decrement: item.quantity },
        },
      });
    }

    return createdOrder;
  });

  return order;
};

// customer orders
const getOrdersByCustomer = async (customerId: number) => {
  return prisma.order.findMany({
    where: { userId: customerId },
    include: {
      items: { include: { medicine: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};



export const orderService = {
  createOrder,
  getOrdersByCustomer,

};
