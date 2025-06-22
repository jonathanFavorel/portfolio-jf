import { useCallback, useEffect, useState } from "react";

interface AnalyticsData {
  totalVisits: number;
  uniqueVisitors: number;
  pageViews: number;
  averageSessionTime: number;
  bounceRate: number;
  topPages: Array<{ name: string; views: number }>;
  recentActivity: Array<{
    type: string;
    page?: string;
    file?: string;
    action?: string;
    time: Date;
  }>;
  cvDownloads: number;
  contactClicks: number;
  projectViews: number;
  activeSessions: number;
}

interface TrackingData {
  sessionId: string;
  page: string;
  userAgent: string;
}

// Fonction pour générer un ID de session unique
const generateSessionId = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

// Fonction pour obtenir ou créer un ID de session
const getSessionId = (): string => {
  let sessionId = localStorage.getItem("portfolio_session_id");
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem("portfolio_session_id", sessionId);
  }
  return sessionId;
};

// Fonction pour tracker un événement
const trackEvent = async (action: string, data: Record<string, any> = {}) => {
  try {
    const response = await fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action, data }),
    });
    return response.ok;
  } catch (error) {
    console.error("Erreur lors du tracking:", error);
    return false;
  }
};

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalVisits: 0,
    uniqueVisitors: 0,
    pageViews: 0,
    averageSessionTime: 0,
    bounceRate: 0,
    topPages: [],
    recentActivity: [],
    cvDownloads: 0,
    contactClicks: 0,
    projectViews: 0,
    activeSessions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour récupérer les analytics
  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/analytics");
      if (response.ok) {
        const data = await response.json();
        // Convertir les dates string en objets Date
        const processedData = {
          ...data,
          recentActivity: data.recentActivity.map(
            (activity: { time: string }) => ({
              ...activity,
              time: new Date(activity.time),
            })
          ),
        };
        setAnalytics(processedData);
      } else {
        const errorData = await response.json();
        setError(
          errorData.error || "Erreur lors de la récupération des analytics"
        );
      }
    } catch (err) {
      console.error("Erreur de fetch Analytics:", err);
      setError(`Erreur de connexion au serveur: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fonction pour tracker une visite de page
  const trackPageView = useCallback(async (page: string) => {
    const sessionId = getSessionId();
    const userAgent = navigator.userAgent;

    await trackEvent("track_visit", {
      sessionId,
      page,
      userAgent,
    });
  }, []);

  // Fonction pour tracker un téléchargement
  const trackDownload = useCallback(async () => {
    await trackEvent("track_download");
  }, []);

  // Fonction pour tracker un clic de contact
  const trackContactClick = useCallback(async () => {
    await trackEvent("track_contact");
  }, []);

  // Fonction pour tracker une vue de projet
  const trackProjectView = useCallback(async (projectId: string) => {
    await trackEvent("track_project_view", { projectId });
  }, []);

  // Fonction pour terminer une session
  const endSession = useCallback(async () => {
    const sessionId = getSessionId();
    if (!sessionId) return; // Ne rien faire si pas de session

    // Utiliser navigator.sendBeacon pour les requêtes en arrière-plan
    const data = { action: "end_session", data: { sessionId } };
    navigator.sendBeacon("/api/analytics", JSON.stringify(data));
  }, []);

  // Initialiser le tracking et récupérer les données
  useEffect(() => {
    fetchAnalytics();

    // Mettre à jour les analytics toutes les 30 secondes
    const interval = setInterval(fetchAnalytics, 30000);

    // Tracker la fermeture de la page
    const handleBeforeUnload = () => {
      endSession();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [fetchAnalytics, endSession]);

  return {
    analytics,
    loading,
    error,
    trackPageView,
    trackDownload,
    trackContactClick,
    trackProjectView,
    refreshAnalytics: fetchAnalytics,
  };
};
