import { motion, type Variants } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  ButtonContainer,
  CTAButton,
  HomeContainer,
  ProfileImageContainer,
  SecondaryButton,
  SocialLinksContainer,
  Subtitle,
  Title,
  Word,
} from "./Home.styles";

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

interface HomeProps {
  personalInfo: PersonalInfo;
  socialLinks: {
    github: string;
    linkedin: string;
  };
}

const Home: React.FC<HomeProps> = ({ personalInfo, socialLinks }) => {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === "en";
  const [dynamicCvUrl, setDynamicCvUrl] = useState("");

  useEffect(() => {
    const fetchCvUrl = async () => {
      try {
        const response = await fetch("/api/cv");
        if (response.ok) {
          const data = await response.json();
          if (data.url) {
            setDynamicCvUrl(data.url);
          }
        }
      } catch (error) {
        console.error("Failed to fetch CV URL:", error);
      }
    };

    fetchCvUrl();
  }, []);

  const title = t("home.title").replace("Jonathan Favorel", personalInfo.name);
  const words = title.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const otherItemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: words.length * 0.1 },
    },
  };

  return (
    <HomeContainer id="home">
      <ProfileImageContainer
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
          delay: words.length * 0.1,
        }}
      >
        <img
          src={personalInfo.avatar}
          alt={`Photo de profil de ${personalInfo.name}`}
        />
      </ProfileImageContainer>
      <Title
        as={motion.h1}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, index) => (
          <Word key={index} variants={wordVariants}>
            {word}
          </Word>
        ))}
      </Title>
      <Subtitle
        as={motion.p}
        variants={otherItemVariants}
        initial="hidden"
        animate="visible"
      >
        {isEnglish ? personalInfo.titleEn : personalInfo.title}
      </Subtitle>

      <SocialLinksContainer
        as={motion.div}
        variants={otherItemVariants}
        initial="hidden"
        animate="visible"
      >
        <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
      </SocialLinksContainer>

      <ButtonContainer
        as={motion.div}
        variants={otherItemVariants}
        initial="hidden"
        animate="visible"
      >
        <CTAButton href="#contact">{t("home.cta")}</CTAButton>
        <SecondaryButton href={dynamicCvUrl || "/demo-cv.pdf"} download>
          {t("home.download_cv")}
        </SecondaryButton>
      </ButtonContainer>
    </HomeContainer>
  );
};

export default Home;
