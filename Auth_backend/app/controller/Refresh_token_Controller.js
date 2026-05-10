import { refresh_token_service } from "../service/Refresh_token_service.js";



export const refresh_token_service = async(req,res)=>{
     
    try{

        const {email}  = req.body;

        const token = await refresh_token_service(email);

       
       res.cookie("token", token, {
            httpOnly: true,
            secure: false, // Set to true if using HTTPS
            sameSite: "lax", // Adjust as needed (e.g., 'strict' or 'none')
           
        });

        return res.status(200).json({
            message : "JWT token added "
        })


    }
    catch(er){
         
        if(er.message === 'Invalid user') {
            return res.status(404).json({
                message : 'User not found'
            })
        }
        else if(er.message === 'Refresh Token not found' ){
            return res.status(400).json({
                message : 'Refresh Token not found'
            })
        }
        

        return res.status(500).json({
            message : `Internal server Error ${er.message}`
        })


    }
}