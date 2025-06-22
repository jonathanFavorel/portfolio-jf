export const runtime = "nodejs"; // Spécifie le runtime Node.js

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // Lire le corps de la requête manuellement
    const bodyBuffer = [];
    for await (const chunk of req) {
      bodyBuffer.push(chunk);
    }
    const body = JSON.parse(Buffer.concat(bodyBuffer).toString());
    const { username, password } = body;

    const adminUsername = process.env.ADMIN_USERNAME;
    const hashedPassword = process.env.ADMIN_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET;

    if (!adminUsername || !hashedPassword || !jwtSecret) {
      console.error(
        "Une ou plusieurs variables d'environnement sont manquantes (USERNAME, PASSWORD, JWT_SECRET)."
      );
      return res.status(500).json({
        success: false,
        message: "Erreur de configuration du serveur.",
      });
    }

    if (username !== adminUsername) {
      return res
        .status(401)
        .json({ success: false, message: "Identifiants incorrects" });
    }

    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (isMatch) {
      // Créer le jeton JWT
      const token = jwt.sign({ username: adminUsername }, jwtSecret, {
        expiresIn: "1h",
      });

      // Envoyer le jeton dans un cookie sécurisé
      res.setHeader(
        "Set-Cookie",
        `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict; Secure`
      );

      return res
        .status(200)
        .json({ success: true, message: "Connexion réussie" });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Identifiants incorrects" });
    }
  } catch (error) {
    console.error("Erreur dans l'API de connexion:", error);
    return res
      .status(500)
      .json({ success: false, message: "Erreur interne du serveur." });
  }
}
