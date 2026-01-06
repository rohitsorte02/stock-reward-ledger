import express from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import { authenticate } from "./middlewares/auth.middleware.js";
import rewardRoutes from "./modules/reward/reward.routes.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/userProfile", authenticate, (req, res) => {
  res.json({
    success: true,
    messsage: "Access Granted",
    userId: req.user.id,
  });
});

app.use("/api/rewards", rewardRoutes);

app.get("/check", (req, res) => {
  res.status(200).json({ status: "okkkk" });
});

export default app;
