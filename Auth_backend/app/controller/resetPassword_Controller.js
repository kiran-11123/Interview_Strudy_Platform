import { reset_password_service } from "../service/Reset_password_service.js";

export const reset_password_controller = async (req, res) => {

    try {

        const { token } = req.params;
        const { new_password } = req.body;

        await reset_password_service(token, new_password);

        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });

    } catch (er) {

        return res.status(400).json({
            success: false,
            message: er.message
        });
    }
};