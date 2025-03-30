import express from "express";
import * as doctorController from '../controllers/doctorController.js';

const router = express.Router();

router.get('/get/:userId', doctorController.get);

router.get('/:doctorId/patients', doctorController.getPatients);

router.post('/sign_up', doctorController.signUpPatient);

export default router