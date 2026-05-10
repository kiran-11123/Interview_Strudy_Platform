import { refresh_token_service as refreshTokenService } from "../service/Refresh_token_service.js";

export const refresh_token_controller = async (req, res) => {

    try {

        // ✅ GET FROM COOKIE (BEST PRACTICE)
        const refresh_token = req.cookies?.refresh_token;

        if (!refresh_token) {
            return res.status(401).json({
                message: "Refresh token missing"
            });
        }

        // CALL SERVICE
        const new_access_token = await refreshTokenService(refresh_token);

        // SET NEW ACCESS TOKEN COOKIE
        res.cookie("token", new_access_token, {

            httpOnly: true,
            secure: false, // true in production HTTPS

            sameSite: "lax",

            maxAge: 15 * 60 * 1000
        });

        return res.status(200).json({
            message: "Access token refreshed successfully"
        });

    } catch (er) {

        if (er.message === "Invalid user") {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (er.message === "Refresh token expired") {
            return res.status(401).json({
                message: "Refresh token expired"
            });
        }

        return res.status(500).json({
            message: `Internal Server Error: ${er.message}`
        });
    }
};