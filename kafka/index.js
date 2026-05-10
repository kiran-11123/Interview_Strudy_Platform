import Kafka from 'kafkajs'
import dotenv from 'dotenv'
import axios from 'axios'
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '.env');

dotenv.config({ path: envPath });

export const kafka = new Kafka({
  clientId: "ecommerce-app",
  brokers: ["localhost:9092"],
});


export const producer = kafka.producer();
await producer.connect();
export const Email_Consumer = kafka.consumer({ groupId: "email-service-group" });
await Email_Consumer.connect();


