import transporter from "../transporter.js";



export const password_reset_Service = async (data) => {
    try {

        const info = await transporter.sendMail(data);

        return true;
    } catch (er) {
        console.error("FORGOT PASSWORD EMAIL SERVICE ERROR FULL:", er);
        throw er;
    }


};  