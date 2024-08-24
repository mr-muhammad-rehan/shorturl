import { randomBytes } from 'crypto';
import { client, connectClient } from '@/lib/db';
import { Seed } from '@/lib/seed';
import { NextApiRequest, NextApiResponse } from 'next';

export type GenerateCountResponse = {
  key: string;
  url: string;
}


export default async function handler(req: NextApiRequest, res: NextApiResponse<GenerateCountResponse>) {
  if (req.method === 'POST') {
    const { url } = JSON.parse(req.body);
    if (!url) {
      res.status(500).end(`Enter Valid URL`);
    }

    try {
      await connectClient();
      await client.query('SELECT 1 FROM urls LIMIT 1');
    } catch (e: any) {
      if (e.message.includes('relation "urls" does not exist')) {
        console.log('Table does not exist, creating and seeding it with dummy data now...');
        await Seed();
      }
    }

    // Generate a unique 6-character key
    const generateKey = () => randomBytes(3).toString('hex'); // 3 bytes = 6 hex characters
    let key = generateKey().toUpperCase();

    // Check if the key is unique
    let result = await client.query('SELECT key FROM urls WHERE key = $1', [key]);

    // Regenerate key if not unique
    while (result.rows.length > 0) {
      key = generateKey();
      result = await client.query('SELECT key FROM urls WHERE key = $1', [key]);
    }

    // Insert the key, URL, and initial views into the database
    await client.query('INSERT INTO urls (key, url, views) VALUES ($1, $2, 0)', [key, url]);

    const currentOrigin = req.headers.host;
    const shortedUrl = `${currentOrigin}/${key}`;
    const response: GenerateCountResponse = {
      key: key,
      url: shortedUrl
    }

    res.status(200).json(response);

  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

}