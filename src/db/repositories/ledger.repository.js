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

//ledger all entries for a user

export async function getLeadgerEntriesByUser(
  client,
  { userId, limit, offset }
) {
  const query = `SELECT id, entry_type, stock_id, stock_units, inr_amount, created_at
                 FROm ledger_entries WHERE user_id = $1 ORDER By created_at DESC LIMIT $2 OFFSET $3`;

  const values = [userId, limit, offset];

  const { rows } = await client.query(query, values);

  return rows;
}

//count total ledger record for a user

export async function countLedgerEntriesByUser(client, userId) {
  const query = `SELECT COUNT(*) AS count
                FROM ledger_entries
                WHERE user_id = $1`;

  const { rows } = await client.query(query, [userId]);
  return Number(rows[0].count);
}
