import { motion } from "framer-motion";
import { type DefaultTheme, styled } from "styled-components";

export const ContactContainer = styled.section`
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 0.5rem;
  }
`;

export const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background-color: ${({ theme }) => theme.accent};
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

export const ContactForm = styled(motion.form)`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: ${({ theme }) => theme.cardBackground};
  padding: 2.5rem;
  border-radius: 15px;
  border: 1px solid ${({ theme }) => theme.cardBorder};
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    border-radius: 12px;
    gap: 1.25rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
  }
`;

export const FormGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const commonInputStyles = ({ theme }: { theme: DefaultTheme }) => `
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid ${theme.cardBorder};
  background-color: ${theme.background};
  color: ${theme.text};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${theme.accent};
    box-shadow: 0 0 0 3px ${theme.accent}40;
  }

  @media (max-width: 768px) {
    padding: 0.875rem;
    padding-left: 2.5rem;
    font-size: 0.95rem;
  }
`;

export const Input = styled.input`
  ${commonInputStyles}
`;

export const TextArea = styled.textarea`
  ${commonInputStyles}
  resize: vertical;
  min-height: 120px;

  @media (max-width: 768px) {
    padding-top: 0.875rem;
    min-height: 100px;
  }
`;

export const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.accent};
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.accent}55;
  }

  @media (max-width: 768px) {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;

    &:hover {
      transform: none;
    }
  }
`;
