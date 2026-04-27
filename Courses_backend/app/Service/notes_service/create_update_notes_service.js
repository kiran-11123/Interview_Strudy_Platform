import mongoose from "mongoose";
import notes_model from "../../../global/mongoDB/mongo_db_schema's/user_notes/notes_schema.js";
import workspace_model from "../../../global/mongoDB/mongo_db_schema's/user_notes/workspace_schema.js";


export const create_notes_service = async(workspace_id , notes_title , notes_data )=>{

    try{
        
        const workspace_id_new = mongoose.Types.ObjectId(workspace_id);
        const check_workspace = await workspace_model.findOne({_id : workspace_id_new});

        if(!check_workspace){
            throw new Error('workspace not found');
        }

        const new_note  = new notes_model({
            title : notes_title,
            workspace_id : workspace_id_new,
            data : notes_data
        })
        await new_note.save();
        check_workspace.notes.push(new_note);
        await check_workspace.save();
        return new_note;


    }
    catch(er){
         throw er;
    }
}


export const update_notes_service = async(note_id , notes_title , notes_data )=>{

    try{    
        const note_id_new = mongoose.Types.ObjectId(note_id);
        const check_note = await notes_model.findOne({_id : note_id_new});
        if(!check_note){
            throw new Error('note not found');
        }
        check_note.title = notes_title;
        check_note.data = notes_data;
        await check_note.save();
        return check_note;
    }   

    catch(er){
        throw er;
    }   

}