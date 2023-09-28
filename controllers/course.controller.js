const Course = require("../models/course.model");
const Lesson = require("../models/lesson.model");
const User = require("../models/user.model");
const LessonController = require("./lesson.controller");

module.exports.createCourse = async function (req, res) {
  try {
    const doc = new Course({
      name: req.body.name,
      description: req.body.description,
      author: req.userId,
    });
    await req.body.lessons.map(async (lesson) => {
      newLesson = await LessonController.createLesson(lesson, doc._id);
      doc.lessons.push(newLesson._id);
    });
    doc.save();
    res.json(doc);
  } catch (e) {
    console.log(e);
  }
};

module.exports.getCourses = async function (req, res) {
  try {
    const courses = await Course.find();
    const data = await Promise.all(
      courses.map(async (course) => {
        const user = await User.findById(course.author);
        const lessons = await Promise.all(
          course.lessons.map(async (lessonId) => {
            return await Lesson.findById(lessonId);
          })
        );
        return {
          ...course._doc,
          author: user,
          lessons: lessons,
        };
      })
    );
    res.json(data);
  } catch (e) {
    console.log(e);
  }
};

module.exports.getCourse = async function (req, res) {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    const user = await User.findById(course.author);
    const lessons = await Promise.all(
      course.lessons.map(async (lessonId) => {
        return await Lesson.findById(lessonId);
      })
    );

    res.send({
      ...course._doc,
      author: user,
      lessons: lessons,
    });
  } catch (e) {
    console.log(e);
  }
};
