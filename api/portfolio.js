import { kv } from "@vercel/kv";

export const runtime = "edge";

// Clé unique pour stocker nos données dans Vercel KV
const PORTFOLIO_DATA_KEY = "portfolio-data";

export async function GET(request) {
  try {
    const data = await kv.get(PORTFOLIO_DATA_KEY);
    if (!data) {
      return Response.json({ message: "No data found" }, { status: 404 });
    }
    return Response.json(data);
  } catch (error) {
    console.error("KV GET Error:", error);
    return Response.json(
      { message: "Failed to fetch data from KV." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const newData = await request.json();
    await kv.set(PORTFOLIO_DATA_KEY, newData);
    return Response.json({ message: "Data saved successfully." });
  } catch (error) {
    console.error("KV SET Error:", error);
    return Response.json(
      { message: "Failed to save data to KV." },
      { status: 500 }
    );
  }
}
