import { restore_notes_service } from "../../Service/recently_deleted_service/restore_notes.js";

export const restore_notes_controller = async(req , res)=>{

    try{
        const workspace_id = req.workspace_id;
        const {note_id} = req.params;
        const result = await restore_notes_service(note_id , workspace_id);
        res.status(200).json({message : 'note restored successfully'});
    } catch (error) {

        if(error.message === 'note not found'){     
            return res.status(404).json({message : error.message});
        }   
        else if(error.message === 'workspace not found'){
            return res.status(404).json({message : error.message});
        }


        res.status(500).json({message : 'internal server error'});
    }
}