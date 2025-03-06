import express from 'express';
import {createNewClass, getClassCode, getClasses, getClassStudents} from '../controllers/teacherController.js';

const router = express.Router();


router.post('/createClass', createNewClass);
router.get('/getClasses', getClasses);
router.get('/getClassCode', getClassCode);
router.get('/getClassStudents', getClassStudents);

export default router;  