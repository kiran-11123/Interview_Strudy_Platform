import transporter from "../transporter.js";


export const Auth_Email_Servive = async (data) => {
    try {
       
        const info = await transporter.sendMail(data);


        return true;
    } catch (er) {
        console.error("EMAIL SERVICE ERROR FULL:", er);
        throw er;
    }
};