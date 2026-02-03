import { prisma } from "../../lib/prisma";

interface MedicineInput {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  sellerId: number;
}

const createMedicine = async (data: MedicineInput) => {
  return prisma.medicine.create({
    data,
  });
};

export const medicineService = {
  createMedicine,
};
