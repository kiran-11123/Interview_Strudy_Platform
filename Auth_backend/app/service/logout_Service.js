import prisma from "../../global/db_connection.js";

export const logout_user_service = async (email) => {

    try {

        console.log('Email in logout_service' , email)

        const find_user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!find_user) {
            throw new Error("User not found");
        }

        await prisma.user.update({
            where: {
                email: email
            },
            data: {
                refresh_token: null,
                refresh_token_expiry: null
            }
        });

        return true;

    } catch (er) {
        throw er;
    }
};