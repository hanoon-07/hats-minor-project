import express from "express";
import {
  registerStudent,
  registerTeacher,
  loginControl,
  logoutControl,
  checkAuthControl,
  forgotPass,
  resetPass,
} from "../controllers/authController.js";
import {ensureAuthenticated, checkRole} from "../middlewares/auth.js";
const router = express.Router();

/* router.get("/allusers", getAllUsers); */
//router.get("/user", ensureAuthenticated, checkRole("teacher"), getAllUsers);
router.post("/register/student", registerStudent);
router.post("/register/teacher", registerTeacher);
router.post("/login", loginControl);
router.post("/logout", logoutControl);
router.get("/check-auth", checkAuthControl);
router.post("/forgot-password", forgotPass);
router.post("/reset-password", resetPass);

export default router;
