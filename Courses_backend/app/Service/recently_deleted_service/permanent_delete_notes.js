import recently_deleted_notes_model from "../../../global/mongoDB/mongo_db_schema's/user_notes/recently_deleted_notes_schema.js";
import workspace_model from "../../../global/mongoDB/mongo_db_schema's/user_notes/workspace_schema.js";

export const permanent_delete_notes_service = async(note_id , workspace_id)=>{
    try{
        const note_id_new = new mongoose.Types.ObjectId(note_id);
        const workspace_id_new = new mongoose.Types.ObjectId(workspace_id);

        const check_workspace = await workspace_model.findOne({_id : workspace_id_new});
        if(!check_workspace){
            throw new Error('workspace not found');
        }

        const check_note = await recently_deleted_notes_model.findOne({notes_id : note_id_new , workspace_id : workspace_id_new});
        if(!check_note){
            throw new Error('note not found');
        }

        await recently_deleted_notes_model.deleteOne({notes_id : note_id_new});
        await workspace_model.updateOne(
            {_id : workspace_id_new},
            {
                $pull : {recently_deleted_notes : {notes_id : note_id_new}}
            }
        )   

    }
    catch(er){
        throw er;
    }
}

