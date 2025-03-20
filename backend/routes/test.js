import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/get", async (req, res) => {
  res.send({ answer: "Hello, from api!" });
});

export default router;
