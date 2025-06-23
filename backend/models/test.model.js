import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
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
  testDate: {
    type: Date,
    required: true,
  },
  syllabus: {
    type: String,
    required: true,
    trim: true,
  },
  totalPoints: {
    type: Number,
    required: true,
    min: 0,
  },
  grade: {
    type: Number,
    min: 0,
    max: 100,
    default: null, // No grade until it's assigned
  },
}, {
  timestamps: true,
});

const testModel = mongoose.model("Test", testSchema);
export default testModel;
