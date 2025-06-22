import { motion, type Variants } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaCss3Alt,
  FaHtml5,
  FaJsSquare,
  FaNodeJs,
  FaReact,
  FaVuejs,
} from "react-icons/fa";
import { SiFirebase, SiRedux, SiTypescript } from "react-icons/si";
import {
  ProjectCard,
  ProjectContent,
  ProjectDescription,
  ProjectImageContainer,
  ProjectLink,
  ProjectLinks,
  ProjectsGrid,
  ProjectsSection,
  ProjectTitle,
  SectionTitle,
  TechIconsContainer,
} from "../styles/Projects.styled";

interface Project {
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

interface ProjectsProps {
  projects: Project[];
}

const techIconMap: { [key: string]: React.ReactElement } = {
  React: <FaReact />,
  Vue: <FaVuejs />,
  HTML5: <FaHtml5 />,
  CSS3: <FaCss3Alt />,
  JavaScript: <FaJsSquare />,
  TypeScript: <SiTypescript />,
  "Node.js": <FaNodeJs />,
  Redux: <SiRedux />,
  Firebase: <SiFirebase />,
};

const titleVariants: Variants = {
  offscreen: { y: -30, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const { i18n } = useTranslation();
  const isEnglish = i18n.language === "en";

  return (
    <ProjectsSection id="projects">
      <SectionTitle
        as={motion.h2}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={titleVariants}
      >
        {isEnglish ? "Projects" : "Projets"}
      </SectionTitle>
      <ProjectsGrid>
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProjectCard>
              <ProjectImageContainer>
                <img
                  src={project.image}
                  alt={isEnglish ? project.titleEn : project.title}
                />
              </ProjectImageContainer>
              <ProjectContent>
                <ProjectTitle>
                  {isEnglish ? project.titleEn : project.title}
                </ProjectTitle>
                <ProjectDescription>
                  {isEnglish ? project.descriptionEn : project.description}
                </ProjectDescription>
                <TechIconsContainer>
                  {project.technologies.map((tech) => (
                    <span key={tech} title={tech}>
                      {techIconMap[tech] || <FaReact />}
                    </span>
                  ))}
                </TechIconsContainer>
                <ProjectLinks>
                  {project.github && (
                    <ProjectLink
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {isEnglish ? "Source Code" : "Code Source"}
                    </ProjectLink>
                  )}
                  {project.link && (
                    <ProjectLink
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {isEnglish ? "View Project" : "Voir le Projet"}
                    </ProjectLink>
                  )}
                </ProjectLinks>
              </ProjectContent>
            </ProjectCard>
          </motion.div>
        ))}
      </ProjectsGrid>
    </ProjectsSection>
  );
};

export default Projects;
