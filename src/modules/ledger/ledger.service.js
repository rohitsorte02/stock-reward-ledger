import pool from "../../config/db.js";
import {
  getLedgerEntriesByUser,
  countLedgerEntriesByUser,
} from "../../db/repositories/ledger.repository.js";

export async function fetchUserLedger({ userId, page = 1, limit = 10 }) {
  const client = await pool.connect();

  try {
    const safePage = Math.max(page, 1);
    const safeLimit = Math.min(limit, 50); 
    const offset = (safePage - 1) * safeLimit;

    const [entries, totalRecords] = await Promise.all([
      getLedgerEntriesByUser(client, {
        userId,
        limit: safeLimit,
        offset,
      }),
      countLedgerEntriesByUser(client, userId),
    ]);

    return {
      page: safePage,
      limit: safeLimit,
      totalRecords,
      data: entries,
    };
  } finally {
    client.release();
  }
}
