import express from "express";
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.post('/sign_in', authController.sign_in);

export default router