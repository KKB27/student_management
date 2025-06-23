import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // ensures no duplicates
    lowercase: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0, // optional: prevents negative ages
  },
  institutionName: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt fields
});

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // skip if password wasn't changed
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


const studentModel = mongoose.model('Student', studentSchema);

export default studentModel;