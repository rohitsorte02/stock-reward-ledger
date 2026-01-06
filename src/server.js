// import dotenv from "dotenv";
// dotenv.config();
import "dotenv/config"; // preload env vars before other imports

import pool from "./config/db.js";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await pool.query("Select 1");
    console.log("database connected successfully");
  } catch (error) {
    console.log("databae connection failed", error);
    console.log(error.message);
    process.exit(1);
  }
})();

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

//debugging consoles to verify the values for the .env
// console.log("dbPassword type:", typeof process.env.DB_PASSWORD);
// console.log("host type:", typeof process.env.DB_HOST);
