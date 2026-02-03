import express from "express";
import { authRouter } from "./modules/auth/authRoutes";
import { medicineRoutes } from "./modules/medicine/medicineRoutes";

const app = express();
app.use(express.json());

app.use("/auth", authRouter);

app.use("/medicines", medicineRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
export default app;
