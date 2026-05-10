import { refresh_token_controller } from "../../controller/Refresh_token_Controller.js";

import express from 'express'

const Refresh_Token_Router  = express.Router();


Refresh_Token_Router.post("/refresh_token" , refresh_token_controller)




export default Refresh_Token_Router