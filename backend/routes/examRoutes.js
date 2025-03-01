import express from 'express';
import { createExam, getExam } from '../controllers/examController.js';

const router = express.Router();

router.get('/exam', getExam);
router.post('/createExam', createExam);


export default router;  