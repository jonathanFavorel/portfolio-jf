import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaBars,
  FaCog,
  FaComment,
  FaEnvelope,
  FaGlobe,
  FaMoon,
  FaProjectDiagram,
  FaSun,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import { useTheme } from "../../hooks/useTheme";
import {
  Controls,
  HeaderContainer,
  LangButton,
  Logo,
  MenuToggle,
  MobileNav,
  Nav,
  ThemeButton,
} from "./Header.styles";

const navItemVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const mobileNavVariants = {
  hidden: {
    x: "100%",
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  visible: {
    x: 0,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
};

const mobileNavItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

// Header component
const Header = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = useMemo(
    () => [
      { id: "about", href: "#about", labelKey: "about.title", icon: FaUser },
      {
        id: "projects",
        href: "#projects",
        labelKey: "projects",
        icon: FaProjectDiagram,
      },
      { id: "skills", href: "#skills", labelKey: "skills", icon: FaCog },
      {
        id: "testimonials",
        href: "#testimonials",
        labelKey: "testimonials",
        icon: FaComment,
      },
      {
        id: "contact",
        href: "#contact",
        labelKey: "contact",
        icon: FaEnvelope,
      },
    ],
    []
  );

  const sectionIds = useMemo(() => navLinks.map((link) => link.id), [navLinks]);

  const activeSection = useScrollSpy(sectionIds, {
    rootMargin: "-30% 0px -70% 0px",
  });

  const switchLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest(".mobile-nav")) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <HeaderContainer isScrolled={isScrolled} isOpen={isOpen}>
      <Logo href="#">Jonathan Favorel</Logo>
      <Nav>
        {navLinks.map((link) => (
          <motion.a
            key={link.id}
            href={link.href}
            className={activeSection === link.id ? "active" : ""}
            variants={navItemVariants}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <link.icon /> {t(link.labelKey)}
          </motion.a>
        ))}
      </Nav>
      <Controls>
        <ThemeButton
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={
            theme === "light" ? "Passer en mode sombre" : "Passer en mode clair"
          }
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </ThemeButton>
        <LangButton
          onClick={() => switchLanguage(i18n.language === "fr" ? "en" : "fr")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={
            i18n.language === "fr" ? "Switch to English" : "Passer en français"
          }
        >
          <FaGlobe />
          <span>{i18n.language === "fr" ? "EN" : "FR"}</span>
        </LangButton>
        <MenuToggle onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </MenuToggle>
      </Controls>
      <AnimatePresence>
        {isOpen && (
          <MobileNav
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileNavVariants}
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.id}
                href={link.href}
                className={activeSection === link.id ? "active" : ""}
                onClick={() => setIsOpen(false)}
                variants={mobileNavItemVariants}
              >
                <link.icon /> {t(link.labelKey)}
              </motion.a>
            ))}
            <motion.div
              variants={mobileNavItemVariants}
              className="mobile-controls"
            >
              <ThemeButton
                onClick={toggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={
                  theme === "light"
                    ? "Passer en mode sombre"
                    : "Passer en mode clair"
                }
              >
                {theme === "light" ? <FaMoon /> : <FaSun />}
              </ThemeButton>
              <LangButton
                onClick={() =>
                  switchLanguage(i18n.language === "fr" ? "en" : "fr")
                }
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={
                  i18n.language === "fr"
                    ? "Switch to English"
                    : "Passer en français"
                }
              >
                <FaGlobe />
                <span>{i18n.language === "fr" ? "EN" : "FR"}</span>
              </LangButton>
            </motion.div>
          </MobileNav>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
};

export default Header;
