import Student from "../models/student.model.js";
import Assignment from "../models/assignment.model.js";
import Subject from "../models/subject.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = ({ id, name, email }) => {
  return jwt.sign(
    { id, name, email }, // ⬅️ include extra data here
    process.env.JWT_SECRET,
    { expiresIn: "5d" }
  );
};

export const changePassword = async (req, res) => {
  try {
    const {id} = req.params;
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: "Old and new passwords are required"});
    }
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    } 
    const isMatch = await bcrypt.compare(oldPassword, student.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Old password is incorrect" });
    }
    // Hash the new password
    // Update the student's password
    student.password = newPassword;

    await student.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createStudent = async (req, res) => {
  try {
    const { name, email, phoneNumber, age, institutionName, password } = req.body;

    // Optional: Check if student already exists
    const existing = await Student.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Student with this email already exists" });
    }

    const newStudent = new Student({
      name,
      email,
      phoneNumber,
      age,
      institutionName,
      password, // hash it later in middleware or pre-save hook
    });

    await newStudent.save();

    const token = generateToken({
        id: newStudent._id,
        name: newStudent.name,
        email: newStudent.email
        });

        // And you can now skip sending this in the response body:
    res.status(201).json({"token": token,"message":"Student Created Succesfully"});

  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    } 
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    const isMatch = await bcrypt.compare(password, student.password);
    if(!isMatch){
        return res.status(400).json({"error": "Invalid credentials"})
    }
    else{
        const token = generateToken({
        id: student._id,
        name: student.name,
        email: student.email
        });
        res.status(200).json({
            token: token,
            message: "Sign-in successful"
        });
    }

} catch (error) {
    console.error("Sign-in error:", error); 
}
}

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Block password updates via this route
    if ("password" in req.body) {
      return res.status(400).json({ error: "Password cannot be updated from this endpoint" });
    }

    // Build an update object only with allowed fields
    const allowedFields = ["name", "email", "phoneNumber", "age", "institutionName"];
    const updates = {};

    allowedFields.forEach((field) => {
      if (field in req.body) {
        updates[field] = req.body[field];
      }
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "No valid fields provided for update" });
    }

    const updatedStudent = await Student.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({
      message: "Student updated successfully",
      student: {
        id: updatedStudent._id,
        name: updatedStudent.name,
        email: updatedStudent.email,
        phoneNumber: updatedStudent.phoneNumber,
        age: updatedStudent.age,
        institutionName: updatedStudent.institutionName,
      }
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteStudent = async(req,res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;

        
        const deleteStudent = await Student.findById(id);

        const isMatch = await bcrypt.compare(password, deleteStudent.password);

        if(!isMatch){
            return res.status(400).json({"error":"Incorrect password"});
        }
        

        if(!deleteStudent){
            return res.status(400).json({"error":"No such student exists"});
        }
        
        //Check if the student has any assignments or subjects
        // Delete all assignments and subjects related to the student
        await Assignment.deleteMany({ student: id }); 
        await Subject.deleteMany({ student: id });
        const isDeleted = await Student.findByIdAndDelete(id);


        if(isDeleted){
            return res.status(200).json({"message":"Student deleted successfully"});
        } else {
            return res.status(500).json({"error":"Something went wrong"});
        }
    } catch (error) {
      console.log("Delete student error:", error);
        return res.status(500).json({"error":"Internal server error"});
    }
}

export const sendStudentInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id).select("-password"); // exclude password

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({
      id: student._id,
      name: student.name,
      email: student.email,
      phoneNumber: student.phoneNumber,
      age: student.age,
      institutionName: student.institutionName,
    });
  } catch (error) {
    console.error("Fetch student info error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}



export const health = (req,res)=>{
    res.send("Yes ALL GOOD");
}