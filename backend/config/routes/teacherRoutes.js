import express from 'express';
import {createNewClass, getClassCode, getClasses, getClassStudents, getClassExams, changeExamStatus, getExamDetails} from '../controllers/teacherController.js';

const router = express.Router();


router.post('/createClass', createNewClass);
router.get('/getClasses', getClasses);
router.get('/getClassCode', getClassCode);
router.get('/getClassStudents', getClassStudents);
router.get('/getExams', getClassExams);
router.post('/changeExamStatus', changeExamStatus);
router.get('/getExamData', getExamDetails);

export default router;  