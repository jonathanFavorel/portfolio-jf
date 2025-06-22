import { motion, type Variants } from "framer-motion";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

import {
  ContactContainer,
  ContactForm,
  FormGroup,
  Input,
  SectionTitle,
  SubmitButton,
  TextArea,
} from "./Contact.styles";

// --- SVG Success Icon Component ---
const iconVariants = {
  hidden: { pathLength: 0 },
  visible: { pathLength: 1 },
};

const SuccessIcon = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
    viewBox="0 0 100 100"
    style={{ display: "block", margin: "0 auto" }}
  >
    <motion.circle
      cx="50"
      cy="50"
      r="48"
      stroke="#34D399"
      strokeWidth="4"
      fill="transparent"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    />
    <motion.path
      d="M30 50 L45 65 L70 35"
      stroke="#34D399"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="transparent"
      variants={iconVariants}
      initial="hidden"
      animate="visible"
      transition={{
        default: { duration: 0.7, ease: "easeInOut", delay: 0.5 },
      }}
    />
  </motion.svg>
);
// --- End of Icon Component ---

const titleVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const formVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const notification = toast.loading(t("contact_form.sending"));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("La requête a échoué.");
      }

      toast.success("Message envoyé avec succès !", { id: notification });
      setFormData({ name: "", email: "", message: "" });
      setIsSuccess(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erreur inconnue.";
      toast.error(`Erreur: ${errorMessage}`, { id: notification });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <ContactContainer id="contact">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center" }}
        >
          <SuccessIcon />
          <h3
            style={{
              color: "#34D399",
              marginTop: "1.5rem",
              fontSize: "1.5rem",
            }}
          >
            {t("contact_form.success_title")}
          </h3>
          <p
            style={{
              marginTop: "0.5rem",
              fontSize: "1.1rem",
              color: "#6B7280",
            }}
          >
            {t("contact_form.success_message")}
          </p>
        </motion.div>
      </ContactContainer>
    );
  }

  return (
    <ContactContainer id="contact">
      <SectionTitle
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {t("contact")}
      </SectionTitle>
      <ContactForm
        variants={formVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        onSubmit={handleSubmit}
      >
        <FormGroup variants={itemVariants}>
          <label htmlFor="name">{t("contact_form.name")}</label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup variants={itemVariants}>
          <label htmlFor="email">{t("contact_form.email")}</label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup variants={itemVariants}>
          <label htmlFor="message">{t("contact_form.message")}</label>
          <TextArea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <SubmitButton
          type="submit"
          disabled={isLoading}
          variants={itemVariants}
        >
          {isLoading ? t("contact_form.sending") : t("contact_form.send")}
        </SubmitButton>
      </ContactForm>
    </ContactContainer>
  );
};
