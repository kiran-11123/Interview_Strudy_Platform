import mongoose from "mongoose";
import workspace_model from "../../../global/mongoDB/mongo_db_schema's/user_notes/workspace_schema.js";
import notes_model from "../../../global/mongoDB/mongo_db_schema's/user_notes/notes_schema.js";



export const Create_WorkSpace_service = async(workspace_name , user_id)=>{
     
    try{
        
        const find_workspace = await workspace_model.findOne({ workspace_name : workspace_name  , userid : user_id});

        if(find_workspace){
            throw new Error('WorkSpace with this name is already created')
        }
       
        const new_workspace = new workspace_model({
            workspace_name : workspace_name,
            userid : user_id,
            notes :[],
            recently_deleted_notes : []
        })

        await new_workspace.save();

        return new_workspace;

    }
    catch(er){
        throw er;
    }
}



export const update_workspace_service = async( workspace_id , new_workspace_name , user_id)=>{
     
    try{

      

        const new_workspace_id = new mongoose.Types.ObjectId(workspace_id);

    

        const find_workspace = await workspace_model.findOne({_id  : new_workspace_id , userid : user_id});

        
        if(!find_workspace){
            throw new Error('workspace is not found')
        }

        const check_new_workspace_name = await workspace_model.findOne({workspace_name : new_workspace_name , userid  : user_id});
         
        if(check_new_workspace_name){
            throw new Error('WorkSpace with this name is already created')
        }

        find_workspace.workspace_name = new_workspace_name ;
        
        await find_workspace.save();

        return find_workspace;


    }
    catch(er){
        throw er;
    }
}



export const delete_workspace_service = async(workspace_id , user_id)=>{
     
    try{

        const new_workspace_id = new mongoose.Types.ObjectId(workspace_id);

         const find_workspace = await workspace_model.findOne({_id  : new_workspace_id , userid : user_id});

        
        if(!find_workspace){
            throw new Error('workspace is not found')
        }


        const get_id_notes = find_workspace.notes.map(note => note.workspace_id=== new_workspace_id ? note.note_id : null).filter(id => id !== null);
        const get_id_recently_deleted_notes = find_workspace.recently_deleted_notes.map(note => note.workspace_id === new_workspace_id ? note.note_id : null).filter(id => id !== null);
        
        await notes_model.deleteMany({_id : {$in : get_id_recently_deleted_notes}});
        await notes_model.deleteMany({_id : {$in : get_id_notes}});

        await workspace_model.findByIdAndDelete(new_workspace_id);


        return ;



    }
    catch(er){
        throw er;
    }
}


export const get_user_workspaces_service = async(user_id)=>{
     
    try{

        const workspaces = await workspace_model.find({userid : user_id});

        return workspaces;
    }
    catch(er){
        throw er;
    }       


}


export const get_workspace_service = async(workspace_id , user_id)=>{
     
    try{    

        const new_workspace_id = new mongoose.Types.ObjectId(workspace_id);

        const workspace = await workspace_model.findOne({_id : new_workspace_id , userid : user_id});

        if(!workspace){
            throw new Error('workspace is not found')
        }


        return workspace;

    }
    catch(er){
        throw er;
    }
}