import express from 'express';
import {createNewClass, getClasses} from '../controllers/teacherController.js';

const router = express.Router();


router.post('/createClass', createNewClass);
router.get('/getClasses', getClasses);

export default router;  