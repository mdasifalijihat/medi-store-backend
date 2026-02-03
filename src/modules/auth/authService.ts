import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface LoginInput {
  email: string;
  password: string;
}

const register = async (data: RegisterInput) => {
  const existing = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existing) throw new Error("Email already exists");

  const hashed = await bcrypt.hash(data.password, 10);
  return prisma.user.create({
    data: { ...data, password: hashed },
  });
};

const login = async (data: LoginInput) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(data.password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" },
  );
  return token;
};

export const authServices = {
  register,
  login,
};
