import express from "express";
import authRoutes from "./modules/auth/auth.routes.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/check", (req, res) => {
  res.status(200).json({status: "okkkk"});
});

export default app;