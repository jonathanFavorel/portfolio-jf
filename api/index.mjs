import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import analyticsHandler from "./analytics.mjs";
import authCheckHandler from "./auth-check.mjs";
import cvHandler from "./cv.js";
import loginHandler from "./login.mjs";
import logoutHandler from "./logout.mjs";
import portfolioHandler from "./portfolio.js";

dotenv.config();

const app = express();

// Middleware pour parser le JSON et les cookies
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// Wrapper pour adapter les fonctions Vercel à Express - N'est plus vraiment nécessaire mais ne pose pas de problème
const vercelToExpress = (handler) => (req, res) => {
  handler(req, res);
};

// Définir les routes
// Note: les chemins sont relatifs à /api/
app.all("/login", vercelToExpress(loginHandler));
app.all("/logout", vercelToExpress(logoutHandler));
app.all("/auth-check", vercelToExpress(authCheckHandler));
app.all("/analytics", vercelToExpress(analyticsHandler));
app.all("/cv", vercelToExpress(cvHandler));
app.all("/portfolio", vercelToExpress(portfolioHandler));

// Exporter l'application Express pour que Vercel puisse l'utiliser
export default app;
