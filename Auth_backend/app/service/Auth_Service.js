import prisma from "../../global/db_connection.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register_user_service = async(name , email , password)=>{

    try{

        const find_user  =await prisma.user.findUnique({
            where : {
                email : email
            }
        })

        if(find_user){
            throw new Error('User with this email already exists')
        }

        const find_username = await prisma.user.findUnique({
            where : {
                username : name
            }
        })

        if(find_username){
            throw new Error('Username already taken')
        }

        const salted_password = await bcrypt.hash(password , 10);

        const new_user = await prisma.user.create({
            data : {
                username : name,
                email : email,
                password : salted_password
            }
        })

        return new_user;

    }


    catch(er){
          throw er
   
    }

}
export const login_user_service = async (email, password) => {


    try {

        const find_user = await prisma.user.findUnique({
            where: {
                 email
            }
        });

        if (!find_user) {
            throw new Error(
                'User with this email does not exist'
            );
        }

        const check_password = await bcrypt.compare(
            password,
            find_user.password
        );

        if (!check_password) {
            throw new Error('Incorrect password');
        }


        // ACCESS TOKEN
        const jwt_token = jwt.sign(

            {
                user_id: find_user.userId,

                email: find_user.email,
                role : find_user.isAdmin

                // IMPORTANT FOR KONG
               // iss: "my-client-key"
            },

            process.env.JWT_SECRET_KEY,

            {
                expiresIn: '15m'
            }
        );


        // REFRESH TOKEN
        const new_refresh_token = jwt.sign(

            {
                user_id: find_user.userId,

                email: find_user.email
            },

            process.env.JWT_SECRET_KEY,

            {
                expiresIn: '7d'
            }
        );


        const refresh_token_expiry = new Date() ;

        refresh_token_expiry.setDate(
            refresh_token_expiry.getDate() + 7
        );


    await prisma.$transaction(async( tx )=>{

        await tx.user.update({

             where: {
                userId: find_user.userId
            },

            data: {

                refresh_token: new_refresh_token,

                refresh_token_expiry:
                    refresh_token_expiry
            }

        })

    })
       


        return { jwt_token , isAdmin: find_user.isAdmin };

    }
    catch (er) {

        throw er;
    }
}


