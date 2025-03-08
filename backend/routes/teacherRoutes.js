import express from 'express';
import {createNewClass, getClassCode, getClasses, getClassStudents, getClassExams} from '../controllers/teacherController.js';

const router = express.Router();


router.post('/createClass', createNewClass);
router.get('/getClasses', getClasses);
router.get('/getClassCode', getClassCode);
router.get('/getClassStudents', getClassStudents);
router.get('/getExams', getClassExams);

export default router;  