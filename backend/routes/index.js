import express from "express";
import authRouter from "./authRouter.js";
import doctorRouter from "./doctorRouter.js";

const router = express.Router();

// All Routes
router.use("/auth", authRouter);
router.use("/doctor", doctorRouter);

export default router;
