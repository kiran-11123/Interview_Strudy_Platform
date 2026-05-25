import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
dotenv.config()
const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
})  )

app.use(express.json())
import prisma from './global/db_connection.js'
const PORT = process.env.PORT || 5000
import Refresh_Token_Router from './app/routes/Refresh_Token/main.js';
import Auth_Routes from './app/routes/Auth_routes/main.js'

app.use(cookieParser());



app.use('/api/v1/auth', Auth_Routes)
app.use("api/v1/token" , Refresh_Token_Router)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})




