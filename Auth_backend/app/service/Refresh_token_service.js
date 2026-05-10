import prisma from "../../global/db_connection.js";
import jwt from "jsonwebtoken";

export const refresh_token_service = async (refresh_token) => {

    try {

        if (!refresh_token) {
            throw new Error("Refresh token not provided");
        }

        // 1. VERIFY JWT REFRESH TOKEN
        const decoded = jwt.verify(
            refresh_token,
            process.env.JWT_SECRET_KEY
        );

        const email = decoded.email;

        // 2. FIND USER
        const find_user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!find_user) {
            throw new Error("Invalid user");
        }

        // 3. CHECK TOKEN MATCH IN DB
        if (find_user.refresh_token !== refresh_token) {
            throw new Error("Invalid refresh token");
        }

        // 4. CHECK EXPIRY
        if (find_user.refresh_token_expiry < new Date()) {
            await prisma.user.update({
                where: {
                    email: email
                },
                data: {
                    refresh_token: null
                }
            });

            throw new Error("Refresh token expired");
        }

        // 5. GENERATE NEW ACCESS TOKEN
        const new_access_token = jwt.sign(
            {
                user_id: find_user.id,
                email: find_user.email,

                // REQUIRED FOR KONG
                iss: "my-client-key"
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "15m"
            }
        );

        return new_access_token;

    } catch (er) {
        throw er;
    }
};