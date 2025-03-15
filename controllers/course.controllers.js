import { Course } from "../models/Course.js";

class CourseController {
  async create(req, res) {
    try {
      const { title, desc, teacher } = req.body;
      const course = await new Course({ title, desc, teacher }).save();
      res.status(201).json(course);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getAll(req, res) {
    try {
      const courses = await Course.find()
        .populate("students", "fullname age")
        .populate("teacher");

      if (!courses.length) {
        throw new Error("Курсы не найдены!");
      }

      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new CourseController();
