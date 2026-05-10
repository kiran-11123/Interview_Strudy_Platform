import dotenv from 'dotenv';
import nodemailer from 'nodemailer'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../.env');

dotenv.config({ path: envPath });

const MAIL_PASSWORD = process.env.GMAIL_APP_PASSWORD;

console.log("Gmail App Password loaded:", MAIL_PASSWORD ? `✓ Set (length: ${MAIL_PASSWORD.length})` : "✗ Not set");
console.log("Password value:", MAIL_PASSWORD);
console.log("Env path resolved to:", envPath);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "eventnest.official.main@gmail.com", 
    pass: MAIL_PASSWORD,      
  },
   tls: {
    rejectUnauthorized: false,       
  },
});




export default transporter