import { grantStockReward } from "../reward/reward.service.js";

export async function grantReward(req, res) {
  try {
    const { stockId, quantity, inrAmount, rewardedAt, externalRef } = req.body;

    const reward = await grantStockReward({
      userId: req.user.id,
      stockId,
      quantity,
      inrAmount,
      rewardedAt,
      externalRef,
    });

    res.status(201).json({
      success: true,
      data: reward,
    });
  } catch (error) {
    console.error("grant reward fail::", error);

    res.status(500).json({
      success: false,
      message: "failed to grant reward",
    });
  }
}
