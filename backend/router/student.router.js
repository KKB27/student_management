// routes/studentRoutes.js
import express from "express";
import { createStudent,deleteStudent,health,signIn,updateStudent,sendStudentInfo,changePassword } from "../controllers/student.controller.js";
import { createAssignment } from "../controllers/assignment.controller.js";
import { createSubject } from "../controllers/subject.controller.js";

const router = express.Router();

router.post("/signup", createStudent);
router.post("/updatestudent/:id", updateStudent);
router.post("/signin",signIn);
router.get("/health",health);
router.post("/delete/:id",deleteStudent);
router.post("/changePassword/:id",changePassword);
router.get("/get/:id",sendStudentInfo);
router.post("/newsubject/:id", createSubject);
router.post("/createassignment/:id", createAssignment);
export default router;
