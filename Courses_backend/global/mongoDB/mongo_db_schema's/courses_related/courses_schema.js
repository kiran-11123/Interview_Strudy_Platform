import mongoose from "mongoose";
import { topic_schema } from "./topic_schema.js";

const course_schema = new mongoose.Schema({
       
    course_name : {
        type : String,
        required : true } , 

    course_description : {
        type : String,
        required : true
    } ,
    course_topics : [topic_schema]

} ,{timestamps : true   })


const course_model = mongoose.model('course' , course_schema)

export default course_model;