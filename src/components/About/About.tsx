import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";
import {
  AboutContainer,
  AboutContent,
  SectionTitle,
  TimelineContainer,
  TimelineContent,
  TimelineDate,
  TimelineDescription,
  TimelineIcon,
  TimelineInstitution,
  TimelineItem,
  TimelineTitle,
} from "./About.styles";

interface PersonalInfo {
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
}

interface Experience {
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

interface AboutProps {
  personalInfo: PersonalInfo;
  experiences: Experience[];
}

const About = ({ personalInfo, experiences }: AboutProps) => {
  const { i18n } = useTranslation();
  const isEnglish = i18n.language === "en";

  // Tri des expériences par date de début (plus récent en premier)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const yearA = parseInt(a.period.split(" ")[0], 10);
    const yearB = parseInt(b.period.split(" ")[0], 10);

    if (isNaN(yearA) || isNaN(yearB)) {
      // Gérer les cas où la période n'est pas un nombre (ex: "Présent")
      // On peut les placer en premier ou en dernier selon la préférence.
      // Ici, on les considère comme plus récents.
      if (
        a.period.toLowerCase().includes("présent") ||
        a.period.toLowerCase().includes("present")
      )
        return -1;
      if (
        b.period.toLowerCase().includes("présent") ||
        b.period.toLowerCase().includes("present")
      )
        return 1;
      return 0;
    }

    return yearB - yearA;
  });

  return (
    <AboutContainer id="about">
      <SectionTitle>À propos de moi</SectionTitle>

      <AboutContent>
        <motion.p
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          style={{ lineHeight: "1.8" }}
        >
          {isEnglish ? personalInfo.aboutEn : personalInfo.about}
        </motion.p>
      </AboutContent>

      <TimelineContainer>
        {sortedExperiences.map((experience, index) => (
          <TimelineItem key={`exp-${index}`} className={experience.type}>
            <TimelineIcon>
              {experience.type === "work" ? (
                <FaBriefcase />
              ) : (
                <FaGraduationCap />
              )}
            </TimelineIcon>
            <TimelineContent>
              <TimelineDate>{experience.period}</TimelineDate>
              <TimelineTitle>
                {isEnglish ? experience.titleEn : experience.title}
              </TimelineTitle>
              <TimelineInstitution>
                {isEnglish ? experience.companyEn : experience.company}
              </TimelineInstitution>
              <TimelineDescription>
                {isEnglish ? experience.descriptionEn : experience.description}
              </TimelineDescription>
            </TimelineContent>
          </TimelineItem>
        ))}
      </TimelineContainer>
    </AboutContainer>
  );
};

export default About;
