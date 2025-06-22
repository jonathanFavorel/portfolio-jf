import Redis from "ioredis";

export const runtime = "edge";

// Clé unique pour stocker nos données dans Redis
const PORTFOLIO_DATA_KEY = "portfolio-data";

// Créer une nouvelle instance Redis en utilisant l'URL de l'environnement
const redis = new Redis(process.env.REDIS_URL);

export async function GET(request) {
  try {
    const data = await redis.get(PORTFOLIO_DATA_KEY);
    if (!data) {
      return Response.json({ message: "No data found" }, { status: 404 });
    }
    // Les données de Redis sont une chaîne, il faut la parser
    return Response.json(JSON.parse(data));
  } catch (error) {
    console.error("Redis GET Error:", error);
    return Response.json(
      { message: "Failed to fetch data from Redis." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const newData = await request.json();
    // Il faut convertir les données en chaîne avant de les sauvegarder dans Redis
    await redis.set(PORTFOLIO_DATA_KEY, JSON.stringify(newData));
    return Response.json({ message: "Data saved successfully." });
  } catch (error) {
    console.error("Redis SET Error:", error);
    return Response.json(
      { message: "Failed to save data to Redis." },
      { status: 500 }
    );
  }
}
