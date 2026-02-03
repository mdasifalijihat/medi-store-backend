import { prisma } from "../../lib/prisma.js";

// Users
const getAllUsers = async () => {
  return prisma.user.findMany();
};

const updateUserStatus = async (id: number, status: "active" | "banned") => {
  return prisma.user.update({
    where: { id },
    data: { status },
  });
};

// Orders
const getAllOrders = async () => {
  return prisma.order.findMany({
    include: {
      items: {
        include: {
          medicine: true,
        },
      },
      customer: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

// Categories
const createCategory = async (name: string) => {
  return prisma.category.create({ data: { name } });
};

const updateCategory = async (id: number, name: string) => {
  return prisma.category.update({
    where: { id },
    data: { name },
  });
};

const deleteCategory = async (id: number) => {
  const medicineCount = await prisma.medicine.count({
    where: { categoryId: id },
  });

  if (medicineCount > 0) {
    throw new Error("Cannot delete category with medicines");
  }

  return prisma.category.delete({ where: { id } });
};

export const adminService = {
  getAllUsers,
  updateUserStatus,
  getAllOrders,
  createCategory,
  updateCategory,
  deleteCategory,
};
