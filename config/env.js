import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const { 
    PORT, 
    NODE_ENV, 
    DB_URI,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ARCJET_KEY,
    ARCKET_ENV,
    QSTASH_TOKEN,
    QSTASH_URL,
    EMAIL_PASSWORD,
    SERVER_URL
} = process.env;
