import pool from "../../config/db.js";

//get users by email
export async function findUserByEmail(email) {
  const query = `SELECT id, email, password_hash, is_active
                 FROM users
                 WHERE email = $1
                `;

  const { rows } = await pool.query(query, [email]);
  return rows[0] || null;
};

//create new user
export async function createNewUser({ email, passwordHash }) {
  const query = `INSERT INTO users (email, password_hash)
                 VALUES ($1, $2)
                 RETURNING id, email, is_active
                 `;
  
  const { rows } = await pool.query(query, [email, passwordHash]);
  return rows[0];
};
