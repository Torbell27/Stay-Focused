import express from "express";
import testRouter from "./test.js";
import authRouter from "./authRouter.js";

const router = express.Router();

// All Routes
router.use("/test", testRouter);
router.use("/auth", authRouter);

export default router;
