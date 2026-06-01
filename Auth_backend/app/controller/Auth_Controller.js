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

        const {token , isAdmin} = await login_user_service(email , password);

        console.log(token , isAdmin)
        


       res.cookie("token", token, {
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