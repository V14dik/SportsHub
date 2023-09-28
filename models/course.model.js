const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
