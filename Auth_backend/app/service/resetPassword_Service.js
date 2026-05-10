import prisma from "../../global/db_connection.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

export const reset_password_service = async (token, new_password) => {

    try {

        const hashed_token = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await prisma.user.findFirst({
            where: {
                reset_password_token: hashed_token,
                reset_password_expiry: {
                    gte: new Date()
                }
            }
        });

        if (!user) {
            throw new Error("Invalid or expired reset token");
        }

        const hashed_password = await bcrypt.hash(new_password, 10);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashed_password,
                reset_password_token: null,
                reset_password_expiry: null
            }
        });

        return true;

    } catch (er) {
        throw er;
    }
};