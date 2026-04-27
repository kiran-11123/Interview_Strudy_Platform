import mongoose from "mongoose";
import { notes_schema } from "./notes_schema.js";
import { recently_deleted_notes_schema } from "./recently_deleted_notes_schema.js";

const workspace_schema = new mongoose.Schema({
    workspace_name : {
        type : String,
        required : true
    },

     userid :{type:Number  , required:true  , unique:true },

     notes : [notes_schema],
     recently_deleted_notes : [recently_deleted_notes_schema]    

},{timestamps : true })


const workspace_model = mongoose.model('workspace' , workspace_schema);


export default workspace_model;