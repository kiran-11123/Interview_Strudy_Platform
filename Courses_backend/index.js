import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from 'cors'
import Connect_MongoDB from "./global/db_connection.js";

const app = express();
app.use(cors());
Connect_MongoDB();


const PORT = process.env.PORT || 5001;




app.listen(PORT , ()=>{
     console.log(`Courses_backend is running on server ${PORT}`)
})