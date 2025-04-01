import express from "express";
import {
  createNewClass,
  getClassCode,
  getTeacherId,
  getClasses,
  getClassStudents,
  getClassExams,
  changeExamStatus,
  getExamDetails,
  updateTeacherData,
  getResult,
} from "../controllers/teacherController.js";

const router = express.Router();

router.post("/createClass", createNewClass);
router.get("/getClasses", getClasses);
router.get("/getClassCode", getClassCode);
router.get("/getClassStudents", getClassStudents);
router.get("/getExams", getClassExams);
router.post("/changeExamStatus", changeExamStatus);
router.get("/getExamData", getExamDetails);
router.get("/getTeacherData", getTeacherId);
router.put("/updateTeacherData", updateTeacherData);
router.get("/getResult", getResult);
export default router;
