import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env['PORT'];
export const MONGODB_URI = process.env['MONGO_URI'];
export const KEY_CLOUD = process.env['API_KEY_CLOUD'];
export const SECRET_CLOUD = process.env['API_SECRET_CLOUD'];