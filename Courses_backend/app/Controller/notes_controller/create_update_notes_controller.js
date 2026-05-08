import { create_notes_service } from "../../Service/notes_service/create_update_notes_service.js";
import { update_notes_service } from "../../Service/notes_service/create_update_notes_service.js";

export const create_notes_controller = async(req , res)=>{

    try{

        const workspace_id = req.params.workspace_id;
        const {  notes_title , data} = req.body;


        
        
        if(!workspace_id || !notes_title){
            return res.status(400).json({
                message : 'Invalid Inputs: workspace_id and notes_title are required'
            });
        }
        
        const new_note = await create_notes_service(workspace_id , notes_title , data);
        return res.status(200).json({message : 'note created successfully' , note : new_note});
    }
    catch(er){
        
        if(er.message === 'workspace not found'){
            return res.status(404).json({message : er.message});
        }

        else if(er.message === 'note with the same title already exists in this workspace'){
            return res.status(400).json({message : er.message});
        }
        
        return res.status(500).json({message : `internal server error , ${er.message}`});
    }   

}


export const update_notes_controller = async(req , res)=>{


    try{
        const workspace_id = req.params.workspace_id;
        const note_id = req.params.note_id;
        const {notes_title , notes_data} = req.body;
        
        if(!workspace_id || !note_id || !notes_title){
            return res.status(400).json({
                message : 'Invalid Inputs: workspace_id, note_id, and notes_title are required'
            });
        }
        
        const updated_note = await update_notes_service(workspace_id , note_id , notes_title , notes_data);
        return res.status(200).json({message : 'note updated successfully' , note : updated_note});
    }   

    catch(er){
        if(er.message === 'note not found'){
            return res.status(404).json({message : er.message});
        }
        else if(er.message === 'workspace not found'){
            return res.status(404).json({message : er.message});
        }
        return res.status(500).json({message : 'internal server error'});
    }

}