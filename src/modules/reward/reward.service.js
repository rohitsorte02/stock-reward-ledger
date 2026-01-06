import pool from "../../config/db.js";
import { createReward } from "../../db/repositories/reward.repository.js";
import { ledgerEntry } from "../../db/repositories/ledger.repository.js";

export async function grantStockReward({
  userId,
  stockId,
  quantity,
  inrAmount,
  rewardedAt,
  externalRef,
}) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const rewardEvent = await createReward(client, {
      userId,
      stockId,
      quantity,
      inrAmount,
      rewardedAt,
      externalRef,
    });

    await ledgerEntry(client, {
      rewardEventId: rewardEvent.id,
      userId,
      entryType: "CREDIT",
      stockId,
      stockUnits: quantity,
      inrAmount,
    });

    await client.query("COMMIT");

    return rewardEvent;
  } catch (error) {
    await client.query("ROLLBACK");

    throw error;
  } finally {
    client.release();
  }
}
