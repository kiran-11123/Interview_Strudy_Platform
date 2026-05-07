import mongoose from "mongoose";
import workspace_model from "../../../global/mongoDB/mongo_db_schema's/user_notes/workspace_schema.js";



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

        if(find_workspace){
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