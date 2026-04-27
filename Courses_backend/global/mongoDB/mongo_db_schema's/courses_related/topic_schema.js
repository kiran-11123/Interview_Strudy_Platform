import mongoose from "mongoose";


const topic_schema = new mongoose.Schema({
    topic_name : {
        type : String,
        required : true
    } ,
    topic_description : {
        type : String,
        required : true
    }
},{timestamps : true    })


const topic_model = mongoose.model('topic' , topic_schema)
export default topic_model;