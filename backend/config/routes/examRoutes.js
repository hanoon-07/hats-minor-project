import express from "express";
import {
  createExam,
  getExam,
  getExamHeaders,
} from "../controllers/examController.js";

const router = express.Router();

router.get("/exam", getExam);
router.post("/createExam", createExam);
router.get("/exam-header", getExamHeaders);


export default router;
