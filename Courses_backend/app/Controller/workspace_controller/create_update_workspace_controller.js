import { Create_WorkSpace_service  , update_workspace_service , delete_workspace_service ,get_user_workspaces_service ,get_workspace_service } from "../../Service/workspace_service/create_update_workspace_service.js";


export const create_Workspace_controller = async(req , res)=>{
     
    try{

        const {workspace_name , user_id } = req.body;

        if(!workspace_name || !user_id) return res.status(404).json({
            message : 'Invalid Inputs'
        })

        const result = await Create_WorkSpace_service(workspace_name , user_id)

        return res.status(200).json({
            message : 'workspace created successfully'
        })

    }
    catch(er){
         
        if(er.message === 'WorkSpace with this name is already created'){
            return res.status(400).json({
                message : 'WorkSpace with this name is already created'
            })
        }

        return res.status(500).json({
            message : `Internal Server Error ${er.message}`
        })
    }
}


export const update_workspace_controller = async(req,res)=>{
     
    try{

        const {workspace_id} = req.params;
        const {new_workspace_name , user_id} = req.body;
        if(!workspace_id || !new_workspace_name || !user_id){
            return res.status(400).json({
                message : 'Invalid Inputs'
            })
        }
        const result = await update_workspace_service(workspace_id , new_workspace_name , user_id);

        return res.status(200).json({
            message : 'workspace updated successfully'
        })

    }
    catch(er){
         
        if(er.message === 'workspace is not found'){
            return res.status(404).json({
                message : "workspace is not found"
            })
        }

        else if(er.message === 'WorkSpace with this name is already created'){
            return res.status(400).json({
                message : 'WorkSpace with this name is already created'
            })
        }

        return res.status(500).json({
            message :`Internal server error ${er.message}`
        })
    }
}


export const delete_workspace_controller = async(req,res)=>{
     
    try{

        const {workspace_id} = req.params;
        const {user_id} = req.body;
        if(!workspace_id || !user_id){
            return res.status(400).json({
                message : 'Invalid Inputs'
            })

        }

        const result = await delete_workspace_service(workspace_id , user_id);
        return res.status(200).json({
            message : 'workspace deleted successfully'
        })
    }
    catch(er){  

        if(er.message === 'workspace is not found'){
            return res.status(404).json({
                message : "workspace is not found"
            })
        }       

        return res.status(500).json({
            message : `Internal Server Error ${er.message}`
        })
    }   

}

export const get_user_workspaces_controller = async(req,res)=>{
     
    try{

        const {user_id} = req.body;

        if(!user_id){
            return res.status(400).json({
                message : 'Invalid Inputs'
            })
        }
        const result = await get_user_workspaces_service(user_id);

        return res.status(200).json({
            message : 'workspaces fetched successfully',
            workspaces : result
        })

    }
    catch(er){

        return res.status(500).json({
            message : `Internal Server Error ${er.message}`
        })
    }
}


export const get_workspace_controller = async(req,res)=>{
     
    try{    
        const {workspace_id} = req.params;
        const {user_id} = req.body;

        if(!workspace_id || !user_id){  


            return res.status(400).json({
                message : 'Invalid Inputs'
            })  

        }

        const result = await get_workspace_service(workspace_id , user_id); 
        return res.status(200).json({
            message : 'workspace fetched successfully',
            workspace : result
        })

    }
    catch(er){  

        if(er.message === 'workspace is not found'){
            return res.status(404).json({
                message : "workspace is not found"
            })
        }
        return res.status(500).json({
            message : `Internal Server Error ${er.message}`
        })
    }
}