import nodemailer from "nodemailer";

export const runtime = "nodejs";

// Récupération des variables d'environnement
const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;
const to = process.env.CONTACT_EMAIL;

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Méthode non autorisée" }), {
      status: 405,
      headers: { "Content-Type": "application/json", Allow: "POST" },
    });
  }

  // Vérification de la configuration du serveur
  if (!user || !pass || !to) {
    console.error(
      "Les variables d'environnement pour l'e-mail sont manquantes (EMAIL_USER, EMAIL_PASS, CONTACT_EMAIL)."
    );
    return new Response(
      JSON.stringify({ message: "Erreur de configuration du serveur." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ message: "Tous les champs sont requis." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Configuration du transporteur pour Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail", // Utilisation directe du service Gmail
      auth: {
        user: user, // Votre adresse e-mail Gmail
        pass: pass, // Votre mot de passe d'application Google
      },
    });

    // Options de l'e-mail
    const mailOptions = {
      from: `"Portfolio" <${user}>`,
      to: to,
      replyTo: email,
      subject: `Nouveau message de ${name} via votre portfolio`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Nouveau message depuis votre formulaire de contact</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
          <hr>
          <h3>Message :</h3>
          <p style="white-space: pre-wrap; background-color: #f4f4f4; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `,
    };

    // Envoi de l'e-mail
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "E-mail envoyé avec succès !" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Erreur Nodemailer:", error);
    return new Response(
      JSON.stringify({
        message: "Erreur lors de l'envoi de l'e-mail.",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
