import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { grantReward } from "./reward.controller.js";

const router = Router();

router.post("/grant", authenticate, grantReward);

export default router;
