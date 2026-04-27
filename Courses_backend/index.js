import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'


const app = express();
app.use(cors());
dotenv.config();



const PORT = process.env.PORT || 5001;




app.listen(PORT , ()=>{
     console.log(`Courses_backend is running on server ${PORT}`)
})