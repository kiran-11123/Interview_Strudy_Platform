import mongoose from "mongoose";

const course_schema = new mongoose.Schema({
       
    course_name : {
        type : String,
        required : true } , 

    course_description : {
        type : String,
        required : true
    } ,
    course_topics : [{
        topic_id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'topic',
            required : true
        },
        topic_name : {
            type : String,
            required : true
        }
    }]

} ,{timestamps : true   })


const course_model = mongoose.model('course' , course_schema)

export default course_model;