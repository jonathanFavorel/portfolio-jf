import { motion } from "framer-motion";
import styled from "styled-components";

export const HomeContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
  padding: 0 2rem;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 0 1rem;
    min-height: calc(100vh - 70px);
    margin-top: 70px;
  }

  @media (max-width: 480px) {
    padding: 0 0.5rem;
  }
`;

export const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.25em;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    gap: 0.2em;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    gap: 0.15em;
  }
`;

export const Word = styled(motion.span)`
  display: inline-block;
`;

export const Subtitle = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text}aa;
  margin-bottom: 2rem;
  max-width: 600px;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 1.25rem;
  }
`;

export const SocialLinksContainer = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;

  a {
    color: ${({ theme }) => theme.text};
    font-size: 2rem;
    transition: color 0.3s, transform 0.3s;

    &:hover {
      color: ${({ theme }) => theme.accent};
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
    gap: 1.2rem;
  }
`;

export const ProfileImageContainer = styled(motion.div)`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 2rem;
  border: 4px solid ${({ theme }) => theme.accent};
  box-shadow: 0 0 20px ${({ theme }) => theme.accent}77;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
    margin-bottom: 1.5rem;
    border-width: 3px;
  }

  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
    margin-bottom: 1.25rem;
  }
`;

export const CTAButton = styled.a`
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.accent};
  color: #fff;
  font-size: 1.1rem;
  border-radius: 5px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.accent}55;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.875rem 1.75rem;

    &:hover {
      transform: none;
    }
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: 0.8rem 1.5rem;
  }
`;

export const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    gap: 0.75rem;
    margin-top: 1.5rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    max-width: 280px;
    align-items: stretch;
    gap: 0.5rem;
  }
`;

export const SecondaryButton = styled(motion.a)`
  padding: 1rem 2rem;
  background-color: transparent;
  border: 2px solid ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.accent};
  font-size: 1.1rem;
  border-radius: 5px;
  transition: all 0.3s ease;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    background-color: ${({ theme }) => theme.accent};
    color: #fff;
    transform: translateY(-3px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.accent}55;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.875rem 1.75rem;

    &:hover {
      transform: none;
    }
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: 0.8rem 1.5rem;
  }
`;
