import { randomBytes } from 'crypto';
import client, { connectClient } from '@/lib/db';
import { Seed } from '@/lib/seed';
import { IResponse } from '@/models';

export async function POST(req: Request) {
  const { url } = await req.json();

  if (!url) {
    return new Response('Enter Valid URL', {
      status: 400
    });
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

  const currentOrigin = req.headers.get('origin');
  const shortedUrl = `${currentOrigin}/${key}`;
  const response: IResponse = {
    key: key,
    url: shortedUrl
  }

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}