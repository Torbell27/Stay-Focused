import pkg from "pg";
import { configDotenv } from "dotenv";

configDotenv();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.POSTGRE_USER,
  host: process.env.POSTGRE_ADDRESS,
  database: process.env.POSTGRE_DATABASE,
  password: process.env.POSTGRE_PASSWORD,
  port: process.env.POSTGRE_PORT,
  ssl: {
    rejectUnauthorized: true,
  },
});

export default pool;
