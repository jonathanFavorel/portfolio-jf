import { kv } from "@vercel/kv";

export const runtime = "edge";

// Clé unique pour stocker nos données dans Vercel KV
const PORTFOLIO_DATA_KEY = "portfolio-data";

export async function GET(req) {
  try {
    const data = await kv.get(PORTFOLIO_DATA_KEY);
    if (!data) {
      // Si aucune donnée n'est trouvée, renvoyer une structure par défaut
      return new Response(
        JSON.stringify({
          personalInfo: {},
          experiences: [],
          projects: [],
          skills: [],
          testimonials: [],
          socialLinks: {},
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erreur de lecture depuis Vercel KV:", error);
    return new Response(
      JSON.stringify({
        message: "Erreur serveur lors de la lecture des données.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(req) {
  try {
    // Pour des raisons de sécurité, nous devrions vérifier l'authentification ici
    // (Cette partie sera ajoutée plus tard si nécessaire)

    const newData = await req.json();
    await kv.set(PORTFOLIO_DATA_KEY, newData);

    return new Response(
      JSON.stringify({ message: "Données sauvegardées avec succès." }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Erreur d'écriture dans Vercel KV:", error);
    return new Response(
      JSON.stringify({
        message: "Erreur serveur lors de la sauvegarde des données.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
