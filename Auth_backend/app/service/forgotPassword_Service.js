import prisma from "../../global/db_connection.js";
import crypto from "crypto";

export const forgot_password_service = async (email) => {

    try {

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            throw new Error("User not found");
        }

        // create reset token (random secure string)
        const reset_token = crypto.randomBytes(32).toString("hex");

        const reset_token_expiry = new Date();
        reset_token_expiry.setMinutes(
            reset_token_expiry.getMinutes() + 15
        );

        // store hashed token in DB (safer)
        const hashed_token = crypto
            .createHash("sha256")
            .update(reset_token)
            .digest("hex");

        await prisma.user.update({
            where: { email },
            data: {
                reset_password_token: hashed_token,
                reset_password_expiry: reset_token_expiry
            }
        });

        // normally you send email here (link)
        const reset_link = `http://localhost:5000/auth/reset-password/${reset_token}`;

        return reset_link;

    } catch (er) {
        throw er;
    }
};