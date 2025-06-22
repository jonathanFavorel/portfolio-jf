import { motion, type Variants } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaReact } from "react-icons/fa";
import { availableIcons } from "../shared/icons";
import {
  CategoryTitle,
  SectionTitle,
  SkillCategoryCard,
  SkillItem,
  SkillsContainer,
  SkillsGrid,
  SkillsList,
} from "./Skills.styles";

interface Skill {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  categoryEn: string;
  icon?: string;
}

interface SkillsProps {
  skills: Skill[];
}

// Mapping des icônes avec les composants React
const iconComponents: { [key: string]: React.ReactElement } = availableIcons;

const cardVariants: Variants = {
  offscreen: {
    y: 100,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const { i18n } = useTranslation();
  const isEnglish = i18n.language === "en";

  // Grouper les compétences par catégorie
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = isEnglish ? skill.categoryEn : skill.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <SkillsContainer id="skills">
      <SectionTitle>{isEnglish ? "Skills" : "Compétences"}</SectionTitle>
      <SkillsGrid>
        {Object.entries(skillsByCategory).map(([category, skills]) => (
          <motion.div
            key={category}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
          >
            <SkillCategoryCard>
              <CategoryTitle>{category}</CategoryTitle>
              <SkillsList>
                {skills.map((skill) => (
                  <SkillItem key={skill.id}>
                    {skill.icon && iconComponents[skill.icon] ? (
                      iconComponents[skill.icon]
                    ) : (
                      <FaReact />
                    )}
                    <span>{isEnglish ? skill.nameEn : skill.name}</span>
                  </SkillItem>
                ))}
              </SkillsList>
            </SkillCategoryCard>
          </motion.div>
        ))}
      </SkillsGrid>
    </SkillsContainer>
  );
};

export default Skills;
