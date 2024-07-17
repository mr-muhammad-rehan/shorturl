import { createClient } from '@vercel/postgres';
import dotenv from 'dotenv';

dotenv.config({
  path: `${__dirname}/../.env`,
  override: true,
});

let isConnected = false;

const client = createClient({
  connectionString: process.env.POSTGRES_URL,
});

export const connectClient = async () => {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
};

export default client;