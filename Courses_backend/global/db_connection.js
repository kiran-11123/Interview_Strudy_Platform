import mongoose from "mongoose";

const Connect_MongoDB = async()=>{
    const DB_Connection_String = process.env.MONGO_DB_URL;

    try{

        await mongoose.connect(DB_Connection_String)

        console.log('MongoDB has connected')

    }
    catch(er){
         console.log('Error connecting to the mongoDB ' , er);
    }
}


export default Connect_MongoDB;