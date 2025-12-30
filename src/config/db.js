import {Pool} from 'pg';

// single shared pool connection 

const pool = new Pool({
  host:process.env.DB_HOST,
  port:process.env.DB_PORT,
  database:process.env.DB_NAME,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
});

pool.on("connect", () => {
  console.log("postgreSQL connected successfully");
});

pool.on("error", () => {
  console.log("unexpected postgreSQL error", err);
  process.exit(1);
});

export default pool;