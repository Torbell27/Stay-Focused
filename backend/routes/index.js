import express from "express";
import authRouter from "./authRouter.js";
import doctorRouter from "./doctorRouter.js";
import patientRouter from "./patientRouter.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/doctor", doctorRouter);
router.use("/patient", patientRouter);

export default router;
