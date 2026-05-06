import express from "express";
import { get_all_courses_controller , get_course_controller } from "../../Controller/courses_controller/get_course_controller.js";
import { create_course_controller , update_course_controller } from "../../Controller/courses_controller/create_update_course_controller.js";
import { delete_course_controller } from "../../Controller/courses_controller/delete_course_controller.js";
import { delete_all_topics_course_controller , get_topics_course_controller , update_topic_course_controller , delete_topic_course_controller } from "../../Controller/courses_controller/get_update_delete_topic_controller.js";
const courses_router = express.Router();


courses_router.post("/get_all_courses" , get_all_courses_controller)
courses_router.post("/get_course/:course_id" , get_course_controller)


courses_router.put("/update_course/:course_id" , update_course_controller)
courses_router.post("/create_course" , create_course_controller)


courses_router.delete("/delete_course/:course_id" , delete_course_controller)



courses_router.delete("/delete_all_topics/:course_id" , delete_all_topics_course_controller);
courses_router.post("/get_topics/:course_id" , get_topics_course_controller);
courses_router.put("/update_topic/:course_id/:topic_id" , update_topic_course_controller);
courses_router.delete("/delete_topic/:course_id/:topic_id" , delete_topic_course_controller);


export default courses_router;