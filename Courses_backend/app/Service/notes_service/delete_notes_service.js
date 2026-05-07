import notes_model from "../../../global/mongoDB/mongo_db_schema's/user_notes/notes_schema.js";
import workspace_model from "../../../global/mongoDB/mongo_db_schema's/user_notes/workspace_schema.js";

export const delete_notes_service = async(note_id , workspace_id)=>{

    try{

        const note_id_new = mongoose.Types.ObjectId(note_id);
        const workspace_id_new = mongoose.Types.ObjectId(workspace_id);

        const check_workspace = await workspace_model.findOne({_id : workspace_id});
        if(!check_workspace){
            throw new Error('workspace not found');
        }


        const check_note = await notes_model.findOne({_id : note_id_new , workspace_id : workspace_id_new});
        if(!check_note){
            throw new Error('note not found');
        }

        const new_deleted_note = {
            title : check_note.title,
            workspace_id : check_note.workspace_id,
            data : check_note.data,
            favourite : check_note.favourite
        }
        

         await Promise.all([
            notes_model.deleteOne({_id: note_id_new}),
            workspace_model.updateOne(
                {_id: workspace_id_new},
                {
                    $pull: {notes: {_id: note_id_new}},
                    $push: {recently_deleted_notes: new_deleted_note}
                }
            )
        ]);

        return new_deleted_note;
        



    }
    catch(er){
        throw er;
    }
}

