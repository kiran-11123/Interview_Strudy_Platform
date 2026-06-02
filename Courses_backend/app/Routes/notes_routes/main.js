import express from 'express';
import { Authentication_middleware } from '../../middleware/Authentication_middleware.js';
import { create_notes_controller , update_notes_controller } from '../../Controller/notes_controller/create_update_notes_controller.js';
import { delete_notes_controller } from '../../Controller/notes_controller/delete_notes_controller.js';
const notes_Router = express.Router();
    

notes_Router.post('/create_notes/:workspace_id' , Authentication_middleware, create_notes_controller);
notes_Router.put('/update_notes/:note_id' , Authentication_middleware, update_notes_controller);

notes_Router.delete('/delete_notes/:note_id' , Authentication_middleware, delete_notes_controller);

export default notes_Router;