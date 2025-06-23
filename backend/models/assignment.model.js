import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  totalPoints: {
    type: Number,
    required: true,
    min: 0,
  },
    estimatedHours: {
    type: Number,
    min: 0,
    default: 1, // reasonable default, tweak based on your use case
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  grade: {
    type: Number,
    min: 0,
    max: 100,
    default: null, // grade can be null if not graded yet
  },
}, {
  timestamps: true,
});

const assignmentModel =  mongoose.model("Assignment", assignmentSchema);

export default assignmentModel;
