export const runtime = "nodejs"; // Spécifie le runtime Node.js

import fs from "fs";
import path from "path";

const analyticsFile = path.join(process.cwd(), "data", "analytics.json");

// Créer le dossier data s'il n'existe pas
const dataDir = path.dirname(analyticsFile);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialiser le fichier analytics s'il n'existe pas
if (!fs.existsSync(analyticsFile)) {
  const initialData = {
    totalVisits: 0,
    uniqueVisitors: 0,
    pageViews: 0,
    sessions: [],
    pageViewsData: {},
    downloads: 0,
    contactClicks: 0,
    projectViews: {},
    lastReset: new Date().toISOString(),
  };
  fs.writeFileSync(analyticsFile, JSON.stringify(initialData, null, 2));
}

// Fonction pour lire les données analytics
function readAnalytics() {
  try {
    const data = fs.readFileSync(analyticsFile, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Erreur lors de la lecture des analytics:", error);
    return {
      totalVisits: 0,
      uniqueVisitors: 0,
      pageViews: 0,
      sessions: [],
      pageViewsData: {},
      downloads: 0,
      contactClicks: 0,
      projectViews: {},
      lastReset: new Date().toISOString(),
    };
  }
}

// Fonction pour écrire les données analytics
function writeAnalytics(data) {
  try {
    fs.writeFileSync(analyticsFile, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Erreur lors de l'écriture des analytics:", error);
  }
}

// Fonction pour générer un ID de session unique
function generateSessionId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

// Fonction pour calculer les métriques
function calculateMetrics(analytics) {
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Sessions récentes
  const recentSessions = analytics.sessions.filter(
    (session) => new Date(session.startTime) > oneDayAgo
  );

  // Calculer le temps de session moyen
  const activeSessions = recentSessions.filter((session) => !session.endTime);
  const completedSessions = recentSessions.filter((session) => session.endTime);

  let averageSessionTime = 0;
  if (completedSessions.length > 0) {
    const totalTime = completedSessions.reduce((total, session) => {
      const start = new Date(session.startTime);
      const end = new Date(session.endTime);
      return total + (end.getTime() - start.getTime());
    }, 0);
    averageSessionTime = Math.floor(
      totalTime / completedSessions.length / 1000
    ); // en secondes
  }

  // Calculer le taux de rebond (sessions avec une seule page vue)
  const bounceSessions = completedSessions.filter(
    (session) => session.pageViews && session.pageViews.length <= 1
  );
  const bounceRate =
    completedSessions.length > 0
      ? (bounceSessions.length / completedSessions.length) * 100
      : 0;

  // Pages les plus populaires
  const pageViews = Object.entries(analytics.pageViewsData)
    .map(([page, views]) => ({
      name: page,
      views: views,
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  // Activité récente (dernières 10 actions)
  const recentActivity = [];

  // Ajouter les sessions récentes
  recentSessions.slice(0, 5).forEach((session) => {
    recentActivity.push({
      type: "visit",
      page:
        session.pageViews && session.pageViews.length > 0
          ? session.pageViews[0]
          : "Accueil",
      time: new Date(session.startTime),
    });
  });

  // Ajouter les téléchargements récents (simulé pour l'instant)
  if (analytics.downloads > 0) {
    recentActivity.push({
      type: "download",
      file: "CV",
      time: new Date(now.getTime() - Math.random() * 3600000),
    });
  }

  // Ajouter les clics de contact récents (simulé pour l'instant)
  if (analytics.contactClicks > 0) {
    recentActivity.push({
      type: "contact",
      action: "Email",
      time: new Date(now.getTime() - Math.random() * 7200000),
    });
  }

  // Trier par temps et prendre les 10 plus récentes
  recentActivity.sort((a, b) => b.time.getTime() - a.time.getTime());
  recentActivity.splice(10);

  return {
    totalVisits: analytics.totalVisits,
    uniqueVisitors: analytics.uniqueVisitors,
    pageViews: analytics.pageViews,
    averageSessionTime,
    bounceRate: Math.round(bounceRate * 10) / 10,
    topPages: pageViews,
    recentActivity,
    cvDownloads: analytics.downloads,
    contactClicks: analytics.contactClicks,
    projectViews: Object.values(analytics.projectViews).reduce(
      (sum, views) => sum + views,
      0
    ),
    activeSessions: activeSessions.length,
  };
}

export default function handler(req, res) {
  if (req.method === "POST") {
    const { action, data } = req.body;
    const analytics = readAnalytics();

    switch (action) {
      case "track_visit":
        // Incrémenter les compteurs
        analytics.totalVisits++;
        analytics.pageViews++;

        // Créer ou mettre à jour une session
        const { sessionId, page, userAgent } = data;
        let session = analytics.sessions.find((s) => s.id === sessionId);

        if (!session) {
          session = {
            id: sessionId,
            startTime: new Date().toISOString(),
            pageViews: [],
            userAgent,
          };
          analytics.sessions.push(session);
          analytics.uniqueVisitors++;
        }

        if (page && !session.pageViews.includes(page)) {
          session.pageViews.push(page);
        }

        // Mettre à jour les vues de page
        if (page) {
          analytics.pageViewsData[page] =
            (analytics.pageViewsData[page] || 0) + 1;
        }

        // Nettoyer les anciennes sessions (plus de 30 jours)
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        analytics.sessions = analytics.sessions.filter(
          (s) => new Date(s.startTime) > thirtyDaysAgo
        );

        writeAnalytics(analytics);
        res.status(200).json({ success: true });
        break;

      case "track_download":
        analytics.downloads++;
        writeAnalytics(analytics);
        res.status(200).json({ success: true });
        break;

      case "track_contact":
        analytics.contactClicks++;
        writeAnalytics(analytics);
        res.status(200).json({ success: true });
        break;

      case "track_project_view":
        const { projectId } = data;
        analytics.projectViews[projectId] =
          (analytics.projectViews[projectId] || 0) + 1;
        writeAnalytics(analytics);
        res.status(200).json({ success: true });
        break;

      case "end_session":
        const { sessionId: endSessionId } = data;
        const sessionToEnd = analytics.sessions.find(
          (s) => s.id === endSessionId
        );
        if (sessionToEnd) {
          sessionToEnd.endTime = new Date().toISOString();
        }
        writeAnalytics(analytics);
        res.status(200).json({ success: true });
        break;

      default:
        res.status(400).json({ error: "Action non reconnue" });
    }
  } else if (req.method === "GET") {
    const analytics = readAnalytics();
    const metrics = calculateMetrics(analytics);
    res.status(200).json(metrics);
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}
