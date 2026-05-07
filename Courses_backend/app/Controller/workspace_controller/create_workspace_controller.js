import { Create_WorkSpace_service } from "../../Service/workspace_service/create_workspace_service.js";


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