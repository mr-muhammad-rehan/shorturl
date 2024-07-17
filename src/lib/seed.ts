import client from "./db";


export async function Seed() {
    await client.query(`
    CREATE TABLE IF NOT EXISTS urls (
      key VARCHAR(6) PRIMARY KEY,
      url TEXT NOT NULL,
      views INTEGER DEFAULT 0
    );
  `); 
}
