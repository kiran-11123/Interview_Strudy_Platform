import express from "express";
import { get_all_courses_controller , get_course_controller } from "../../Controller/courses_controller/get_course_controller.js";
const courses_router = express.Router();


courses_router.post("/courses" , get_all_courses_controller)
courses_router.post("/courses/{course_id}" , get_course_controller)





export default courses_router;