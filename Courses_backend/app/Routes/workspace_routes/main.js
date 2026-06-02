import express from 'express'
const Workspace_Router = express.Router();
import { create_Workspace_controller , update_workspace_controller ,delete_workspace_controller ,get_user_workspaces_controller ,get_workspace_controller } from '../../Controller/workspace_controller/create_update_workspace_controller.js';
import { Authentication_middleware } from '../../middleware/Authentication_middleware.js';
Workspace_Router.post("/create" , Authentication_middleware, create_Workspace_controller);
Workspace_Router.put("/update/:workspace_id" , Authentication_middleware, update_workspace_controller);
Workspace_Router.delete("/delete/:workspace_id" , Authentication_middleware, delete_workspace_controller);
Workspace_Router.post("/get_user_workspaces" , Authentication_middleware, get_user_workspaces_controller);
Workspace_Router.post("/get_workspace/:workspace_id" , Authentication_middleware, get_workspace_controller);











export default Workspace_Router;