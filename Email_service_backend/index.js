import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
const app = express();
app.use(express.json());
import Auth_email_router from './app/routes/Auth_email.js';
const port = process.env.PORT ;


app.use('/email' , Auth_email_router)





app.listen(port , ()=>{
       
     console.log(`Email Service Running on PORT : ${port}`);
})

