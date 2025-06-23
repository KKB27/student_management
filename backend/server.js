import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.config.js";
import studentRoutes from "./router/student.router.js";
const PORT = 3000;
const app = express();

import cors from 'cors';
app.use(cors({
  origin: "http://localhost:5173", // your Vite frontend
  credentials: true
}));

dotenv.config();

//import connectDB from './config/db.config.js';
connectDB();
//so it can parse JSON
app.use(express.json());
app.use('/student',studentRoutes);

//so it can parse url encoded stuff as well
app.use(express.urlencoded({ extended:true }));

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`)
})