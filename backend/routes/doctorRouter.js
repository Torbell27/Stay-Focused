import express from "express";
import * as doctorController from '../controllers/doctorController.js';
import { authenticate } from '../middlewares/authentication.js';

const router = express.Router();

router.use(authenticate);

router.get('/get', doctorController.get);

router.get('/patients', doctorController.getPatients);

router.post('/sign_up', doctorController.signUpPatient);

export default router