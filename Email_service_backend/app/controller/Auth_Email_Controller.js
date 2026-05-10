import { Auth_Email_Servive } from "../service/Auth_Email_Service.js";





export const Email_controller = async(req,res)=>{
       
    try{

        console.log("Request received in Email Controller with data " , req.body);

         const data = req.body;
         const result = await Auth_Email_Servive(data)

         return res.status(200).json({

            message : "Email Sent Successfully"

        })  ;

    }
    catch(er){

        return res.status(500).json({

            message : "Error while sending the email" ,

        })
          
    }
}