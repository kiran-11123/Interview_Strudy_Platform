import express from "express";
import { get_all_courses_controller , get_course_controller } from "../../Controller/courses_controller/get_course_controller.js";
import { create_course_controller , update_course_controller } from "../../Controller/courses_controller/create_update_course_controller.js";
import { delete_course_controller } from "../../Controller/courses_controller/delete_course_controller.js";
const courses_router = express.Router();


courses_router.post("/courses" , get_all_courses_controller)
courses_router.post("/courses/{course_id}" , get_course_controller)


courses_router.put("/courses/{course_id}" , update_course_controller)
courses_router.post("/courses" , create_course_controller)


courses_router.delete("/courses/{course_id}" , delete_course_controller)




export default courses_router;