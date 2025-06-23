import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student", // This references the Student model
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  facultyName: {
    type: String,
    required: true,
    trim: true,
  },
  currentlyTaking: {
    type: Boolean,
    required: true,
  },
  category: {
    type: String,
    enum: ["easy", "medium", "hard"], // restricts allowed values
    required: true,
  }
}, {
  timestamps: true,
});

const subjectModel = mongoose.model("Subject", subjectSchema);

export default subjectModel;
