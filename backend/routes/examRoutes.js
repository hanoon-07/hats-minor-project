import express from "express";

import {
  createExam,
  getExam,
  getExamHeaders,
  getExamsInClass,
  saveResult,
  getLatestExam,
  getPast6Average
} from "../controllers/examController.js";

const router = express.Router();

router.get("/exam", getExam);
router.post("/createExam", createExam);
router.get("/exam-header", getExamHeaders);
router.get('/getExamsInClass', getExamsInClass)
router.post('/saveresult',saveResult)
router.get('/getRecentExams',getLatestExam)
router.get('/getPast6Average',getPast6Average)


export default router;
