import { forgot_password_service } from "../service/Forgot_password_service.js";

export const forgot_password_controller = async (req, res) => {

    try {

        const { email } = req.body;

        const reset_link = await forgot_password_service(email);

        return res.status(200).json({
            success: true,
            message: "Password reset link generated",
            reset_link
        });

    } catch (er) {

        return res.status(400).json({
            success: false,
            message: er.message
        });
    }
};