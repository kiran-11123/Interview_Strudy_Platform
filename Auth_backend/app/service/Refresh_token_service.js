import prisma from "../../global/db_connection.js";

export const refresh_token_service = async(email)=>{

    try{
        const find_token = await prisma.user.findUnique({
            where : {
                email : email
            }
        })
        
        if(!find_token){
            throw new Error('Invalid user')
        }

       const refresh_token = find_token.refresh_token;

       if(!refresh_token ){
        throw new Error('Refresh Token not found')
       }

       if( find_token.refresh_token_expiry < new Date()){
            await prisma.user.update({
                where : {
                    email : email
                },
                data : {

                    refresh_token : ""
                }

           
       })

       throw new Error('Refresh Token not found')

       }

       const jwt_secret = process.env.JWT_SECRET_KEY;

       const jwt_token = jwt.sign(
        {
            user_id: find_token.id,
            email: find_token.email,
             // IMPORTANT FOR KONG
                iss: "my-client-key"
        },
            jwt_secret,
            {
                expiresIn: '15m'
            }
        );

        return jwt_token;


    }    catch(er){
        throw er
    }


}