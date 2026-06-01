import jwt from 'jsonwebtoken'

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY


const  Authentication_middleware = (req,res,next)=>{
     
    try{

        const token = req.cookies?.token;

        if(!token){
            return res.status(401).json({
                message : "Unauthourized"
            })
        }

        const decoded = jwt.verify(token , JWT_SECRET_KEY)

         if(!decoded){
             return res.status(401).json({
                message:"Invalid Token payload."
             })
        }

       
        req.user = decoded;
        next();

    }
    catch(er){
         return res.status(401).json({
            message:"Invalid Token",
            error:er
        })
    }
}

export  default Authentication_middleware;