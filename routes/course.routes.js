import express from "express";
import CourseController from "../controllers/course.controllers.js";

const router = express.Router();

router.post("/", CourseController.create);
router.get("/", CourseController.getAll);

export default router;
