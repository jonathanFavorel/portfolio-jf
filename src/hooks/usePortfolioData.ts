import { useEffect, useState } from "react";

export interface PersonalInfo {
  name: string;
  title: string;
  titleEn: string;
  email: string;
  phone: string;
  location: string;
  locationEn: string;
  about: string;
  aboutEn: string;
  avatar: string;
  cvUrl?: string;
}

export interface Experience {
  id: string;
  title: string;
  titleEn: string;
  company: string;
  companyEn: string;
  period: string;
  description: string;
  descriptionEn: string;
  type: string;
}

export interface Project {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  technologies: string[];
  image: string;
  link: string;
  github: string;
}

export interface Skill {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  categoryEn: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  text: string;
  textEn: string;
  author: string;
  title: string;
  titleEn: string;
  image: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  projects: Project[];
  skills: Skill[];
  testimonials: Testimonial[];
  socialLinks: SocialLinks;
}

const defaultData: PortfolioData = {
  personalInfo: {
    name: "Jonathan Favorel",
    title: "Développeur Full Stack",
    titleEn: "Full Stack Developer",
    email: "jonathan.favorel@example.com",
    phone: "+33 6 12 34 56 78",
    location: "Paris, France",
    locationEn: "Paris, France",
    about:
      "Développeur passionné spécialisé dans les technologies web modernes. J'aime créer des applications performantes et des expériences utilisateur exceptionnelles. Mon expertise couvre le développement frontend et backend, avec une attention particulière portée à la qualité du code et aux bonnes pratiques.",
    aboutEn:
      "Passionate developer specializing in modern web technologies. I love creating performant applications and exceptional user experiences. My expertise covers frontend and backend development, with a particular focus on code quality and best practices.",
    avatar: "https://i.pravatar.cc/150?u=jonathan",
    cvUrl: "/demo-cv.pdf",
  },
  experiences: [
    // --- Professional Experience ---
    {
      id: "work1",
      title: "Développeur Web",
      titleEn: "Web Developer",
      company: "FACIL - Saint-Amand-les-Eaux",
      companyEn: "FACIL - Saint-Amand-les-Eaux",
      period: "Février 2022 - Actuellement",
      description:
        "Développement d'applications métier sur mesure et maintenance de sites web performants avec Next.js. Cette expérience m'a permis d'affiner mes compétences techniques, d'analyser les besoins des utilisateurs et de collaborer efficacement au sein des équipes de projet pour livrer des solutions de haute qualité.",
      descriptionEn:
        "Developed custom business applications and maintained high-performance websites using Next.js. This role allowed me to refine my technical skills, analyze user needs, and collaborate effectively within project teams to deliver high-quality solutions.",
      type: "work",
    },
    {
      id: "work2",
      title: "Technicien HelpDesk",
      titleEn: "HelpDesk Technician",
      company: "Altimance - Anzin",
      companyEn: "Altimance - Anzin",
      period: "Juin 2021 - Août 2021",
      description:
        "Gestion du support technique pour trois clients majeurs (SCC, Expanscience, BEG). Responsable de la résolution rapide des incidents, de la gestion de la pression et du maintien d'une communication client claire. Développement de compétences en adaptabilité et en service client dans un environnement dynamique.",
      descriptionEn:
        "Managed technical support for three major clients (SCC, Expanscience, BEG). Responsible for rapid incident resolution, handling pressure, and maintaining clear client communication. Developed strong adaptability and customer service skills in a dynamic environment.",
      type: "work",
    },
    {
      id: "work3",
      title: "Technicien HelpDesk",
      titleEn: "HelpDesk Technician",
      company: "Modis (Crédit du nord) - Lille",
      companyEn: "Modis (Crédit du nord) - Lille",
      period: "Janvier 2021 - Avril 2021",
      description:
        "Fourniture du support technique aux conseillers du Crédit du Nord à l'échelle nationale. Développement de compétences en résolution rapide de problèmes et en travail efficace sous pression, tout en assurant la continuité des opérations pour les utilisateurs internes.",
      descriptionEn:
        "Provided nationwide technical support to Crédit du Nord advisors. Developed skills in rapid problem-solving and efficient work under pressure while ensuring operational continuity for internal users.",
      type: "work",
    },
    {
      id: "work4",
      title: "Technicien HelpDesk",
      titleEn: "HelpDesk Technician",
      company: "Ecoburotic - Rouvignies",
      companyEn: "Ecoburotic - Rouvignies",
      period: "Août 2018 - Août 2020",
      description:
        "Prise en charge du support technique pour les utilisateurs particuliers, avec une spécialisation dans la résolution de problèmes d'impression et de consommables. Développement d'une communication claire et d'une expertise technique pour garantir une résolution rapide et efficace des incidents.",
      descriptionEn:
        "Handled technical support for individual users, specializing in resolving issues related to printing and consumables. Developed clear communication and technical expertise to ensure quick and effective incident resolution.",
      type: "work",
    },
    // --- Education ---
    {
      id: "edu1",
      title: "Concepteur Développeur Nouvelles Technologies",
      titleEn: "New Technologies Software Designer & Developer",
      company: "École Supérieure d'Informatique, Paris",
      companyEn: "Graduate School of Computer Science, Paris",
      period: "Octobre 2022 - En cours",
      description:
        "Formation en alternance (BAC +3/4) axée sur la conception et le développement de logiciels. Application pratique des concepts théoriques pour la création de solutions et d'applications métiers, renforçant mes compétences techniques et ma préparation au monde professionnel.",
      descriptionEn:
        "Work-study program (Bachelor's/Master's degree level) focused on software design and development. Applied theoretical concepts to create business solutions and applications, strengthening my technical skills and professional readiness.",
      type: "education",
    },
    {
      id: "edu2",
      title: "BTS SIO option SLAM",
      titleEn: "Higher Technician's Certificate - Software Solutions",
      company: "Lycée Professionnel, Lille",
      companyEn: "Vocational High School, Lille",
      period: "Septembre 2018 - Juin 2020",
      description:
        "Obtention du BTS Services Informatiques aux Organisations, option Solutions Logicielles et Applications Métiers (SLAM). Formation en alternance alliant théorie et pratique, aboutissant à une expertise solide dans le développement d'applications et la conception de solutions logicielles.",
      descriptionEn:
        "Obtained a Higher Technician's Certificate in IT Services, specializing in Software Solutions and Business Applications (SLAM). This work-study program provided solid expertise in application development and software solution design.",
      type: "education",
    },
    {
      id: "edu3",
      title: "Baccalauréat Professionnel Technicien d'usinage",
      titleEn: "Vocational Baccalaureate - Machining Technician",
      company: "Lycée Professionnel, Valenciennes",
      companyEn: "Vocational High School, Valenciennes",
      period: "Septembre 2016 - Juin 2018",
      description:
        "Obtention du Baccalauréat Professionnel avec mention 'Bien'. Ce diplôme souligne ma rigueur, ma détermination et ma capacité à mener à bien des projets techniques avec sérieux et précision.",
      descriptionEn:
        "Earned a Vocational Baccalaureate, graduating with honors ('Mention Bien'). This achievement highlights my rigor, determination, and ability to execute technical projects with precision.",
      type: "education",
    },
  ],
  projects: [
    {
      id: "1",
      title: "Portfolio Personnel",
      titleEn: "Personal Portfolio",
      description:
        "Portfolio moderne développé avec React et TypeScript, avec un design responsive et des animations fluides.",
      descriptionEn:
        "Modern portfolio developed with React and TypeScript, with a responsive design and fluid animations.",
      technologies: ["React", "TypeScript", "Styled Components"],
      image: "https://picsum.photos/400/250?random=1",
      link: "https://portfolio.example.com",
      github: "https://github.com/jonathan/portfolio",
    },
    {
      id: "2",
      title: "E-commerce Platform",
      titleEn: "E-commerce Platform",
      description:
        "Plateforme e-commerce complète avec panier, paiements et gestion d'inventaire.",
      descriptionEn:
        "Complete e-commerce platform with shopping cart, payments, and inventory management.",
      technologies: ["React", "Node.js", "Firebase"],
      image: "https://picsum.photos/400/250?random=2",
      link: "https://ecommerce.example.com",
      github: "https://github.com/jonathan/ecommerce",
    },
    {
      id: "3",
      title: "Task Management App",
      titleEn: "Task Management App",
      description:
        "Application de gestion de tâches avec drag & drop et synchronisation en temps réel.",
      descriptionEn:
        "Task management application with drag & drop and real-time synchronization.",
      technologies: ["Vue", "JavaScript", "Firebase"],
      image: "https://picsum.photos/400/250?random=3",
      link: "https://tasks.example.com",
      github: "https://github.com/jonathan/tasks",
    },
  ],
  skills: [
    // Frontend
    {
      id: "fe1",
      name: "React",
      nameEn: "React",
      category: "Frontend",
      categoryEn: "Frontend",
      icon: "FaReact",
    },
    {
      id: "fe2",
      name: "Angular",
      nameEn: "Angular",
      category: "Frontend",
      categoryEn: "Frontend",
      icon: "FaAngular",
    },
    {
      id: "fe3",
      name: "Vue.js",
      nameEn: "Vue.js",
      category: "Frontend",
      categoryEn: "Frontend",
      icon: "FaVuejs",
    },
    {
      id: "fe4",
      name: "TypeScript",
      nameEn: "TypeScript",
      category: "Frontend",
      categoryEn: "Frontend",
      icon: "SiTypescript",
    },
    {
      id: "fe5",
      name: "JavaScript",
      nameEn: "JavaScript",
      category: "Frontend",
      categoryEn: "Frontend",
      icon: "SiJavascript",
    },
    {
      id: "fe6",
      name: "HTML5",
      nameEn: "HTML5",
      category: "Frontend",
      categoryEn: "Frontend",
      icon: "FaHtml5",
    },
    {
      id: "fe7",
      name: "CSS3",
      nameEn: "CSS3",
      category: "Frontend",
      categoryEn: "Frontend",
      icon: "FaCss3Alt",
    },
    {
      id: "fe8",
      name: "Styled-components",
      nameEn: "Styled-components",
      category: "Frontend",
      categoryEn: "Frontend",
      icon: "SiStyledcomponents",
    },
    {
      id: "fe9",
      name: "Sass",
      nameEn: "Sass",
      category: "Frontend",
      categoryEn: "Frontend",
      icon: "FaSass",
    },
    // Backend
    {
      id: "be1",
      name: "Node.js",
      nameEn: "Node.js",
      category: "Backend",
      categoryEn: "Backend",
      icon: "FaNodeJs",
    },
    {
      id: "be2",
      name: "Express.js",
      nameEn: "Express.js",
      category: "Backend",
      categoryEn: "Backend",
      icon: "SiExpress",
    },
    {
      id: "be3",
      name: "Python",
      nameEn: "Python",
      category: "Backend",
      categoryEn: "Backend",
      icon: "FaPython",
    },
    {
      id: "be4",
      name: "Django",
      nameEn: "Django",
      category: "Backend",
      categoryEn: "Backend",
      icon: "SiDjango",
    },
    {
      id: "be5",
      name: "PHP",
      nameEn: "PHP",
      category: "Backend",
      categoryEn: "Backend",
      icon: "FaPhp",
    },
    {
      id: "be6",
      name: "Laravel",
      nameEn: "Laravel",
      category: "Backend",
      categoryEn: "Backend",
      icon: "SiLaravel",
    },
    // Databases
    {
      id: "db1",
      name: "MongoDB",
      nameEn: "MongoDB",
      category: "Base de données",
      categoryEn: "Databases",
      icon: "SiMongodb",
    },
    {
      id: "db2",
      name: "MySQL",
      nameEn: "MySQL",
      category: "Base de données",
      categoryEn: "Databases",
      icon: "SiMysql",
    },
    {
      id: "db3",
      name: "PostgreSQL",
      nameEn: "PostgreSQL",
      category: "Base de données",
      categoryEn: "Databases",
      icon: "SiPostgresql",
    },
    // DevOps & Tools
    {
      id: "dt1",
      name: "Git",
      nameEn: "Git",
      category: "Outils & DevOps",
      categoryEn: "Tools & DevOps",
      icon: "FaGitAlt",
    },
    {
      id: "dt2",
      name: "Docker",
      nameEn: "Docker",
      category: "Outils & DevOps",
      categoryEn: "Tools & DevOps",
      icon: "FaDocker",
    },
    {
      id: "dt3",
      name: "Vercel",
      nameEn: "Vercel",
      category: "Outils & DevOps",
      categoryEn: "Tools & DevOps",
      icon: "SiVercel",
    },
    {
      id: "dt4",
      name: "Jest",
      nameEn: "Jest",
      category: "Test",
      categoryEn: "Testing",
      icon: "SiJest",
    },
    {
      id: "dt5",
      name: "Cypress",
      nameEn: "Cypress",
      category: "Test",
      categoryEn: "Testing",
      icon: "SiCypress",
    },
    // Methodologies
    {
      id: "me1",
      name: "Agile (Scrum)",
      nameEn: "Agile (Scrum)",
      category: "Méthodologies",
      categoryEn: "Methodologies",
      icon: "FaUsers",
    },
    {
      id: "me2",
      name: "Jira",
      nameEn: "Jira",
      category: "Méthodologies",
      categoryEn: "Methodologies",
      icon: "SiJira",
    },
  ],
  testimonials: [
    {
      id: "1",
      text: "Jonathan est un développeur incroyablement talentueux qui a transformé notre vision en réalité. Son expertise technique et sa créativité ont été essentielles pour le succès de notre projet.",
      textEn:
        "Jonathan is an incredibly talented developer who has transformed our vision into reality. His technical expertise and creativity were essential for the success of our project.",
      author: "Jane Doe",
      title: "Chef de projet, Tech Solutions Inc.",
      titleEn: "Project Manager, Tech Solutions Inc.",
      image: "https://i.pravatar.cc/150?u=jane-doe",
    },
    {
      id: "2",
      text: "Travailler avec Jonathan a été une expérience exceptionnelle. Il comprend rapidement les besoins et livre toujours des solutions de qualité supérieure.",
      textEn:
        "Working with Jonathan was an exceptional experience. He quickly understands our needs and delivers high-quality solutions every time.",
      author: "John Smith",
      title: "Directeur technique, Web Agency",
      titleEn: "Technical Director, Web Agency",
      image: "https://i.pravatar.cc/150?u=john-smith",
    },
    {
      id: "3",
      text: "Jonathan combine parfaitement expertise technique et sens du design. Ses applications sont non seulement fonctionnelles mais aussi visuellement attrayantes.",
      textEn:
        "Jonathan combines perfect technical expertise and design sense. His applications are not only functional but also visually appealing.",
      author: "Marie Dubois",
      title: "Designer UX/UI, Startup Innovation",
      titleEn: "UX/UI Designer, Startup Innovation",
      image: "https://i.pravatar.cc/150?u=marie-dubois",
    },
  ],
  socialLinks: {
    github: "https://github.com/jonathan",
    linkedin: "https://linkedin.com/in/jonathan",
    twitter: "https://twitter.com/jonathan",
  },
};

