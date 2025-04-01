import express from "express";
import * as authController from "../controllers/authController.js";
import { authenticate } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.get("/role", authenticate, authController.role);

export default router;
