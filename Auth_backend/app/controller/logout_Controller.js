import { logout_user_service } from "../service/Logout_service.js";

export const logout_user_controller = async (req, res) => {

    try {

        const { email } = req.body;

        // 1. clear DB refresh token
        await logout_user_service(email);

        // 2. clear access token cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        // 3. clear refresh token cookie
        res.clearCookie("refresh_token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (er) {

        return res.status(500).json({
            success: false,
            message: `Internal Server Error: ${er.message}`
        });
    }
};