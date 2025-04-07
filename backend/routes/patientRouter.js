import express from "express";
import * as patientController from "../controllers/patientController.js";
import { authenticate } from "../middlewares/authentication.js";
import { checkUserRole } from "../middlewares/checkUserRole.js";

const router = express.Router();

router.use(authenticate);
router.use(checkUserRole(1));

router.get("/get", patientController.get);

export default router;
