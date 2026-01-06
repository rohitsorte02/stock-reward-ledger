// import pool from "../../config/db.js";

export async function createReward(
  client,
  { userId, stockId, quantity, rewardedAt, externalRef }
) {
  const query = ` INSERT INTO reward_events (
    user_id,
    stock_id,
    quantity,
    rewarded_at,
    external_ref
  )
  VALUES ($1, $2, $3, $4, $5)
  RETURNING 
    id,
    user_id,
    stock_id,
    quantity,
    rewarded_at,
    external_ref,
    created_at`;

  const values = [userId, stockId, quantity, rewardedAt, externalRef];

  const { rows } = await client.query(query, values);
  return rows[0];
}
