// import pool from "../../config/db.js";

export async function ledgerEntry(
  client,
  { userId, rewardEventId, entryType, stockId, stockUnits, inrAmount }
) {
  const query = ` INSERT INTO ledger_entries (
    reward_event_id,
    user_id,
    entry_type,
    stock_id,
    stock_units,
    inr_amount
  )
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING
    id,
    reward_event_id,
    user_id,
    entry_type,
    stock_id,
    stock_units,
    inr_amount,
    created_at`;

  const values = [
    rewardEventId,
    userId,
    entryType,
    stockId,
    stockUnits,
    inrAmount,
  ];

  const { rows } = await client.query(query, values);
  return rows[0];
}
