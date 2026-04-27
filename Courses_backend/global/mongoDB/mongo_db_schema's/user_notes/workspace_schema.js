import mongoose from "mongoose";
import notes_model from "./notes_schema.js";
import recently_deleted_notes_model from "./recently_deleted_notes_schema.js";

const workspace_schema = new mongoose.Schema({
    workspace_name : {
        type : String,
        required : true
    },

     userid :{type:Number  , required:true  , unique:true },

     notes : [notes_model],
     recently_deleted_notes : [recently_deleted_notes_model]    

},{timestamps : true })
