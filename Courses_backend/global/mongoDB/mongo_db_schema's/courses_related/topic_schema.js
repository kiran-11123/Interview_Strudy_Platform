import mongoose from "mongoose";


const topic_schema = new mongoose.Schema({
    course_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'course',
        required : true
    } ,
    topic_name : {
        type : String,
        required : true
    } ,
    topic_description : {
        type : Object,
        required : true
    },
   favourites: [
        {
            type: Number,
            required :true
        }
    ]
   
},{timestamps : true    })


const topic_model = mongoose.model('topic' , topic_schema)
export { topic_schema };
export default topic_model;