import Kafka, { Partitioners } from 'kafkajs'
import dotenv from 'dotenv'
import axios from 'axios'
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '.env');

dotenv.config({ path: envPath });

export const kafka = new Kafka({
  clientId: "email-service-app",
  brokers: ["localhost:9092" , "localhost:9093", "localhost:9094"],
  Partitioners : {
    DefaultPartitioner: Partitioners.DefaultPartitioner,
    CustomPartitioner: Partitioners.LegacyPartitioner
  },
  replicationFactor : 1,


});


export const producer = kafka.producer();
await producer.connect();
export const Email_Consumer = kafka.consumer({ groupId: "email-service-group" });

export const password_reset_consumer = kafka.consumer({ groupId: "password-reset-email-group" });

await password_reset_consumer.connect();
await Email_Consumer.connect();


