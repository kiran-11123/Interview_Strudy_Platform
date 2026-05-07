import express from 'express'
const Workspace_Router = express.Router();
import { create_Workspace_controller , update_workspace_controller ,delete_workspace_controller } from '../../Controller/workspace_controller/create_update_workspace_controller.js';

Workspace_Router.post("/create" , create_Workspace_controller);
Workspace_Router.put("/update/:workspace_id" , update_workspace_controller);
Workspace_Router.delete("/delete/:workspace_id" , delete_workspace_controller);













export default Workspace_Router;