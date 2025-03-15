import { Course } from "../models/Course.js";
import { Student } from "../models/Student.js";

class StudentController {
  async getAll(req, res) {
    try {
      const { fullname, age } = req.body;
      const students = await Student.find().populate(
        "courses",
        "title desc"
      );

      if (!students.length) {
        throw new Error("Students not found");
      }

      res.status(201).json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { fullname, age } = req.body;
      const student = await new Student({ fullname, age }).save();
      res.status(201).json(student);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async enroll(req, res) {
    try {
      //Добавить ид студента в курсы и наоборот
      const { courseId, studentId } = req.body;
      const courseUpdate = await Course.findByIdAndUpdate(courseId, {
        $push: {
          students: studentId,
        },
      });
      const studentUpdate = await Student.findByIdAndUpdate(studentId, {
        $push: {
          courses: courseId,
        },
      });

      if (!courseUpdate || !studentUpdate) {
        return res
          .status(404)
          .json({ message: " Student or course not found" });
      }

      res.json({
        message: `Student with id - ${studentId} successfully registered on the course ${courseId} `,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new StudentController();
