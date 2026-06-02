import mongoose from "mongoose";
import { notes_schema } from "./notes_schema.js";
import { recently_deleted_notes_schema } from "./recently_deleted_notes_schema.js";

const workspace_schema = new mongoose.Schema({
    workspace_name : {
        type : String,
        required : true
    },

     userid :{type:Number , required:true },

     notes : [{
             notes_id : {
                    type : mongoose.Schema.Types.ObjectId,
                    ref : 'notes',
                    
                },
                notes_name : {
                    type : String,
                    
                }
     }],
     recently_deleted_notes : [{
                notes_id : {
                    type : mongoose.Schema.Types.ObjectId,
                    ref : 'recently_deleted_notes',
                   
                },
                notes_name : {
                    type : String,
                   
                } 
     }]    

},{timestamps : true })


const workspace_model = mongoose.model('workspace' , workspace_schema);


export default workspace_model;