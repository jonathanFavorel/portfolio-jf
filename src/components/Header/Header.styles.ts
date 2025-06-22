import { motion } from "framer-motion";
import styled from "styled-components";

interface HeaderContainerProps {
  isScrolled: boolean;
  isOpen?: boolean;
}

export const HeaderContainer = styled(motion.header)<HeaderContainerProps>`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 1rem 2rem;
  background: ${({ theme, isScrolled, isOpen }) =>
    isScrolled || isOpen ? `${theme.body}e6` : "transparent"};
  backdrop-filter: ${({ isScrolled, isOpen }) =>
    isScrolled || isOpen ? "blur(10px)" : "none"};
  color: ${({ theme }) => theme.text};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  transition: background-color 0.3s ease-in-out,
    backdrop-filter 0.3s ease-in-out;
  box-shadow: ${({ isScrolled, theme }) =>
    isScrolled ? `0 2px 4px ${theme.text}1a` : "none"};
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-columns: 1fr auto;
    padding: 0.75rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.75rem;
  }
`;

export const Logo = styled(motion.a)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  white-space: nowrap;
  text-decoration: none;
  justify-self: start;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const Nav = styled(motion.nav)`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  justify-self: center;

  a {
    font-weight: 500;
    transition: color 0.3s ease;
    white-space: nowrap;
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      opacity: 0.7;
      transition: opacity 0.3s ease;
    }

    &:hover {
      color: ${({ theme }) => theme.accent};
      svg {
        opacity: 1;
      }
    }

    &.active {
      color: ${({ theme }) => theme.accent};
      font-weight: 700;
      svg {
        opacity: 1;
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-self: end;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

export const MenuToggle = styled(motion.div)`
  display: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
  z-index: 1001;
  padding: 0.25rem;

  @media (max-width: 768px) {
    display: block;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

export const MobileNav = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0;
  position: fixed;
  top: 70px;
  right: 0;
  width: 280px;
  height: calc(100vh - 70px);
  background: ${({ theme }) => theme.body};
  backdrop-filter: blur(20px);
  padding: 0;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.3);
  z-index: 999;
  overflow-y: auto;
  border-left: 1px solid ${({ theme }) => theme.cardBorder};

  a {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.text};
    text-decoration: none;
    padding: 1.25rem 2rem;
    border-bottom: 1px solid ${({ theme }) => theme.cardBorder};
    transition: all 0.3s ease;
    position: relative;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: 500;

    svg {
      transition: color 0.3s ease;
      color: ${({ theme }) => theme.text}aa;
      font-size: 1rem;
    }

    &:hover {
      color: ${({ theme }) => theme.accent};
      background: ${({ theme }) => theme.cardBackground};
      padding-left: 2.5rem;

      svg {
        color: ${({ theme }) => theme.accent};
      }
    }

    &.active {
      color: ${({ theme }) => theme.accent};
      background: ${({ theme }) => theme.cardBackground};
      padding-left: 2.5rem;
      font-weight: 700;

      &::before {
        width: 4px;
      }

      svg {
        color: ${({ theme }) => theme.accent};
        opacity: 1;
      }
    }

    &:last-child {
      border-bottom: none;
    }

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 0;
      background: ${({ theme }) => theme.accent};
      transition: width 0.3s ease;
    }

    &:hover::before {
      width: 4px;
    }
  }

  @media (max-width: 480px) {
    width: 100%;
    right: 0;
    top: 60px;
    height: calc(100vh - 60px);
    border-left: none;
    border-top: 1px solid ${({ theme }) => theme.cardBorder};
  }
`;

export const ThemeToggle = styled(motion.button)`
  padding: 0.5rem;
  background: none;
  color: ${({ theme }) => theme.accent};
  border: 1px solid ${({ theme }) => theme.accent};
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  flex-shrink: 0;

  &:hover {
    background-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.body};
  }

  @media (max-width: 768px) {
    min-width: 35px;
    height: 35px;
    padding: 0.4rem;
  }

  @media (max-width: 480px) {
    min-width: 32px;
    height: 32px;
    padding: 0.3rem;
  }
`;

export const LanguageSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  button {
    background: none;
    border: none;
    color: ${({ theme }) => theme.text};
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    opacity: 0.7;
    transition: opacity 0.3s ease;

    &.active {
      opacity: 1;
      font-weight: 700;
      color: ${({ theme }) => theme.accent};
    }

    &:hover {
      opacity: 1;
    }
  }

  span {
    color: ${({ theme }) => theme.text}80;
  }
`;

export const LangButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.cardBorder};
  color: ${({ theme }) => theme.text};
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.cardBackground};
    border-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.accent};
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.6rem;
    font-size: 0.8rem;
  }
`;

export const ThemeButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.cardBorder};
  color: ${({ theme }) => theme.text};
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.cardBackground};
    border-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.accent};
  }

  @media (max-width: 768px) {
    padding: 0.4rem;
    font-size: 0.9rem;
  }
`;
