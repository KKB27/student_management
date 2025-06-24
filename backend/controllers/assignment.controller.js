import assignmentModel from "../models/assignment.model.js";
import studentModel from "../models/student.model.js";
import subjectModel from "../models/subject.model.js";

export const createAssignment = async (req, res) => {
    try {
        const {id} = req.params;
        const { subject, dueDate, description, totalPoints, estimatedHours } = req.body;
        if (!id || !subject || !dueDate || !description || !totalPoints) {
        return res.status(400).json({ error: "All fields are required" });
        }
        console.log("I was called");
        const newAssignment = new assignmentModel({
        student: id,
        subject: subject,
        dueDate,
        description,
        totalPoints,
        estimatedHours
        });
    
        await newAssignment.save();
       return res.status(200).json({ message: "Assignment created successfully" });
    } catch (error) {
        console.error("Create assignment error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        const assignment = await assignmentModel.findById(id);
        if (!assignment) {
            return res.status(404).json({ error: "Assignment not found" });
        }
        await assignment.remove();
        res.status(200).json({ message: "Assignment deleted successfully" });
    } catch (error) {
        console.error("Delete assignment error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const updateAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        const { subject, dueDate, description, totalPoints, estimatedHours } = req.body;

        const assignment = await assignmentModel.findById(id);
        if (!assignment) {
            return res.status(404).json({ error: "Assignment not found" });
        }

        assignment.subject = subject || assignment.subject;
        assignment.dueDate = dueDate || assignment.dueDate;
        assignment.description = description || assignment.description;
        assignment.totalPoints = totalPoints || assignment.totalPoints;
        assignment.estimatedHours = estimatedHours || assignment.estimatedHours;

        await assignment.save();
        res.status(200).json({ message: "Assignment updated successfully", assignment });
    } catch (error) {
        console.error("Update assignment error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getAllAssignments = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({ error: "Student ID is required" });
        }
        const assignments = await assignmentModel
  .find({ student: id })
  .select('subject description dueDate totalPoints estimatedHours') // select only these fields
  .populate('student', 'name email').populate("subject", "name");    // populate only name/email from student
        if (!assignments || assignments.length === 0) {
            return res.status(404).json({ error: "No assignments found for this student" });
        }
        res.status(200).json({ assignments });
    } catch (error) {
        console.error("Get all assignments error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}