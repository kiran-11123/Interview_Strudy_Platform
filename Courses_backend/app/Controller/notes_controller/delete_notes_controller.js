import { delete_notes_service } from "../../Service/notes_service/delete_notes_service.js";



export const delete_notes_controller = async(req , res)=>{

    try{
        const workspace_id = req.workspace_id;
        const {note_id} = req.params;
        const deleted_note = await delete_notes_service(note_id , workspace_id);
        res.status(200).json({message : 'note deleted successfully' , note : deleted_note});
    }
    catch(er){
        if(er.message === 'note not found'){
            res.status(404).json({message : er.message});
        }
        else if(er.message === 'workspace not found'){
            res.status(404).json({message : er.message});
        }
        return res.status(500).json({message : 'internal server error'});
    }   

}