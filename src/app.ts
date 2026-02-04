import express from "express";
import { authRouter } from "./modules/auth/authRoutes";
import { medicineRoutes } from "./modules/medicine/medicineRoutes";
import { orderRoutes } from "./modules/order/orderRoutes";
import { adminRoutes } from "./modules/admin/adminRoutes";

const app = express();
app.use(express.json());

app.use("/auth", authRouter);

app.use("/medicines", medicineRoutes);

app.use("/orders", orderRoutes);

app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
export default app;
