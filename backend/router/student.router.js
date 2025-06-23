// routes/studentRoutes.js
import express from "express";
import { createStudent,deleteStudent,health,signIn,updateStudent } from "../controllers/student.controller.js";

const router = express.Router();

router.post("/newstudent", createStudent);
router.post("/updatestudent/:id", updateStudent);
router.post("/signin",signIn);
router.get("/health",health);
router.post("/delete/:id",deleteStudent);
export default router;
