import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  FaBriefcase,
  FaChartLine,
  FaCircle,
  FaClock,
  FaComment,
  FaDownload,
  FaEdit,
  FaEnvelope,
  FaExclamationTriangle,
  FaExternalLinkAlt,
  FaEye,
  FaFilePdf,
  FaGithub,
  FaLightbulb,
  FaLink,
  FaLinkedin,
  FaLock,
  FaMoon,
  FaPalette,
  FaPlus,
  FaProjectDiagram,
  FaReact,
  FaSave,
  FaSignInAlt,
  FaSignOutAlt,
  FaStar,
  FaSun,
  FaSync,
  FaTachometerAlt,
  FaTimes,
  FaTrash,
  FaUser,
  FaWrench,
} from "react-icons/fa";
import { ThemeProvider } from "styled-components";
import { useAnalytics } from "../../hooks/useAnalytics";
import type {
  Experience,
  Project,
  Skill,
  Testimonial,
} from "../../hooks/usePortfolioData";
import { usePortfolioData } from "../../hooks/usePortfolioData";
import { darkTheme, lightTheme } from "../../styles/theme";
import { availableIcons as iconComponents, iconNameMap } from "../shared/icons";
import BackgroundSelector from "./BackgroundSelector";
import {
  ActionButton,
  Badge,
  Button,
  Card,
  DashboardContainer,
  FormGroup,
  FullWidthItem,
  GlobalDashboardStyle,
  Grid,
  HeaderSection,
  IconGrid,
  IconItem,
  Input,
  LoadingSpinner,
  LoginForm,
  MainContent,
  Modal,
  Overlay,
  PreviewCard,
  Section,
  Select,
  Sidebar,
  StatsCard,
  StatsGrid,
  Textarea,
} from "./Dashboard.styles";

interface User {
  username: string;
  password: string;
}

type ModalItem = Experience | Project | Skill | Testimonial;

const categoryTranslations: { [key: string]: string } = {
  Frontend: "Frontend",
  Backend: "Backend",
  "Base de données": "Databases",
  "Outils & DevOps": "Tools & DevOps",
  Test: "Testing",
  Méthodologies: "Methodologies",
  Cloud: "Cloud",
  Mobile: "Mobile",
  CMS: "CMS",
  Autre: "Other",
};

// Mapping complet des icônes disponibles
const availableIcons = iconNameMap;

