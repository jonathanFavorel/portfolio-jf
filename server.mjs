import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import analyticsHandler from "./api/analytics.mjs";
import authCheckHandler from "./api/auth-check.mjs";
import cvHandler from "./api/cv.js";
import loginHandler from "./api/login.mjs";
import logoutHandler from "./api/logout.mjs";
import portfolioHandler from "./api/portfolio.js";

dotenv.config();

const app = express();
const port = 3001;

// Middleware pour parser le JSON et les cookies
app.use(express.json());
app.use(cookieParser());

// Wrapper pour adapter les fonctions Vercel à Express
const vercelToExpress = (handler) => (req, res) => {
  handler(req, res);
};

// Définir les routes
app.all("/login.mjs", vercelToExpress(loginHandler));
app.all("/logout.mjs", vercelToExpress(logoutHandler));
app.all("/auth-check.mjs", vercelToExpress(authCheckHandler));
app.all("/analytics.mjs", vercelToExpress(analyticsHandler));
app.all("/cv.js", vercelToExpress(cvHandler));
app.all("/portfolio.js", vercelToExpress(portfolioHandler));

app.listen(port, () => {
  console.log(`[server]: API server is running at http://localhost:${port}`);
});
