import { styled } from "styled-components";

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
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

export const ProjectsSection = styled.section`
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

export const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const ProjectCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 1px solid ${({ theme }) => theme.cardBorder};
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  will-change: transform;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    border-radius: 12px;
  }
`;

export const ProjectImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  ${ProjectCard}:hover & img {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 180px;
  }
`;

export const ProjectContent = styled.div`
  padding: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const ProjectTitle = styled.h3`
  margin-top: 0;
  color: ${({ theme }) => theme.accent};
  font-size: 1.3rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const ProjectDescription = styled.p`
  font-size: 0.9rem;
  margin-top: 1rem;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

export const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const Tag = styled.span`
  background: ${({ theme }) => theme.accent}33;
  color: ${({ theme }) => theme.accent};
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
  font-size: 0.8rem;
`;

export const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const ProjectLink = styled.a`
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.body};
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
  }
`;

export const TechIconsContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
  flex-wrap: wrap;

  svg {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.iconColor};
  }

  @media (max-width: 768px) {
    gap: 0.5rem;

    svg {
      font-size: 1.3rem;
    }
  }
`;
