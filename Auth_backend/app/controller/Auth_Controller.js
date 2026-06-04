import { register_user_service , login_user_service } from "../service/Auth_Service.js";


export const register_user_controller = async(req , res)=>{

    try{    

        const { name , email , password } = req.body;

        const new_user = await register_user_service(name , email , password);

        res.status(201).json({
            success : true,
            message : 'User registered successfully',
            user : new_user
        })  

    }
    catch(er){
        res.status(400).json({
            success : false,
            message : er.message
        })
    }

}   


export const login_user_controller = async(req , res)=>{

    try{
        const { email , password } = req.body;

        const {jwt_token , isAdmin} = await login_user_service(email , password);

        


       res.cookie("token", jwt_token, {
            httpOnly: true,
            secure: false, // Set to true if using HTTPS
            sameSite: "lax", // Adjust as needed (e.g., 'strict' or 'none')
           
        });
        res.status(200).json({
            success : true,
            message : 'User logged in successfully',
            isAdmin : isAdmin

        })  

    }
    catch(er){

        console.log(er)
        res.status(400).json({
            success : false,
            message : er.message
        })
    }
}

export const get_user_details_Controller = async(req,res)=>{

    try{

        const username_data = req.user.username;

        if(!username_data){
            return res.status(401).json({
                message : 'User Not found'
            })
        }
        console.log(username_data)

        return res.status(200).json({
            message : "Details Fetched succesfully",
            username : username_data
        }) 

    }
    catch(er){

        
        return res.status(500).json({
            message : 'Internal Server Error'
        })
    }
}