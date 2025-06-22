import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "fr",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      fr: {
        translation: {
          welcome: "Bienvenue sur le portfolio de Jonathan Favorel",
          switchLang: "English",
          switchTheme: "Thème",
          projects: "Projets",
          skills: "Compétences",
          contact: "Contact",
          testimonials: "Recommandations",
          contact_form: {
            name: "Nom",
            email: "Email",
            message: "Votre message",
            send: "Envoyer",
            sending: "Envoi en cours...",
            success_title: "Message envoyé !",
            success_message:
              "Merci de m'avoir contacté. Je vous répondrai dès que possible.",
          },
          home: {
            title: "Jonathan Favorel, Développeur Web",
            subtitle:
              "Passionné par la création d'expériences web modernes, intuitives et performantes.",
            cta: "Me contacter",
            download_cv: "Télécharger mon CV",
          },
          about: {
            title: "À Propos",
            description:
              "Développeur web full-stack avec 3 ans d'expérience, spécialisé en React et Node.js. Je transforme des concepts en applications web fluides, responsives et robustes.",
            description2:
              "Amateur de code propre et d'architecture solide, je suis toujours à la recherche de nouveaux défis pour perfectionner mes compétences et créer des produits exceptionnels.",
            educationTitle: "Formation",
            experienceTitle: "Expériences",
            timeline: {
              education: [
                {
                  date: "2020 - 2022",
                  title: "Master en Informatique",
                  institution: "Université Fictive, Paris",
                  description:
                    "Spécialisation en développement logiciel et intelligence artificielle.",
                },
              ],
              experience: [
                {
                  date: "2022 - Présent",
                  title: "Développeur Frontend",
                  institution: "Tech Solutions Inc.",
                  description:
                    "Développement et maintenance d'applications web en utilisant React et TypeScript.",
                },
              ],
            },
          },
          projects_section: {
            title: "Mes Projets",
            items: [
              {
                title: "Projet E-commerce",
                description:
                  "Une plateforme e-commerce complète avec React, Redux et Firebase.",
                image: "https://picsum.photos/400/300?random=1",
                sourceCode: "https://github.com/example/ecommerce-project",
                liveDemo: "https://ecommerce-demo.example.com",
                technologies: ["React", "Redux", "Firebase"],
              },
              {
                title: "Application de Tâches",
                description:
                  "Un gestionnaire de tâches simple et efficace avec Vue.js et localStorage.",
                image: "https://picsum.photos/400/300?random=2",
                sourceCode: "https://github.com/example/task-app",
                liveDemo: "https://task-app-demo.example.com",
                technologies: ["Vue", "JavaScript"],
              },
              {
                title: "Portfolio v1",
                description:
                  "Ma première version de portfolio, développée en HTML, CSS et JavaScript pur.",
                image: "https://picsum.photos/400/300?random=3",
                sourceCode: "https://github.com/example/portfolio-v1",
                liveDemo: "https://portfolio-v1.example.com",
                technologies: ["HTML5", "CSS3", "JavaScript"],
              },
            ],
          },
        },
      },
      en: {
        translation: {
          welcome: "Welcome to Jonathan Favorel's portfolio",
          switchLang: "Français",
          switchTheme: "Theme",
          projects: "Projects",
          skills: "Skills",
          contact: "Contact",
          testimonials: "Testimonials",
          contact_form: {
            name: "Name",
            email: "Email",
            message: "Your Message",
            send: "Send",
            sending: "Sending...",
            success_title: "Message Sent!",
            success_message:
              "Thank you for contacting me. I will get back to you as soon as possible.",
          },
          home: {
            title: "Jonathan Favorel, Web Developer",
            subtitle:
              "Passionate about creating modern, intuitive, and performant web experiences.",
            cta: "Contact Me",
            download_cv: "Download my CV",
          },
          about: {
            title: "About",
            description:
              "Full-stack web developer with 3 years of experience, specializing in React and Node.js. I transform concepts into fluid, responsive, and robust web applications.",
            description2:
              "A fan of clean code and solid architecture, I am always looking for new challenges to perfect my skills and create exceptional products.",
            educationTitle: "Education",
            experienceTitle: "Experience",
            timeline: {
              education: [
                {
                  date: "2020 - 2022",
                  title: "Master's Degree in Computer Science",
                  institution: "Fictional University, Paris",
                  description:
                    "Specialization in software development and artificial intelligence.",
                },
              ],
              experience: [
                {
                  date: "2022 - Present",
                  title: "Frontend Developer",
                  institution: "Tech Solutions Inc.",
                  description:
                    "Developing and maintaining web applications using React and TypeScript.",
                },
              ],
            },
          },
          projects_section: {
            title: "My Projects",
            items: [
              {
                title: "E-commerce Project",
                description:
                  "A complete e-commerce platform with React, Redux, and Firebase.",
                image: "https://picsum.photos/400/300?random=1",
                sourceCode: "https://github.com/example/ecommerce-project",
                liveDemo: "https://ecommerce-demo.example.com",
                technologies: ["React", "Redux", "Firebase"],
              },
              {
                title: "Task App",
                description:
                  "A simple and efficient task manager with Vue.js and localStorage.",
                image: "https://picsum.photos/400/300?random=2",
                sourceCode: "https://github.com/example/task-app",
                liveDemo: "https://task-app-demo.example.com",
                technologies: ["Vue", "JavaScript"],
              },
              {
                title: "Portfolio v1",
                description:
                  "My first portfolio version, developed in pure HTML, CSS, and JavaScript.",
                image: "https://picsum.photos/400/300?random=3",
                sourceCode: "https://github.com/example/portfolio-v1",
                liveDemo: "https://portfolio-v1.example.com",
                technologies: ["HTML5", "CSS3", "JavaScript"],
              },
            ],
          },
        },
      },
    },
  });

export default i18n;
