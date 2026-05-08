import { permanent_delete_notes_service } from "../../Service/recently_deleted_service/permanent_delete_notes.js";


export const permanent_delete_notes_controller = async(req , res)=>{

    try{
        const workspace_id = req.body.workspace_id;
        const {note_id} = req.params;
        const result = await permanent_delete_notes_service(note_id , workspace_id);
        res.status(200).json({message : 'note permanently deleted successfully'});
    } catch (error) {

        if(error.message === 'note not found'){
            return res.status(404).json({message : error.message});
        }
        else if(error.message === 'workspace not found'){
            return res.status(404).json({message : error.message});
        }
        
        res.status(500).json({message : `internal server error , ${error.message}`});
    }   

}