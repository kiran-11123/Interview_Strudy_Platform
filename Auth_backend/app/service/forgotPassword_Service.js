import prisma from "../../global/db_connection.js";
import crypto from "crypto";
import { producer } from "../../../kafka/index.js";

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

        // send email here

        producer.send({
            topic: "email-service-topic",
            messages: [
               
                {

                    key : "forgot-password",
            
            value : JSON.stringify({ 
                
            from: "eventnest.official.main@gmail.com",
            to: email,
            subject: "Password Change Code ",
            text: "Please find the code to reset the password.",
            html: `
               
           <div style="font-family: Arial, sans-serif; padding: 20px; border: 2px solid #4CAF50; border-radius: 10px; max-width: 600px; margin: auto; background-color: #f9f9f9;">
      
      <h1 style="color: #4CAF50; text-align: center;margin-bottom:20px;">
        Enter this code to reset your password
      </h1>

      <div style="text-align:center;">
        <div style="
          display: inline-block;
          padding: 12px 25px;
          background-color: #ffffff;
          border: 2px dashed #4CAF50;
          border-radius: 8px;
          font-size: 22px;
          letter-spacing: 4px;
          font-weight: bold;
          color: #333;">
          ${otp}
        </div>
      </div>

      <p style="color:#555; text-align:center; margin-top:25px; font-size: 14px;">
        If you did not request this, you can safely ignore this email.
      </p>

    </div>
            ` 


        })

    }
            
        ] });
       
        return true;

    } catch (er) {
        throw er;
    }
};