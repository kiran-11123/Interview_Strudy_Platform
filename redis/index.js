import redis from 'redis';
import dotenv from 'dotenv';
import { createClient } from 'redis';
dotenv.config();

const redis_PORT = process.env.redis_PORT || 6379;
const redis_HOST = process.env.redis_HOST || 'http://localhost';

const redis_client= createClient({
     url : `${redis_HOST}:${redis_PORT}`
})

redis_client.on('error', (err) => console.log('Redis Client Error', err));

await redis_client.connect();

export default redis_client;