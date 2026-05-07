import express from 'express'
const Workspace_Router = express.Router();
import { create_Workspace_controller , update_workspace_controller } from '../../Controller/workspace_controller/create_update_workspace_controller.js';

Workspace_Router.post("/create" , create_Workspace_controller);
Workspace_Router.put("/update" , update_workspace_controller);













export default Workspace_Router;