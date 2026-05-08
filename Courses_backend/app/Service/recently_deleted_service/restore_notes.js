import recently_deleted_notes_model from "../../../global/mongoDB/mongo_db_schema's/user_notes/recently_deleted_notes_schema.js";
import workspace_model from "../../../global/mongoDB/mongo_db_schema's/user_notes/workspace_schema.js";
import notes_model from "../../../global/mongoDB/mongo_db_schema's/user_notes/notes_schema.js";
import { create_notes_service } from "../notes_service/create_update_notes_service.js";
import mongoose from "mongoose";

export const restore_notes_service = async(note_id , workspace_id)=>{
       
    console.log(note_id , workspace_id);

    try{ 

        

        const note_id_new = new mongoose.Types.ObjectId(note_id);
        const workspace_id_new = new mongoose.Types.ObjectId(workspace_id);

        const check_workspace = await workspace_model.findOne({_id : workspace_id_new});
        if(!check_workspace){
            throw new Error('workspace not found');
        }

        const check_note = await recently_deleted_notes_model.findOne({_id : note_id_new , workspace_id : workspace_id_new});
        if(!check_note){
            throw new Error('note not found');
        }

        await recently_deleted_notes_model.deleteOne({_id : note_id_new});
        await workspace_model.updateOne(
            {_id : workspace_id_new},
            {$pull: {recently_deleted_notes : {notes_id : note_id_new}}}
            )
        
        await create_notes_service(workspace_id , check_note.title , check_note.data );

        return check_note;
       

        

        
    }
    catch(er){
        return er;
    }
}


