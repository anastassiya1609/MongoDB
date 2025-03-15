import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  desc: {
    type: String,
    required: true,
    trim: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  students: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Student",
    default: [],
  },
});

export const Course = mongoose.model("Course", courseSchema);
