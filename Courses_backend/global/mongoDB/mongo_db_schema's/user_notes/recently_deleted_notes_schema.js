import mongoose from "mongoose";

const recently_deleted_notes_schema = new mongoose.Schema({
           title:{type:String , required:true},
           data:{type:Object},
           favourite :{type:Boolean , default:false},
        
           createdAt:{type:Date , default:Date.now}
})


const recently_deleted_notes_model = mongoose.model('recently_deleted_notes' , recently_deleted_notes_schema)
export default recently_deleted_notes_model;