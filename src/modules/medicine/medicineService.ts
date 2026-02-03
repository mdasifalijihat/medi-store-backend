import { prisma } from "../../lib/prisma";

interface MedicineInput {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryName: string;
  sellerId: number;
}

interface MedicineUpdateInput {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  categoryName?: string;
  sellerId?: number;
}

const createMedicine = async (data: MedicineInput) => {
  const category = await prisma.category.findFirst({
    where: { name: data.categoryName },
  });
  const categoryId = category
    ? category.id
    : (
        await prisma.category.create({
          data: { name: data.categoryName },
        })
      ).id;
  return prisma.medicine.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      sellerId: data.sellerId,
      categoryId,
    },
  });
};

// get
const getAllMedicines = async (query: any) => {
  const { search, categoryId, minPrice, maxPrice } = query;

  return prisma.medicine.findMany({
    where: {
      name: search ? { contains: search, mode: "insensitive" } : undefined,
      categoryId: categoryId ? Number(categoryId) : undefined,
      price: {
        gte: minPrice ? Number(minPrice) : undefined,
        lte: maxPrice ? Number(maxPrice) : undefined,
      },
    },
    include: {
      category: true,
      seller: {
        select: { id: true, name: true },
      },
    },
  });
};

const getMedicineById = async (id: number) => {
  const medicine = await prisma.medicine.findUnique({
    where: { id },
    include: {
      category: true,
      seller: {
        select: { id: true, name: true },
      },
      reviews: true,
    },
  });

  if (!medicine) {
    throw new Error("Medicine not found");
  }

  return medicine;
};

// udate medicine
const updateMedicine = async (id: number, data: MedicineUpdateInput) => {
  let categoryId: number | undefined;

  // যদি categoryName আসে → find or create
  if (data.categoryName) {
    const category = await prisma.category.findFirst({
      where: { name: data.categoryName },
    });

    categoryId = category
      ? category.id
      : (
          await prisma.category.create({
            data: { name: data.categoryName },
          })
        ).id;
  }

  return prisma.medicine.update({
    where: { id },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.price !== undefined && { price: data.price }),
      ...(data.stock !== undefined && { stock: data.stock }),
      ...(data.sellerId !== undefined && { sellerId: data.sellerId }),
      ...(categoryId !== undefined && { categoryId }),
    },
  });
};

// deleted
const deleteMedicine = async (id: number) => {
  return prisma.medicine.delete({
    where: { id },
  });
};

export const medicineService = {
  createMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
};
