import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";

async function seedAdmin() {
  const adminEmail = "admin@medistore.com";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log("Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Super Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "ADMIN",
      status: "active",
    },
  });

  console.log("Admin created:", admin.email);
}

seedAdmin()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
