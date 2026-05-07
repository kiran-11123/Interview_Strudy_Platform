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