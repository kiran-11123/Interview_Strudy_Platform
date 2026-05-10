import express from 'express'
const Auth_email_router = express.Router();

import { Email_controller } from '../controller/Auth_Email_Controller.js';


Auth_email_router.post('/ForgotPasswordService' , Email_controller)



export  default Auth_email_router
