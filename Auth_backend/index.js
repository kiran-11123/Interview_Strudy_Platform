import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
import prisma from './global/db_connection.js'
const PORT = process.env.PORT || 5000
import Refresh_Token_Router from './app/routes/Refresh_Token/main.js';
import Auth_Routes from './app/routes/Auth_routes/main.js'

app.use(cookieParser());



app.use('/auth', Auth_Routes)
app.use("/token" , Refresh_Token_Router)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})




