const Lesson = require("../models/lesson.model");

module.exports.createLesson = async function (lesson, courseId) {
  try {
    const doc = new Lesson({
      name: lesson.name,
      content: lesson.content,
      course: courseId,
    });
    doc.save();
    return doc;
  } catch (e) {
    console.log(e);
  }
};
