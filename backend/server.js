import express from "express";
import cors from "cors";
import "jsonwebtoken";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import pool from "./config/db.js";

const port = process.env.SERVER_PORT || 3000;
const sessionSecretKey = process.env.SESSION_SECRET_KEY;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(sessionSecretKey));
app.use(cors());
app.use(process.env.MAIN_API_URL, routes);

// Check pool connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) console.error("Error connecting to the database", err.stack);
  else console.log("Connected to the database:", res.rows);
});

const server = app.listen(port, () => {
  console.log(
    `Server started on ${server.address().address}:${server.address().port}`
  );
});
