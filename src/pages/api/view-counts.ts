import { client, connectClient } from '@/lib/db';
import { extractKey } from '@/lib/utils';
import type { NextApiRequest, NextApiResponse } from 'next'

export type ViewCountResponseData = {
  views: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ViewCountResponseData>) {
  if (req.method === 'POST') {
    try {
      const { url } = JSON.parse(req.body);
      const key = extractKey(url);
      if (!url && !key) {
        res.status(500).end(`Enter Valid URL`);
      }
      await connectClient();
      let result = await client.query('SELECT views FROM urls WHERE key = $1', [key]);
      if (result.rows.length <= 0)
        res.status(500).end(`Enter Valid URL`);

      const currentCount = result.rows[0].views;


      res.status(200).json(JSON.parse(
        JSON.stringify({
          views: currentCount
        })
      ))
    } catch (e) {
      console.error(e);
      res.status(500).end(`Something went wrong`);
    }
  }

}