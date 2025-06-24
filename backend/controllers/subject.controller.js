import subjectModel from "../models/subject.model.js";
import studentModel from "../models/student.model.js";

export const createSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, facultyName, currentlyTaking, category } = req.body;

        const student = await studentModel.findById(id);
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        const newSubject = new subjectModel({
            student: student._id,
            name,
            facultyName,
            currentlyTaking,
            category
        });

        await newSubject.save();
        res.status(201).json({ message: "Subject created successfully", subject: newSubject });
    } catch (error) {
        console.error("Create subject error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const subject = await subjectModel.findById(id);
        if (!subject) {
            return res.status(404).json({ error: "Subject not found" });
        }
        await subject.remove();
        res.status(200).json({ message: "Subject deleted successfully" });
    } catch (error) {
        console.error("Delete subject error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const updateSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, facultyName, currentlyTaking, category } = req.body;

        const subject = await subjectModel.findById(id);
        if (!subject) {
            return res.status(404).json({ error: "Subject not found" });
        }

        subject.name = name || subject.name;
        subject.facultyName = facultyName || subject.facultyName;
        subject.currentlyTaking = currentlyTaking !== undefined ? currentlyTaking : subject.currentlyTaking;
        subject.category = category || subject.category;

        await subject.save();
        res.status(200).json({ message: "Subject updated successfully", subject });
    } catch (error) {
        console.error("Update subject error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}