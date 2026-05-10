import express from 'express'
const Auth_Router = express.Router()
import { register_user_controller , login_user_controller } from '../../controller/Auth_Controller.js'
import { logout_user_controller } from '../../controller/logout_Controller.js';

Auth_Router.post("/signin" , login_user_controller);
Auth_Router.post("/signup" , register_user_controller)
Auth_Router.post("/logout" , login_user_controller)





export default Auth_Router