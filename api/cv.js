import { del, list, put } from "@vercel/blob";

export const runtime = "nodejs";

async function POST(request) {
  const { file } = await request.json();

  if (!file) {
    return new Response(JSON.stringify({ message: "No file provided" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Supprimer l'ancien CV avant d'en téléverser un nouveau
  try {
    const { blobs } = await list({ prefix: "cv.pdf" });
    if (blobs.length > 0) {
      await del(blobs.map((blob) => blob.url));
    }
  } catch (error) {
    // Ne pas bloquer si la suppression échoue (par exemple, si aucun fichier n'existait)
    console.warn("Could not delete old CV, continuing with upload:", error);
  }

  const blob = await put("cv.pdf", Buffer.from(file.split(",")[1], "base64"), {
    access: "public",
    contentType: "application/pdf",
    addRandomSuffix: false,
  });

  return new Response(JSON.stringify(blob), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

async function GET() {
  const { blobs } = await list({
    prefix: "cv.pdf",
    limit: 1,
  });
  if (blobs.length > 0) {
    return new Response(JSON.stringify({ url: blobs[0].url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify({ url: "" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export { GET, POST };
