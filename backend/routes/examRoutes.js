import express from "express";

import {
  createExam,
  getExam,
  getExamHeaders,
  getExamsInClass
} from "../controllers/examController.js";

const router = express.Router();

router.get("/exam", getExam);
router.post("/createExam", createExam);
router.get("/exam-header", getExamHeaders);
router.get('/getExamsInClass', getExamsInClass)


export default router;
