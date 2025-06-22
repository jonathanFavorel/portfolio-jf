export const runtime = "nodejs"; // Spécifie le runtime Node.js

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Supprimer le cookie en lui donnant une date d'expiration passée
  res.setHeader(
    "Set-Cookie",
    "token=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure"
  );

  return res
    .status(200)
    .json({ success: true, message: "Déconnexion réussie" });
}
