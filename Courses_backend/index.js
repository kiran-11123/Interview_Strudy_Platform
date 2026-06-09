import dotenv from 'dotenv';

import express from "express";
import cors from 'cors'
import Connect_MongoDB from "./global/mongoDB/db_connection.js";
import notes_Router from './app/Routes/notes_routes/main.js';
import mongoose from 'mongoose';
import courses_router from './app/Routes/courses_routes/main.js';
import Workspace_Router from './app/Routes/workspace_routes/main.js';
import Recently_Deleted_Router from './app/Routes/recently_deleted_routes/main.js';
import Favourites_Router from './app/Routes/favourites_routes/main.js';
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json())

dotenv.config();

app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
})  );
Connect_MongoDB();

app.use(express.json());
app.use('/api/notes' , notes_Router);
app.use('/api/courses' , courses_router);
app.use('/api/workspaces' , Workspace_Router);
app.use('/api/recently_deleted' , Recently_Deleted_Router);
app.use('/api/favourites' , Favourites_Router)
const PORT = process.env.PORT ;




app.listen(PORT , ()=>{
     console.log(`Courses_backend is running on server ${PORT}`)
})