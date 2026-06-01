import mongoose from "mongoose";
import notes_model from "../../../global/mongoDB/mongo_db_schema's/user_notes/notes_schema.js";
import workspace_model from "../../../global/mongoDB/mongo_db_schema's/user_notes/workspace_schema.js";
import redis_client from "../../../../redis/index.js";


export const create_notes_service = async (
    workspace_id,
    notes_title,
    notes_data
) => {

    console.log(workspace_id, notes_title, notes_data);

    if (!workspace_id || !notes_title) {
        throw new Error('workspace_id and notes_title are required');
    }

    const workspace_id_new = new mongoose.Types.ObjectId(workspace_id);

    const check_workspace = await workspace_model.findById(workspace_id_new);

    if (!check_workspace) {
        throw new Error('workspace not found');
    }

    const check_note = await notes_model.exists({
        title: notes_title,
        workspace_id: workspace_id_new
    });

    if (check_note) {
        throw new Error(
            'note with the same title already exists in this workspace'
        );
    }

    const new_note = await notes_model.create({
        title: notes_title,
        workspace_id: workspace_id_new,
        data : notes_data
        
    });

    await check_workspace.notes.push({
        notes_name: notes_title,
        notes_id: new_note._id
    });

    await check_workspace.save();

    return new_note;
};

export const update_notes_service = async(workspace_id , note_id , notes_title , notes_data , favourite = false )=>{

    try{    
        if(!workspace_id || !note_id || !notes_title){
            throw new Error('workspace_id, note_id, and notes_title are required');
        }

        const note_id_new = new mongoose.Types.ObjectId(note_id);
        const workspace_id_new = new mongoose.Types.ObjectId(workspace_id);

        const check_workspace = await workspace_model.findOne({_id : workspace_id_new});
        if(!check_workspace){
            throw new Error('workspace not found');
        }
        const check_note = await notes_model.findOne({_id : note_id_new});
        if(!check_note){
            throw new Error('note not found');
        }
        check_note.title = notes_title;
        check_note.data = notes_data;
        check_note.favourite = favourite;
        await check_note.save();
        
        const note_index = check_workspace.notes.findIndex(note => note.notes_id.toString() === note_id_new.toString());
        if(note_index !== -1){
            check_workspace.notes[note_index].notes_name = notes_title;
            await check_workspace.save();
        }
        
        return check_note;
    }   

    catch(er){
        throw er;
    }   

}