import { styled } from "styled-components";

export const SkillsContainer = styled.section`
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

export const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

export const SkillCategoryCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 1px solid ${({ theme }) => theme.cardBorder};
  padding: 2rem;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  will-change: transform;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 12px;
  }
`;

export const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.accent};
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }
`;

export const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

export const SkillItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.text};
  transition: all 0.3s ease;

  svg {
    font-size: 3rem;
    color: ${({ theme }) => theme.iconColor};
    transition: all 0.3s ease;
  }

  span {
    font-size: 0.875rem;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.3s ease;
    text-align: center;
  }

  &:hover {
    transform: scale(1.1);
    svg {
      color: ${({ theme }) => theme.accent};
    }
    span {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    svg {
      font-size: 2.5rem;
    }

    span {
      opacity: 1;
      font-size: 0.8rem;
    }

    &:hover {
      transform: none;
      svg {
        color: ${({ theme }) => theme.iconColor};
      }
    }
  }

  @media (max-width: 480px) {
    svg {
      font-size: 2rem;
    }

    span {
      font-size: 0.75rem;
    }
  }
`;
