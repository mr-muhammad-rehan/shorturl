import { redirect } from "next/navigation";
import client, { connectClient } from "@/lib/db";

async function redirectToLink(key: string) {
  await connectClient();
  const result = await client.query("SELECT url FROM urls WHERE key = $1", [
    key,
  ]);

  if (result.rows.length > 0) {
    const url = result.rows[0].url;
    redirect(url);
  }
}
export default async function KeyPage({ params }: { params: { key: string } }) {
  const { key } = params;

  await redirectToLink(key);
  await client.end();
  return <div>URL not found</div>;
}
