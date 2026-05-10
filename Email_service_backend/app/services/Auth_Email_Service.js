import transporter from "../transporter.js";


export const Auth_Email_Servive = async (data) => {
    try {
        console.log("Data received in Email Service:", data);

        const info = await transporter.sendMail(data);

        console.log("EMAIL SENT SUCCESS:", info.messageId);

        return true;
    } catch (er) {
        console.error("EMAIL SERVICE ERROR FULL:", er);
        throw er;
    }
};