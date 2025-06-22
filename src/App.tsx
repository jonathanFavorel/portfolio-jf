import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import About from "./components/About/About";
import { Contact } from "./components/Contact/Contact";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import Dashboard from "./components/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Projects from "./components/Projects";
import Skills from "./components/Skills/Skills";
import Testimonials from "./components/Testimonials/Testimonials";
import { ThemeProvider } from "./context/ThemeContext";
import { usePortfolioData } from "./hooks/usePortfolioData";
import { useTheme } from "./hooks/useTheme";
import { GlobalStyles } from "./styles/GlobalStyles";
import { darkTheme, lightTheme } from "./styles/theme";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin" element={<Dashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

const Portfolio = () => {
  const { data, loading, error } = usePortfolioData();
  const { theme } = useTheme();
  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  if (loading) {
    return (
      <StyledThemeProvider theme={currentTheme}>
        <GlobalStyles />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            fontSize: "1.2rem",
            color: currentTheme.text,
          }}
        >
          Chargement du portfolio...
        </div>
      </StyledThemeProvider>
    );
  }

  if (error) {
    return (
      <StyledThemeProvider theme={currentTheme}>
        <GlobalStyles />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            fontSize: "1.2rem",
            color: currentTheme.text,
          }}
        >
          Erreur de chargement des données.
        </div>
      </StyledThemeProvider>
    );
  }

  return (
    <StyledThemeProvider theme={currentTheme}>
      <CustomCursor />
      <GlobalStyles />
      <Header />
      <main>
        <Home
          personalInfo={data.personalInfo}
          socialLinks={{
            github: data.socialLinks.github,
            linkedin: data.socialLinks.linkedin,
          }}
        />
        <About
          personalInfo={data.personalInfo}
          experiences={data.experiences}
        />
        <Projects projects={data.projects} />
        <Skills skills={data.skills} />
        <Testimonials testimonials={data.testimonials} />
        <Contact />
      </main>
      <Footer socialLinks={data.socialLinks} />
    </StyledThemeProvider>
  );
};

export default App;
