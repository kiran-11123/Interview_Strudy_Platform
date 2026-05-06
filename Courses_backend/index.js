import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from 'cors'
import Connect_MongoDB from "./global/mongoDB/db_connection.js";
import notes_Router from './app/Routes/notes_routes/main.js';
import mongoose from 'mongoose';
import courses_router from './app/Routes/courses_routes/main.js';
const app = express();
app.use(cors());
Connect_MongoDB();

app.use(express.json());
app.use('/api/notes' , notes_Router);
app.use('/api/courses' , courses_router);
const PORT = process.env.PORT || 5001;




app.listen(PORT , ()=>{
     console.log(`Courses_backend is running on server ${PORT}`)
})