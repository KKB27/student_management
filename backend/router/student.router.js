// routes/studentRoutes.js
import express from "express";
import { createStudent,deleteStudent,health,signIn,updateStudent,sendStudentInfo,changePassword } from "../controllers/student.controller.js";
import { createAssignment, getAllAssignments } from "../controllers/assignment.controller.js";
import { createSubject,getAllSubjects } from "../controllers/subject.controller.js";
import { get } from "mongoose";

const router = express.Router();

router.post("/signup", createStudent);
router.post("/updatestudent/:id", updateStudent);
router.post("/signin",signIn);
router.get("/health",health);
router.post("/delete/:id",deleteStudent);
router.post("/changePassword/:id",changePassword);
router.get("/get/:id",sendStudentInfo);
router.post("/createsubject/:id", createSubject);
router.post("/createassignment/:id", createAssignment);
router.get("/getassignments/:id",getAllAssignments);
router.get("/getsubjects/:id", getAllSubjects);
export default router;
