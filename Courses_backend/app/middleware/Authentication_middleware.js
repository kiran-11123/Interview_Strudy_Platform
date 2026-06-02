import jwt from "jsonwebtoken";
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY


export const Authentication_middleware = (req, res, next) => {

    
    try{

        const token = req.cookies.token ;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const decoded = jwt.verify(token, JWT_SECRET_KEY);

        req.user = decoded;

        next();

    }
    catch(er){
        return res.status(401).json({ message: "Unauthorized" })
    }



}