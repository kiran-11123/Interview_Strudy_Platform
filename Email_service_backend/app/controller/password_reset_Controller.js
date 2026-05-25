import { password_reset_Service } from "../services/password_reset_Service.js";



export const password_reset_controller = async (req, res) => {

    try {

        const data = req.body;
        const result = await password_reset_Service(data);
        return res.status(200).json({
            success: true,
            message: "Password reset email sent successfully",
        }); 

    } catch (er) {

        return res.status(500).json({       

            success: false,
            message: "Error while sending the password reset email",
        });
    }   

};  