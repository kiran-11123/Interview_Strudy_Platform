import mongoose from "mongoose";

const notes_schema = new mongoose.Schema({

        title:{type:String , required:true},
        workspace_id : {type : mongoose.Schema.Types.ObjectId, ref='workspace' , required:true},
        data:{type:Object},
        favourite :{type:Boolean , default:false},
        createdAt:{type:Date , default:Date.now}

} ,{timestamps : true})


const notes_model = mongoose.model('notes' , notes_schema)
export default notes_model;