export const usePortfolioData = () => {
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour charger les données depuis l'API Vercel
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Essayer d'abord l'API Vercel
      const response = await fetch("/api/portfolio");
      if (response.ok) {
        const apiData = await response.json();
        setData(apiData);
        // Sauvegarder aussi en localStorage comme backup
        localStorage.setItem("portfolioData", JSON.stringify(apiData));
        return;
      }

      // Fallback: localStorage
      const localData = localStorage.getItem("portfolioData");
      if (localData) {
        setData(JSON.parse(localData));
      }
    } catch (err) {
      console.error("Erreur lors du chargement des données:", err);

      // Fallback: localStorage
      const localData = localStorage.getItem("portfolioData");
      if (localData) {
        setData(JSON.parse(localData));
      } else {
        setError("Impossible de charger les données");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour sauvegarder les données
  const saveData = async (newData: PortfolioData) => {
    try {
      setError(null);

      // Sauvegarder via l'API Vercel
      const response = await fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        setData(newData);
        // Sauvegarder aussi en localStorage comme backup
        localStorage.setItem("portfolioData", JSON.stringify(newData));
        return true;
      } else {
        throw new Error("Erreur lors de la sauvegarde via API");
      }
    } catch (err) {
      console.error("Erreur lors de la sauvegarde:", err);

      // Fallback: localStorage seulement
      setData(newData);
      localStorage.setItem("portfolioData", JSON.stringify(newData));
      setError("Sauvegarde locale seulement (API non disponible)");
      return false;
    }
  };

  // Charger les données au montage du composant
  useEffect(() => {
    loadData();
  }, []);

  return {
    data,
    loading,
    error,
    saveData,
    loadData,
  };
};
