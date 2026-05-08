import { permanent_delete_notes_controller } from '../../Controller/recently_deleted_controller/permanent_delete_controller.js';
import { restore_notes_controller } from '../../Controller/recently_deleted_controller/restore_notes_controller.js';
import express from 'express'
const Recently_Deleted_Router = express.Router();


Recently_Deleted_Router.delete('/permanent_delete/:note_id' , permanent_delete_notes_controller);
Recently_Deleted_Router.put('/restore_note/:note_id' , restore_notes_controller);







export default Recently_Deleted_Router;