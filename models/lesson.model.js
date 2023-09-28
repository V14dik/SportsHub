const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
});

const Lesson = mongoose.model("Lesson", LessonSchema);

module.exports = Lesson;