// Catégories disponibles
const availableCategories = Object.keys(categoryTranslations);

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<User>({ username: "", password: "" });
  const [activeSection, setActiveSection] = useState("analytics");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editingItem, setEditingItem] = useState<ModalItem | null>(null);
  const [tempItem, setTempItem] = useState<ModalItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvUrl, setCvUrl] = useState<string>("");
  const { data, saveData } = usePortfolioData();
  const [localData, setLocalData] = useState(data); // État local pour les modifications
  const {
    analytics,
    loading: analyticsLoading,
    error: analyticsError,
    refreshAnalytics,
  } = useAnalytics();

  useEffect(() => {
    // Synchroniser l'état local lorsque les données initiales sont chargées
    if (data) {
      setLocalData(data);
    }
  }, [data]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth-check.mjs");
        const data = await res.json();
        setIsAuthenticated(data.isAuthenticated);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/login.mjs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsAuthenticated(true);
        toast.success("Connexion réussie ! Bienvenue dans le dashboard.");
      } else {
        toast.error(data.message || "Échec de la connexion.");
      }
    } catch {
      toast.error(
        "Erreur de communication avec le serveur. Veuillez réessayer."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/logout.mjs", { method: "POST" });
      setIsAuthenticated(false);
      toast.success("Déconnexion réussie !");
    } catch {
      toast.error("Erreur lors de la déconnexion.");
    }
  };

  const openModal = (type: string, item?: ModalItem) => {
    setModalType(type);
    setEditingItem(item || null);
    setTempItem(item ? { ...item } : getDefaultItem(type));
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setTempItem(null);
  };

  const handleItemChange = (field: string, value: string | string[]) => {
    setTempItem((prev) => {
      if (!prev) return null;
      // Special handling for category to update both FR and EN versions
      if (field === "category") {
        const categoryValue = value as string;
        const categoryEn = categoryTranslations[categoryValue] || categoryValue;
        return { ...prev, [field]: categoryValue, categoryEn };
      }
      return { ...prev, [field]: value };
    });
  };

  const getDefaultItem = (type: string): ModalItem => {
    switch (type) {
      case "experience":
        return {
          id: Date.now().toString(),
          title: "",
          titleEn: "",
          company: "",
          companyEn: "",
          period: "",
          description: "",
          descriptionEn: "",
          type: "work",
        };
      case "project":
        return {
          id: Date.now().toString(),
          title: "",
          titleEn: "",
          description: "",
          descriptionEn: "",
          technologies: [],
          image: "",
          link: "",
          github: "",
        };
      case "skill":
        return {
          id: Date.now().toString(),
          name: "",
          nameEn: "",
          category: "",
          categoryEn: "",
          icon: "SiReact",
        };
      case "testimonial":
        return {
          id: Date.now().toString(),
          text: "",
          textEn: "",
          author: "",
          title: "",
          titleEn: "",
          image: "",
        };
      default:
        return {
          id: Date.now().toString(),
          title: "",
          titleEn: "",
          company: "",
          companyEn: "",
          period: "",
          description: "",
          descriptionEn: "",
          type: "work",
        };
    }
  };

  const saveModalItem = async () => {
    if (!tempItem) return;

    setIsLoading(true);
    try {
      const newData = { ...data };

      switch (modalType) {
        case "experience": {
          const experienceItem = tempItem as Experience;
          if (editingItem) {
            newData.experiences = newData.experiences.map((exp: Experience) =>
              exp.id === editingItem.id ? experienceItem : exp
            );
            toast.success("Expérience modifiée avec succès !");
          } else {
            newData.experiences = [...newData.experiences, experienceItem];
            toast.success("Expérience ajoutée avec succès !");
          }
          break;
        }
        case "project": {
          const projectItem = tempItem as Project;
          if (editingItem) {
            newData.projects = newData.projects.map((proj: Project) =>
              proj.id === editingItem.id ? projectItem : proj
            );
            toast.success("Projet modifié avec succès !");
          } else {
            newData.projects = [...newData.projects, projectItem];
            toast.success("Projet ajouté avec succès !");
          }
          break;
        }
        case "skill": {
          const skillItem = tempItem as Skill;
          if (editingItem) {
            newData.skills = newData.skills.map((skill: Skill) =>
              skill.id === editingItem.id ? skillItem : skill
            );
            toast.success("Compétence modifiée avec succès !");
          } else {
            newData.skills = [...newData.skills, skillItem];
            toast.success("Compétence ajoutée avec succès !");
          }
          break;
        }
        case "testimonial": {
          const testimonialItem = tempItem as Testimonial;
          if (editingItem) {
            newData.testimonials = newData.testimonials.map(
              (test: Testimonial) =>
                test.id === editingItem.id ? testimonialItem : test
            );
            toast.success("Témoignage modifié avec succès !");
          } else {
            newData.testimonials = [...newData.testimonials, testimonialItem];
            toast.success("Témoignage ajouté avec succès !");
          }
          break;
        }
      }

      await saveData(newData);
      closeModal();
    } catch (error) {
      toast.error("Erreur lors de la sauvegarde. Veuillez réessayer.");
      console.error("Erreur de sauvegarde:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteItem = async (type: string, id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) return;

    setIsLoading(true);
    try {
      const newData = { ...data };

      switch (type) {
        case "experience":
          newData.experiences = newData.experiences.filter(
            (exp) => exp.id !== id
          );
          toast.success("Expérience supprimée avec succès !");
          break;
        case "project":
          newData.projects = newData.projects.filter((proj) => proj.id !== id);
          toast.success("Projet supprimé avec succès !");
          break;
        case "skill":
          newData.skills = newData.skills.filter((skill) => skill.id !== id);
          toast.success("Compétence supprimée avec succès !");
          break;
        case "testimonial":
          newData.testimonials = newData.testimonials.filter(
            (test) => test.id !== id
          );
          toast.success("Témoignage supprimé avec succès !");
          break;
      }

      await saveData(newData);
    } catch (error) {
      toast.error("Erreur lors de la suppression. Veuillez réessayer.");
      console.error("Erreur de suppression:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addExperience = () => openModal("experience");
  const addProject = () => openModal("project");
  const addSkill = () => openModal("skill");
  const addTestimonial = () => openModal("testimonial");

  // Met à jour uniquement l'état local, sans sauvegarder
  const updatePersonalInfo = (field: string, value: string) => {
    setLocalData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  // Met à jour uniquement l'état local, sans sauvegarder
  const updateSocialLinks = (field: string, value: string) => {
    setLocalData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await saveData(localData); // Sauvegarde l'état local "brouillon"
      toast.success("Données sauvegardées avec succès !");
    } catch (error) {
      toast.error("Erreur lors de la sauvegarde. Veuillez réessayer.");
      console.error("Erreur de sauvegarde:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchCvUrl = async () => {
      try {
        const response = await fetch("/api/cv");
        if (response.ok) {
          const data = await response.json();
          setCvUrl(data.url);
        }
      } catch {
        console.error("Erreur lors de la récupération de l'URL du CV.");
      }
    };
    fetchCvUrl();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleCvUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!cvFile) {
      alert("Veuillez sélectionner un fichier.");
      return;
    }

    setIsLoading(true);

    const toBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    try {
      const base64 = await toBase64(cvFile);
      const response = await fetch("/api/cv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ file: base64 }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Échec du téléversement du CV.");
      }

      const { url } = await response.json();
      setCvUrl(url);
      toast.success("CV téléversé avec succès !");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Une erreur inconnue est survenue.";
      console.error(error);
      alert(`Erreur: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "visit":
        return <FaEye />;
      case "download":
        return <FaDownload />;
      case "contact":
        return <FaEnvelope />;
      default:
        return <FaCircle />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "visit":
        return "#10B981";
      case "download":
        return "#3B82F6";
      case "contact":
        return "#F59E0B";
      default:
        return "#6B7280";
    }
  };

  const fixCategoryTranslations = async () => {
    if (!localData) {
      toast.error("Les données ne sont pas encore chargées.");
      return;
    }

    toast.loading("Mise à jour des traductions...", {
      id: "fixing-translations",
    });

    const updatedSkills = localData.skills.map((skill) => {
      const categoryEn = categoryTranslations[skill.category] || skill.category;
      return { ...skill, categoryEn };
    });

    const newData = { ...localData, skills: updatedSkills };

    setLocalData(newData);
    await saveData(newData);

    toast.success("Les traductions de catégories ont été corrigées !", {
      id: "fixing-translations",
    });
  };

  if (isAuthenticated === null) {
    return (
      <ThemeProvider theme={currentTheme}>
        <GlobalDashboardStyle />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <LoadingSpinner />
        </div>
      </ThemeProvider>
    );
  }

  if (!isAuthenticated) {
    return (
      <ThemeProvider theme={currentTheme}>
        <GlobalDashboardStyle />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background:
                currentTheme.body === "#0F172A" ? "#1E293B" : "#FFFFFF",
              color: currentTheme.text,
              borderRadius: "16px",
              padding: "20px",
              border: `1px solid ${currentTheme.cardBorder}`,
              boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
            },
            success: {
              iconTheme: {
                primary: "#FFB400",
                secondary: "#0F172A",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#FFFFFF",
              },
            },
          }}
        />

        <DashboardContainer>
          <LoginForm onSubmit={handleLogin}>
            <h2>Connexion Admin</h2>
            <div className="form-group">
              <label>
                <FaUser style={{ marginRight: "0.5rem" }} />
                Nom d'utilisateur
              </label>
              <input
                type="text"
                placeholder="Entrez votre nom d'utilisateur"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>
                <FaLock style={{ marginRight: "0.5rem" }} />
                Mot de passe
              </label>
              <input
                type="password"
                placeholder="Entrez votre mot de passe"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <FaSignInAlt />
                  Se connecter
                </>
              )}
            </button>

            <div
              style={{
                marginTop: "2rem",
                textAlign: "center",
                padding: "1rem",
                background: "rgba(255, 180, 0, 0.1)",
                borderRadius: "12px",
                border: "1px dashed rgba(255, 180, 0, 0.3)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "0.9rem",
                  color: currentTheme.iconColor,
                  fontWeight: "500",
                }}
              >
                <strong>Identifiants de test :</strong>
                <br />
                Utilisateur: <code style={{ color: "#FFB400" }}>admin</code>
                <br />
                Mot de passe: <code style={{ color: "#FFB400" }}>admin123</code>
              </p>
            </div>
          </LoginForm>
        </DashboardContainer>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalDashboardStyle />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
            borderRadius: "12px",
            padding: "16px",
          },
          success: {
            iconTheme: {
              primary: "#27ae60",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#e74c3c",
              secondary: "#fff",
            },
          },
        }}
      />

      <HeaderSection>
        <h1>Dashboard Portfolio</h1>
        <div className="header-actions">
          <Button
            onClick={handleThemeToggle}
            style={{ padding: "0.75rem 1rem", fontSize: "0.9rem" }}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
            {isDarkMode ? " Mode Clair" : " Mode Sombre"}
          </Button>
          <Button
            onClick={handleLogout}
            style={{ padding: "0.75rem 1rem", fontSize: "0.9rem" }}
          >
            <FaSignOutAlt /> Déconnexion
          </Button>
        </div>
      </HeaderSection>

      <DashboardContainer>
        <Sidebar>
          <button
            className={activeSection === "analytics" ? "active" : ""}
            onClick={() => handleSectionChange("analytics")}
          >
            <FaChartLine /> Analytics
          </button>
          <button
            className={activeSection === "personal" ? "active" : ""}
            onClick={() => handleSectionChange("personal")}
          >
            <FaUser /> Informations Personnelles
          </button>
          <button
            className={activeSection === "social" ? "active" : ""}
            onClick={() => handleSectionChange("social")}
          >
            <FaLink /> Liens Sociaux
          </button>
          <button
            className={activeSection === "experiences" ? "active" : ""}
            onClick={() => handleSectionChange("experiences")}
          >
            <FaBriefcase /> Expériences
          </button>
          <button
            className={activeSection === "projects" ? "active" : ""}
            onClick={() => handleSectionChange("projects")}
          >
            <FaProjectDiagram /> Projets
          </button>
          <button
            className={activeSection === "skills" ? "active" : ""}
            onClick={() => handleSectionChange("skills")}
          >
            <FaLightbulb /> Compétences
          </button>
          <button
            className={activeSection === "testimonials" ? "active" : ""}
            onClick={() => handleSectionChange("testimonials")}
          >
            <FaComment /> Témoignages
          </button>
          <button
            className={activeSection === "cv" ? "active" : ""}
            onClick={() => handleSectionChange("cv")}
          >
            <FaFilePdf /> Gestion du CV
          </button>
          <button
            className={activeSection === "theme" ? "active" : ""}
            onClick={() => handleSectionChange("theme")}
          >
            <FaPalette /> Thème et Fond d'écran
          </button>
          <button
            className={activeSection === "settings" ? "active" : ""}
            onClick={() => handleSectionChange("settings")}
          >
            <FaWrench /> Paramètres
          </button>
        </Sidebar>

        <MainContent>
          {activeSection === "analytics" && (
            <>
              {/* Section Statistiques */}
              <Section>
                <h2>
                  <FaTachometerAlt /> Vue d'ensemble
                </h2>
                <StatsGrid>
                  <StatsCard>
                    <div className="stat-number">{data.experiences.length}</div>
                    <div className="stat-label">Expériences</div>
                  </StatsCard>
                  <StatsCard>
                    <div className="stat-number">{data.projects.length}</div>
                    <div className="stat-label">Projets</div>
                  </StatsCard>
                  <StatsCard>
                    <div className="stat-number">{data.skills.length}</div>
                    <div className="stat-label">Compétences</div>
                  </StatsCard>
                  <StatsCard>
                    <div className="stat-number">
                      {data.testimonials.length}
                    </div>
                    <div className="stat-label">Témoignages</div>
                  </StatsCard>
                </StatsGrid>
              </Section>

              {/* Section Analytics Avancées */}
              <Section>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "2rem",
                  }}
                >
                  <h2>
                    <FaChartLine /> Analytics & Performance
                  </h2>
                  <Button
                    onClick={refreshAnalytics}
                    disabled={analyticsLoading}
                    style={{ padding: "0.75rem 1.5rem", fontSize: "0.9rem" }}
                  >
                    {analyticsLoading ? <LoadingSpinner /> : <FaSync />}
                    {analyticsLoading ? " Actualisation..." : " Actualiser"}
                  </Button>
                </div>

                {analyticsError && (
                  <div
                    style={{
                      padding: "1rem",
                      background: "rgba(239, 68, 68, 0.1)",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      borderRadius: "12px",
                      marginBottom: "2rem",
                      color: "#ef4444",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <FaExclamationTriangle />
                    Erreur: {analyticsError}
                  </div>
                )}

                {analyticsLoading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "3rem",
                      background: "rgba(255, 180, 0, 0.05)",
                      borderRadius: "16px",
                      border: "1px dashed rgba(255, 180, 0, 0.3)",
                    }}
                  >
                    <LoadingSpinner />
                    <span
                      style={{
                        marginLeft: "1rem",
                        color: currentTheme.iconColor,
                      }}
                    >
                      Chargement des analytics...
                    </span>
                  </div>
                ) : (
                  <>
                    <StatsGrid>
                      <StatsCard>
                        <div className="stat-number">
                          {formatNumber(analytics.totalVisits)}
                        </div>
                        <div className="stat-label">Visites Totales</div>
                      </StatsCard>
                      <StatsCard>
                        <div className="stat-number">
                          {formatNumber(analytics.uniqueVisitors)}
                        </div>
                        <div className="stat-label">Visiteurs Uniques</div>
                      </StatsCard>
                      <StatsCard>
                        <div className="stat-number">
                          {formatNumber(analytics.pageViews)}
                        </div>
                        <div className="stat-label">Pages Vues</div>
                      </StatsCard>
                      <StatsCard>
                        <div className="stat-number">
                          {formatNumber(analytics.cvDownloads)}
                        </div>
                        <div className="stat-label">Téléchargements CV</div>
                      </StatsCard>
                    </StatsGrid>

                    <Grid>
                      {/* Métriques de Performance */}
                      <Card>
                        <h3
                          style={{
                            fontSize: "1.5rem",
                            fontWeight: "700",
                            marginBottom: "1.5rem",
                            background:
                              "linear-gradient(135deg, #FFB400 0%, #FF8C00 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          <FaTachometerAlt style={{ marginRight: "0.5rem" }} />
                          Métriques de Performance
                        </h3>
                        <div style={{ display: "grid", gap: "1rem" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "1rem",
                              background: "rgba(255, 180, 0, 0.05)",
                              borderRadius: "12px",
                              border: "1px solid rgba(255, 180, 0, 0.1)",
                            }}
                          >
                            <span style={{ fontWeight: "600" }}>
                              Temps de Session Moyen
                            </span>
                            <span
                              style={{
                                color: "#FFB400",
                                fontWeight: "700",
                                fontSize: "1.1rem",
                              }}
                            >
                              {formatTime(analytics.averageSessionTime)}
                            </span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "1rem",
                              background: "rgba(239, 68, 68, 0.05)",
                              borderRadius: "12px",
                              border: "1px solid rgba(239, 68, 68, 0.1)",
                            }}
                          >
                            <span style={{ fontWeight: "600" }}>
                              Taux de Rebond
                            </span>
                            <span
                              style={{
                                color: "#ef4444",
                                fontWeight: "700",
                                fontSize: "1.1rem",
                              }}
                            >
                              {analytics.bounceRate.toFixed(1)}%
                            </span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "1rem",
                              background: "rgba(59, 130, 246, 0.05)",
                              borderRadius: "12px",
                              border: "1px solid rgba(59, 130, 246, 0.1)",
                            }}
                          >
                            <span style={{ fontWeight: "600" }}>
                              Clics Contact
                            </span>
                            <span
                              style={{
                                color: "#3B82F6",
                                fontWeight: "700",
                                fontSize: "1.1rem",
                              }}
                            >
                              {formatNumber(analytics.contactClicks)}
                            </span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "1rem",
                              background: "rgba(16, 185, 129, 0.05)",
                              borderRadius: "12px",
                              border: "1px solid rgba(16, 185, 129, 0.1)",
                            }}
                          >
                            <span style={{ fontWeight: "600" }}>
                              Vues de Projets
                            </span>
                            <span
                              style={{
                                color: "#10B981",
                                fontWeight: "700",
                                fontSize: "1.1rem",
                              }}
                            >
                              {formatNumber(analytics.projectViews)}
                            </span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "1rem",
                              background: "rgba(168, 85, 247, 0.05)",
                              borderRadius: "12px",
                              border: "1px solid rgba(168, 85, 247, 0.1)",
                            }}
                          >
                            <span style={{ fontWeight: "600" }}>
                              Sessions Actives
                            </span>
                            <span
                              style={{
                                color: "#A855F7",
                                fontWeight: "700",
                                fontSize: "1.1rem",
                              }}
                            >
                              {analytics.activeSessions}
                            </span>
                          </div>
                        </div>
                      </Card>

                      {/* Pages les Plus Populaires */}
                      <Card>
                        <h3
                          style={{
                            fontSize: "1.5rem",
                            fontWeight: "700",
                            marginBottom: "1.5rem",
                            background:
                              "linear-gradient(135deg, #FFB400 0%, #FF8C00 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          <FaStar style={{ marginRight: "0.5rem" }} />
                          Pages Populaires
                        </h3>
                        <div style={{ display: "grid", gap: "1rem" }}>
                          {analytics.topPages.length > 0 ? (
                            analytics.topPages.map((page, index) => (
                              <div
                                key={index}
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "1rem",
                                  background: `rgba(255, 180, 0, ${
                                    0.05 + index * 0.02
                                  })`,
                                  borderRadius: "12px",
                                  border: "1px solid rgba(255, 180, 0, 0.1)",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "1.2rem",
                                      color: "#FFB400",
                                      fontWeight: "700",
                                    }}
                                  >
                                    #{index + 1}
                                  </span>
                                  <span style={{ fontWeight: "600" }}>
                                    {page.name}
                                  </span>
                                </div>
                                <span
                                  style={{
                                    color: "#FFB400",
                                    fontWeight: "700",
                                    fontSize: "1.1rem",
                                  }}
                                >
                                  {formatNumber(page.views)}
                                </span>
                              </div>
                            ))
                          ) : (
                            <div
                              style={{
                                padding: "2rem",
                                textAlign: "center",
                                color: currentTheme.iconColor,
                                fontStyle: "italic",
                              }}
                            >
                              Aucune donnée de pages disponibles
                            </div>
                          )}
                        </div>
                      </Card>

                      {/* Activité Récente */}
                      <Card>
                        <h3
                          style={{
                            fontSize: "1.5rem",
                            fontWeight: "700",
                            marginBottom: "1.5rem",
                            background:
                              "linear-gradient(135deg, #FFB400 0%, #FF8C00 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          <FaClock style={{ marginRight: "0.5rem" }} />
                          Activité Récente
                        </h3>
                        <div style={{ display: "grid", gap: "1rem" }}>
                          {analytics.recentActivity.length > 0 ? (
                            analytics.recentActivity.map((activity, index) => (
                              <div
                                key={index}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "1rem",
                                  padding: "1rem",
                                  background: "rgba(255, 180, 0, 0.05)",
                                  borderRadius: "12px",
                                  border: "1px solid rgba(255, 180, 0, 0.1)",
                                }}
                              >
                                <div
                                  style={{
                                    color: getActivityColor(activity.type),
                                    fontSize: "1.2rem",
                                  }}
                                >
                                  {getActivityIcon(activity.type)}
                                </div>
                                <div style={{ flex: 1 }}>
                                  <div
                                    style={{
                                      fontWeight: "600",
                                      marginBottom: "0.25rem",
                                    }}
                                  >
                                    {activity.type === "visit" &&
                                      `Visite de la page ${activity.page}`}
                                    {activity.type === "download" &&
                                      `Téléchargement du ${activity.file}`}
                                    {activity.type === "contact" &&
                                      `Contact via ${activity.action}`}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: "0.9rem",
                                      color: currentTheme.iconColor,
                                    }}
                                  >
                                    {activity.time.toLocaleTimeString("fr-FR", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div
                              style={{
                                padding: "2rem",
                                textAlign: "center",
                                color: currentTheme.iconColor,
                                fontStyle: "italic",
                              }}
                            >
                              Aucune activité récente
                            </div>
                          )}
                        </div>
                      </Card>
                    </Grid>
                  </>
                )}
              </Section>
            </>
          )}
          {/* Section Statistiques */}

          {/* Section Analytics Avancées */}

          {/* Section Informations Personnelles */}
          {activeSection === "personal" && localData && (
            <Section>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "2rem",
                }}
              >
                <h2>
                  <FaUser /> Informations Personnelles
                </h2>
                <Button onClick={handleSave}>
                  {isLoading ? <LoadingSpinner /> : <FaSave />}
                  Sauvegarder
                </Button>
              </div>
              <Grid>
                <FormGroup>
                  <label>Nom</label>
                  <Input
                    type="text"
                    value={localData.personalInfo.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updatePersonalInfo("name", e.target.value)
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <label>Titre (Français)</label>
                  <Input
                    type="text"
                    value={localData.personalInfo.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updatePersonalInfo("title", e.target.value)
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <label>Titre (English)</label>
                  <Input
                    type="text"
                    value={localData.personalInfo.titleEn}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updatePersonalInfo("titleEn", e.target.value)
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <label>Email</label>
                  <Input
                    type="email"
                    value={localData.personalInfo.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updatePersonalInfo("email", e.target.value)
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <label>Téléphone</label>
                  <Input
                    type="text"
                    value={localData.personalInfo.phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updatePersonalInfo("phone", e.target.value)
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <label>Localisation (Français)</label>
                  <Input
                    type="text"
                    value={localData.personalInfo.location}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updatePersonalInfo("location", e.target.value)
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <label>Localisation (English)</label>
                  <Input
                    type="text"
                    value={localData.personalInfo.locationEn}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updatePersonalInfo("locationEn", e.target.value)
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="avatarUrl">Avatar URL</label>
                  <Input
                    id="avatarUrl"
                    type="text"
                    value={localData.personalInfo.avatar}
                    onChange={(e) =>
                      updatePersonalInfo("avatar", e.target.value)
                    }
                  />
                </FormGroup>

                <FullWidthItem>
                  <FormGroup>
                    <label htmlFor="aboutFr">À propos (Français)</label>
                    <Textarea
                      id="aboutFr"
                      value={localData.personalInfo.about}
                      onChange={(e) =>
                        updatePersonalInfo("about", e.target.value)
                      }
                      rows={5}
                    />
                  </FormGroup>
                </FullWidthItem>

                <FullWidthItem>
                  <FormGroup>
                    <label htmlFor="aboutEn">À propos (English)</label>
                    <Textarea
                      id="aboutEn"
                      value={localData.personalInfo.aboutEn}
                      onChange={(e) =>
                        updatePersonalInfo("aboutEn", e.target.value)
                      }
                      rows={5}
                    />
                  </FormGroup>
                </FullWidthItem>
              </Grid>
            </Section>
          )}

          {activeSection === "experiences" && (
            <Section>
              <h2>
                <FaEdit /> Gestion des Expériences
              </h2>
              <Button onClick={addExperience} style={{ marginBottom: "2rem" }}>
                <FaPlus /> Ajouter une Expérience
              </Button>
              <Grid>
                {data.experiences.map((experience) => (
                  <Card key={experience.id}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <h3
                          style={{
                            fontSize: "1.4rem",
                            fontWeight: "700",
                            marginBottom: "0.5rem",
                            background:
                              "linear-gradient(135deg, #ffb400 0%, #ff8c00 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          {experience.title}
                        </h3>
                        <div
                          style={{
                            fontSize: "1.1rem",
                            fontWeight: "600",
                            color: "#666",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {experience.company}
                        </div>
                        <Badge
                          style={{
                            fontSize: "0.9rem",
                            padding: "0.5rem 1rem",
                            background:
                              experience.type === "work"
                                ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
                                : "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
                          }}
                        >
                          {experience.type === "work" ? "Travail" : "Formation"}
                        </Badge>
                      </div>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <ActionButton
                          onClick={() => openModal("experience", experience)}
                          title="Modifier"
                        >
                          <FaEdit />
                        </ActionButton>
                        <ActionButton
                          className="delete"
                          onClick={() =>
                            deleteItem("experience", experience.id)
                          }
                          title="Supprimer"
                        >
                          <FaTrash />
                        </ActionButton>
                      </div>
                    </div>
                    <div
                      style={{
                        padding: "1.5rem",
                        background: "rgba(255, 180, 0, 0.05)",
                        borderRadius: "12px",
                        border: "1px dashed rgba(255, 180, 0, 0.3)",
                        marginBottom: "1rem",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.9rem",
                          color: "#666",
                          marginBottom: "0.75rem",
                        }}
                      >
                        <strong>Période:</strong> {experience.period}
                      </div>
                      <div
                        style={{
                          fontSize: "1rem",
                          lineHeight: "1.6",
                          color: "#333",
                        }}
                      >
                        {experience.description}
                      </div>
                    </div>
                    <div
                      style={{
                        padding: "1rem",
                        background: "rgba(59, 130, 246, 0.05)",
                        borderRadius: "12px",
                        border: "1px dashed rgba(59, 130, 246, 0.3)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.9rem",
                          color: "#666",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <strong>Version anglaise:</strong>
                      </div>
                      <div
                        style={{
                          fontSize: "1rem",
                          fontWeight: "600",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {experience.titleEn} - {experience.companyEn}
                      </div>
                      <div
                        style={{
                          fontSize: "0.95rem",
                          lineHeight: "1.5",
                          color: "#333",
                        }}
                      >
                        {experience.descriptionEn}
                      </div>
                    </div>
                  </Card>
                ))}
              </Grid>
            </Section>
          )}

          {activeSection === "projects" && (
            <Section>
              <h2>
                <FaEdit /> Gestion des Projets
              </h2>
              <Button onClick={addProject} style={{ marginBottom: "2rem" }}>
                <FaPlus /> Ajouter un Projet
              </Button>
              <Grid>
                {data.projects.map((project) => (
                  <Card key={project.id}>
                    <div style={{ position: "relative", marginBottom: "1rem" }}>
                      <img
                        src={
                          project.image ||
                          "https://picsum.photos/400/250?random=1"
                        }
                        alt={project.title}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "12px",
                          marginBottom: "1rem",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "0.5rem",
                          right: "0.5rem",
                          display: "flex",
                          gap: "0.5rem",
                        }}
                      >
                        <ActionButton
                          onClick={() => openModal("project", project)}
                          title="Modifier"
                        >
                          <FaEdit />
                        </ActionButton>
                        <ActionButton
                          className="delete"
                          onClick={() => deleteItem("project", project.id)}
                          title="Supprimer"
                        >
                          <FaTrash />
                        </ActionButton>
                      </div>
                    </div>
                    <h3
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: "700",
                        marginBottom: "0.5rem",
                        background:
                          "linear-gradient(135deg, #ffb400 0%, #ff8c00 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {project.title}
                    </h3>
                    <p
                      style={{
                        color: "#666",
                        marginBottom: "1rem",
                        lineHeight: "1.5",
                        fontSize: "0.95rem",
                      }}
                    >
                      {project.description}
                    </p>
                    <div style={{ marginBottom: "1rem" }}>
                      {project.technologies
                        .slice(0, 3)
                        .map((tech: string, index: number) => (
                          <Badge key={index}>{tech}</Badge>
                        ))}
                      {project.technologies.length > 3 && (
                        <Badge>+{project.technologies.length - 3}</Badge>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                      }}
                    >
                      {project.link && (
                        <ActionButton
                          onClick={() => window.open(project.link, "_blank")}
                          style={{
                            fontSize: "0.8rem",
                            padding: "0.5rem 0.75rem",
                          }}
                        >
                          <FaExternalLinkAlt /> Voir
                        </ActionButton>
                      )}
                      {project.github && (
                        <ActionButton
                          onClick={() => window.open(project.github, "_blank")}
                          style={{
                            fontSize: "0.8rem",
                            padding: "0.5rem 0.75rem",
                          }}
                        >
                          <FaGithub /> GitHub
                        </ActionButton>
                      )}
                    </div>
                  </Card>
                ))}
              </Grid>
            </Section>
          )}

          {activeSection === "skills" && (
            <Section>
              <h2>
                <FaEdit /> Gestion des Compétences
              </h2>
              <Button onClick={addSkill} style={{ marginBottom: "2rem" }}>
                <FaPlus /> Ajouter une Compétence
              </Button>
              <Grid>
                {data.skills.map((skill) => (
                  <Card key={skill.id}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          flex: 1,
                        }}
                      >
                        <div
                          style={{
                            width: "60px",
                            height: "60px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background:
                              "linear-gradient(135deg, rgba(255, 180, 0, 0.1) 0%, rgba(255, 140, 0, 0.05) 100%)",
                            borderRadius: "16px",
                            border: "2px solid rgba(255, 180, 0, 0.2)",
                            fontSize: "2rem",
                            color: "#ffb400",
                          }}
                        >
                          {iconComponents[
                            skill.icon as keyof typeof iconComponents
                          ] || <FaReact />}
                        </div>
                        <div>
                          <h3
                            style={{
                              fontSize: "1.2rem",
                              fontWeight: "700",
                              marginBottom: "0.25rem",
                              background:
                                "linear-gradient(135deg, #ffb400 0%, #ff8c00 100%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                            }}
                          >
                            {skill.name}
                          </h3>
                          <Badge
                            style={{
                              fontSize: "0.8rem",
                              padding: "0.25rem 0.75rem",
                            }}
                          >
                            {skill.category}
                          </Badge>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <ActionButton
                          onClick={() => openModal("skill", skill)}
                          title="Modifier"
                        >
                          <FaEdit />
                        </ActionButton>
                        <ActionButton
                          className="delete"
                          onClick={() => deleteItem("skill", skill.id)}
                          title="Supprimer"
                        >
                          <FaTrash />
                        </ActionButton>
                      </div>
                    </div>
                    <div
                      style={{
                        padding: "1rem",
                        background: "rgba(255, 180, 0, 0.05)",
                        borderRadius: "12px",
                        border: "1px dashed rgba(255, 180, 0, 0.3)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.9rem",
                          color: "#666",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <strong>Version anglaise:</strong>
                      </div>
                      <div
                        style={{
                          fontSize: "1rem",
                          fontWeight: "600",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {skill.nameEn}
                      </div>
                      <Badge
                        style={{
                          fontSize: "0.8rem",
                          padding: "0.25rem 0.75rem",
                        }}
                      >
                        {skill.categoryEn}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </Grid>
            </Section>
          )}

          {activeSection === "testimonials" && (
            <Section>
              <h2>
                <FaEdit /> Gestion des Témoignages
              </h2>
              <Button onClick={addTestimonial} style={{ marginBottom: "2rem" }}>
                <FaPlus /> Ajouter un Témoignage
              </Button>
              <Grid>
                {data.testimonials.map((testimonial) => (
                  <Card key={testimonial.id}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "1.5rem",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <div
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "50%",
                          overflow: "hidden",
                          flexShrink: 0,
                          border: "3px solid rgba(255, 180, 0, 0.3)",
                        }}
                      >
                        <img
                          src={
                            testimonial.image ||
                            "https://i.pravatar.cc/150?u=testimonial"
                          }
                          alt={testimonial.author}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3
                          style={{
                            fontSize: "1.3rem",
                            fontWeight: "700",
                            marginBottom: "0.25rem",
                            background:
                              "linear-gradient(135deg, #ffb400 0%, #ff8c00 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          {testimonial.author}
                        </h3>
                        <div
                          style={{
                            fontSize: "1rem",
                            fontWeight: "600",
                            color: "#666",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {testimonial.title}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <ActionButton
                          onClick={() => openModal("testimonial", testimonial)}
                          title="Modifier"
                        >
                          <FaEdit />
                        </ActionButton>
                        <ActionButton
                          className="delete"
                          onClick={() =>
                            deleteItem("testimonial", testimonial.id)
                          }
                          title="Supprimer"
                        >
                          <FaTrash />
                        </ActionButton>
                      </div>
                    </div>
                    <div
                      style={{
                        padding: "1.5rem",
                        background: "rgba(255, 180, 0, 0.05)",
                        borderRadius: "12px",
                        border: "1px dashed rgba(255, 180, 0, 0.3)",
                        marginBottom: "1rem",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.9rem",
                          color: "#666",
                          marginBottom: "0.75rem",
                        }}
                      >
                        <strong>Témoignage (FR):</strong>
                      </div>
                      <div
                        style={{
                          fontSize: "1rem",
                          lineHeight: "1.6",
                          color: "#333",
                          fontStyle: "italic",
                        }}
                      >
                        "{testimonial.text}"
                      </div>
                    </div>
                    <div
                      style={{
                        padding: "1rem",
                        background: "rgba(59, 130, 246, 0.05)",
                        borderRadius: "12px",
                        border: "1px dashed rgba(59, 130, 246, 0.3)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.9rem",
                          color: "#666",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <strong>Version anglaise:</strong>
                      </div>
                      <div
                        style={{
                          fontSize: "1rem",
                          fontWeight: "600",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {testimonial.titleEn}
                      </div>
                      <div
                        style={{
                          fontSize: "0.95rem",
                          lineHeight: "1.5",
                          color: "#333",
                          fontStyle: "italic",
                        }}
                      >
                        "{testimonial.textEn}"
                      </div>
                    </div>
                  </Card>
                ))}
              </Grid>
            </Section>
          )}

          {activeSection === "cv" && (
            <Section>
              <h2>
                <FaFilePdf /> Gestion du CV
              </h2>
              <Grid>
                <FormGroup>
                  <label>CV Actuel</label>
                  {cvUrl ? (
                    <PreviewCard>
                      <a href={cvUrl} target="_blank" rel="noopener noreferrer">
                        <Button>
                          <FaDownload /> Télécharger le CV
                        </Button>
                      </a>
                    </PreviewCard>
                  ) : (
                    <p>Aucun CV téléversé.</p>
                  )}
                </FormGroup>
                <FormGroup>
                  <label>Téléverser un nouveau CV</label>
                  <form onSubmit={handleCvUpload}>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                    />
                    <button type="submit" disabled={isLoading}>
                      {isLoading
                        ? "Téléversement..."
                        : "Téléverser un nouveau CV"}
                    </button>
                  </form>
                </FormGroup>
              </Grid>
            </Section>
          )}

          {activeSection === "theme" && (
            <BackgroundSelector
              currentBackground={
                localData?.personalInfo?.backgroundKey || "default"
              }
              onSave={(key: string) => {
                if (localData?.personalInfo) {
                  const updatedData = {
                    ...localData,
                    personalInfo: {
                      ...localData.personalInfo,
                      backgroundKey: key,
                    },
                  };
                  setLocalData(updatedData);
                  saveData(updatedData);
                  toast.success(
                    `Fond d'écran "${key}" appliqué et sauvegardé !`
                  );
                }
              }}
            />
          )}

          {activeSection === "social" && localData && (
            <Section>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "2rem",
                }}
              >
                <h2>
                  <FaLink /> Liens Sociaux
                </h2>
                <Button onClick={handleSave}>
                  {isLoading ? <LoadingSpinner /> : <FaSave />}
                  Sauvegarder
                </Button>
              </div>
              <Grid>
                <FormGroup>
                  <label>
                    <FaGithub style={{ marginRight: "0.5rem" }} /> GitHub
                  </label>
                  <Input
                    type="url"
                    name="github"
                    value={localData.socialLinks.github}
                    onChange={(e) =>
                      updateSocialLinks("github", e.target.value)
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <label>
                    <FaLinkedin style={{ marginRight: "0.5rem" }} /> LinkedIn
                  </label>
                  <Input
                    type="url"
                    name="linkedin"
                    value={localData.socialLinks.linkedin}
                    onChange={(e) =>
                      updateSocialLinks("linkedin", e.target.value)
                    }
                  />
                </FormGroup>
              </Grid>
            </Section>
          )}

          {activeSection === "settings" && (
            <Section>
              <h2>
                <FaWrench /> Paramètres
              </h2>
              <Card>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    marginBottom: "1rem",
                  }}
                >
                  Maintenance des données
                </h3>
                <p
                  style={{
                    color: currentTheme.text,
                    opacity: 0.8,
                    marginBottom: "1.5rem",
                  }}
                >
                  Si les catégories de compétences ne s'affichent pas
                  correctement sur le site public (par exemple, en anglais),
                  cette action forcera leur mise à jour.
                </p>
                <Button onClick={fixCategoryTranslations}>
                  <FaSync style={{ marginRight: "0.5rem" }} />
                  Réparer les traductions de catégories
                </Button>
              </Card>
            </Section>
          )}
        </MainContent>
      </DashboardContainer>

      {showModal && (
        <Overlay onClick={closeModal}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{getModalTitle()}</h3>
              <ActionButton onClick={closeModal}>
                <FaTimes />
              </ActionButton>
            </div>
            <div className="modal-body">{renderModalForm()}</div>
            <div className="modal-footer">
              <Button onClick={closeModal} className="secondary">
                Annuler
              </Button>
              <Button onClick={saveModalItem}>
                <FaSave /> Sauvegarder
              </Button>
            </div>
          </Modal>
        </Overlay>
      )}
    </ThemeProvider>
  );

  function getModalTitle() {
    switch (modalType) {
      case "experience":
        return editingItem ? "Modifier l'expérience" : "Ajouter une expérience";
      case "project":
        return editingItem ? "Modifier le projet" : "Ajouter un projet";
      case "skill":
        return editingItem
          ? "Modifier la compétence"
          : "Ajouter une compétence";
      case "testimonial":
        return editingItem ? "Modifier le témoignage" : "Ajouter un témoignage";
      default:
        return "Modal";
    }
  }

  function renderModalForm() {
    if (!tempItem) return null;

    switch (modalType) {
      case "experience": {
        const experienceItem = tempItem as Experience;
        return (
          <Grid>
            <FormGroup>
              <label>Titre (Français)</label>
              <Input
                type="text"
                value={experienceItem.title}
                onChange={(e) =>
                  setTempItem({ ...experienceItem, title: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <label>Titre (English)</label>
              <Input
                type="text"
                value={experienceItem.titleEn}
                onChange={(e) =>
                  setTempItem({ ...experienceItem, titleEn: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <label>Entreprise (Français)</label>
              <Input
                type="text"
                value={experienceItem.company}
                onChange={(e) =>
                  setTempItem({ ...experienceItem, company: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <label>Entreprise (English)</label>
              <Input
                type="text"
                value={experienceItem.companyEn}
                onChange={(e) =>
                  setTempItem({ ...experienceItem, companyEn: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <label>Période</label>
              <Input
                type="text"
                value={experienceItem.period}
                onChange={(e) =>
                  setTempItem({ ...experienceItem, period: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <label>Type</label>
              <Select
                value={experienceItem.type}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setTempItem({ ...experienceItem, type: e.target.value })
                }
              >
                <option value="work">Travail</option>
                <option value="education">Formation</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <label>Description (Français)</label>
              <Textarea
                value={experienceItem.description}
                onChange={(e) =>
                  setTempItem({
                    ...experienceItem,
                    description: e.target.value,
                  })
                }
                rows={3}
              />
            </FormGroup>
            <FormGroup>
              <label>Description (English)</label>
              <Textarea
                value={experienceItem.descriptionEn}
                onChange={(e) =>
                  setTempItem({
                    ...experienceItem,
                    descriptionEn: e.target.value,
                  })
                }
                rows={3}
              />
            </FormGroup>
          </Grid>
        );
      }

      case "project": {
        const projectItem = tempItem as Project;
        return (
          <Grid>
            <FormGroup>
              <label>Titre (Français)</label>
              <Input
                type="text"
                value={projectItem.title}
                onChange={(e) =>
                  setTempItem({ ...projectItem, title: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <label>Titre (English)</label>
              <Input
                type="text"
                value={projectItem.titleEn}
                onChange={(e) =>
                  setTempItem({ ...projectItem, titleEn: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <label>Description (Français)</label>
              <Textarea
                value={projectItem.description}
                onChange={(e) =>
                  setTempItem({ ...projectItem, description: e.target.value })
                }
                rows={3}
              />
            </FormGroup>
            <FormGroup>
              <label>Description (English)</label>
              <Textarea
                value={projectItem.descriptionEn}
                onChange={(e) =>
                  setTempItem({ ...projectItem, descriptionEn: e.target.value })
                }
                rows={3}
              />
            </FormGroup>
            <FormGroup>
              <label>Technologies (séparées par des virgules)</label>
              <Input
                type="text"
                value={projectItem.technologies.join(", ")}
                onChange={(e) =>
                  setTempItem({
                    ...projectItem,
                    technologies: e.target.value
                      .split(",")
                      .map((tech) => tech.trim()),
                  })
                }
              />
              {projectItem.technologies.length > 0 && (
                <PreviewCard>
                  <h4>Technologies</h4>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    {projectItem.technologies.map(
                      (tech: string, index: number) => (
                        <Badge key={index}>{tech}</Badge>
                      )
                    )}
                  </div>
                </PreviewCard>
              )}
            </FormGroup>
            <FormGroup>
              <label>Image URL</label>
              <Input
                type="url"
                value={projectItem.image}
                onChange={(e) =>
                  setTempItem({ ...projectItem, image: e.target.value })
                }
              />
              {projectItem.image && (
                <PreviewCard>
                  <h4>Aperçu de l'image</h4>
                  <img
                    src={projectItem.image}
                    alt="Aperçu"
                    style={{
                      width: "100%",
                      maxWidth: "200px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginTop: "0.5rem",
                    }}
                  />
                </PreviewCard>
              )}
            </FormGroup>
            <FormGroup>
              <label>Lien du projet</label>
              <Input
                type="url"
                value={projectItem.link}
                onChange={(e) =>
                  setTempItem({ ...projectItem, link: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <label>Lien GitHub</label>
              <Input
                type="url"
                value={projectItem.github}
                onChange={(e) =>
                  setTempItem({ ...projectItem, github: e.target.value })
                }
              />
            </FormGroup>
          </Grid>
        );
      }

      case "skill": {
        return (
          <>
            <Grid>
              <FormGroup>
                <label>Nom de la compétence (FR)</label>
                <Input
                  type="text"
                  value={(tempItem as Skill)?.name || ""}
                  onChange={(e) => handleItemChange("name", e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <label>Nom de la compétence (EN)</label>
                <Input
                  type="text"
                  value={(tempItem as Skill)?.nameEn || ""}
                  onChange={(e) => handleItemChange("nameEn", e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <label>Catégorie</label>
                <Select
                  value={(tempItem as Skill)?.category || ""}
                  onChange={(e) => handleItemChange("category", e.target.value)}
                >
                  <option value="">Sélectionnez une catégorie</option>
                  {availableCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </Grid>

            <h4
              style={{
                marginTop: "2rem",
                marginBottom: "1rem",
                fontWeight: "600",
              }}
            >
              Icône de la compétence
            </h4>
            <IconGrid>
              {Object.entries(availableIcons).map(([name, iconKey]) => (
                <IconItem
                  key={name}
                  isSelected={(tempItem as Skill)?.icon === iconKey}
                  onClick={() => handleItemChange("icon", iconKey)}
                >
                  {iconComponents[iconKey as keyof typeof iconComponents]}
                  <span>{name}</span>
                </IconItem>
              ))}
            </IconGrid>
          </>
        );
      }

      case "testimonial": {
        const testimonialItem = tempItem as Testimonial;
        return (
          <Grid>
            <FormGroup>
              <label>Auteur</label>
              <Input
                type="text"
                value={testimonialItem.author}
                onChange={(e) =>
                  setTempItem({ ...testimonialItem, author: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <label>Titre (Français)</label>
              <Input
                type="text"
                value={testimonialItem.title}
                onChange={(e) =>
                  setTempItem({ ...testimonialItem, title: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <label>Titre (English)</label>
              <Input
                type="text"
                value={testimonialItem.titleEn}
                onChange={(e) =>
                  setTempItem({ ...testimonialItem, titleEn: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <label>Image URL</label>
              <Input
                type="url"
                value={testimonialItem.image}
                onChange={(e) =>
                  setTempItem({ ...testimonialItem, image: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <label>Témoignage (Français)</label>
              <Textarea
                value={testimonialItem.text}
                onChange={(e) =>
                  setTempItem({ ...testimonialItem, text: e.target.value })
                }
                rows={4}
              />
            </FormGroup>
            <FormGroup>
              <label>Témoignage (English)</label>
              <Textarea
                value={testimonialItem.textEn}
                onChange={(e) =>
                  setTempItem({ ...testimonialItem, textEn: e.target.value })
                }
                rows={4}
              />
            </FormGroup>
          </Grid>
        );
      }

      default:
        return null;
    }
  }
};

export default Dashboard;
