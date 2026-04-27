import mongoose from "mongoose";

import topic_model from "../topic_schema.js";


const course_schema = new mongoose.Schema({
       
    course_name : {
        type : String,
        required : true } , 

    course_description : String,
    course_topics : [topic_model]

} ,{timestamps : true   })


const course_model = mongoose.model('course' , course_schema)

export default course_model;