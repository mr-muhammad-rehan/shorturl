import { createClient } from '@vercel/postgres';

let isConnected = false;

export const client = createClient({
  connectionString: process.env.POSTGRES_URL,
});

export const connectClient = async () => { 
  if (!isConnected && client.user && process.env.POSTGRES_URL) {
    await client.connect();
    isConnected = true;
  }
};
 