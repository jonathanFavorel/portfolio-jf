import { motion, type Variants } from "framer-motion";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { FaCommentDots, FaEnvelope, FaUser } from "react-icons/fa";
import {
  ContactContainer,
  Form,
  Input,
  InputGroup,
  SectionTitle,
  SubmitButton,
  TextArea,
} from "./Contact.styles";

import animationData from "../../assets/success-animation.json";

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

const formItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const notification = toast.loading("Envoi de votre message...");

    try {
      const response = await fetch("/api/contact.mjs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Une erreur est survenue.");
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
          onAnimationComplete={() => lottieRef.current?.play()}
        >
          <Lottie
            lottieRef={lottieRef}
            animationData={animationData}
            loop={false}
            autoplay={false}
            style={{ width: 150, height: 150, margin: "0 auto" }}
          />
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
        as={motion.h2}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={titleVariants}
      >
        {t("contact")}
      </SectionTitle>
      <Form
        onSubmit={handleSubmit}
        as={motion.form}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.2 }}
      >
        <motion.div variants={formItemVariants}>
          <InputGroup>
            <Input
              type="text"
              name="name"
              placeholder={t("contact_form.name")}
              value={formData.name}
              onChange={handleChange}
              required
            />
            <FaUser />
          </InputGroup>
        </motion.div>
        <motion.div variants={formItemVariants}>
          <InputGroup>
            <Input
              type="email"
              name="email"
              placeholder={t("contact_form.email")}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <FaEnvelope />
          </InputGroup>
        </motion.div>
        <motion.div variants={formItemVariants}>
          <InputGroup>
            <TextArea
              name="message"
              placeholder={t("contact_form.message")}
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
            ></TextArea>
            <FaCommentDots />
          </InputGroup>
        </motion.div>
        <motion.div variants={formItemVariants}>
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? t("contact_form.sending") : t("contact_form.send")}
          </SubmitButton>
        </motion.div>
      </Form>
    </ContactContainer>
  );
};

export default Contact;
