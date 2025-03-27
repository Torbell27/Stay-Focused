import express from "express";
import * as doctorController from '../controllers/doctorController.js';

const router = express.Router();

router.get('/get/:userId', doctorController.get);

export default router