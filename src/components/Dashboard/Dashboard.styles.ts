import styled, { createGlobalStyle, keyframes } from "styled-components";

// --- Animations Modernes Avancées ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
`;

const slideIn = keyframes`
  from { transform: translateX(-30px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(255, 180, 0, 0.3); }
  50% { box-shadow: 0 0 40px rgba(255, 180, 0, 0.6); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
  40%, 43% { transform: translate3d(0, -30px, 0); }
  70% { transform: translate3d(0, -15px, 0); }
  90% { transform: translate3d(0, -4px, 0); }
`;

// --- Styles Globaux Modernes ---
export const GlobalDashboardStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    overflow-x: hidden;
  }

  /* Scrollbar moderne */
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) =>
      theme.body === "#0F172A"
        ? "rgba(30, 41, 59, 0.3)"
        : "rgba(241, 245, 249, 0.3)"};
    border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #FFB400 0%, #FF8C00 100%);
    border-radius: 6px;
    border: 2px solid transparent;
    background-clip: content-box;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #FF8C00 0%, #FF6B00 100%);
  }

  /* Sélection de texte */
  ::selection {
    background: linear-gradient(135deg, #FFB400 0%, #FF8C00 100%);
    color: #0F172A;
  }

  /* Focus global */
  *:focus {
    outline: none;
  }

  /* Animations d'entrée pour les éléments */
  .fade-in {
    animation: ${fadeIn} 0.6s ease-out;
  }

  .slide-in {
    animation: ${slideIn} 0.5s ease-out;
  }

  .float {
    animation: ${float} 3s ease-in-out infinite;
  }
`;

// --- Conteneur Principal avec Effets Avancés ---
export const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) =>
    theme.body === "#0F172A"
      ? `
        radial-gradient(circle at 20% 80%, rgba(255, 180, 0, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 140, 0, 0.1) 0%, transparent 50%),
        linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)
      `
      : `
        radial-gradient(circle at 20% 80%, rgba(255, 180, 0, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 140, 0, 0.05) 0%, transparent 50%),
        linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 50%, #E2E8F0 100%)
      `};
  color: ${({ theme }) => theme.text};
  position: relative;
  overflow-x: hidden;

  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 10% 20%,
        rgba(255, 180, 0, 0.03) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 90% 80%,
        rgba(255, 140, 0, 0.03) 0%,
        transparent 50%
      );
    pointer-events: none;
    z-index: 0;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    min-height: 100vh;
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
  }
`;

// --- Header Principal avec Effets Modernes ---
export const HeaderSection = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;
  background: ${({ theme }) =>
    theme.body === "#0F172A"
      ? "rgba(30, 41, 59, 0.8)"
      : "rgba(255, 255, 255, 0.8)"};
  backdrop-filter: blur(30px) saturate(180%);
  border-bottom: 1px solid ${({ theme }) => theme.cardBorder};
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2.2rem;
    font-weight: 900;
    background: linear-gradient(135deg, #ffb400 0%, #ff8c00 50%, #ff6b00 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(135deg, #ffb400 0%, #ff8c00 100%);
      border-radius: 2px;
      transform: scaleX(0);
      transform-origin: left;
      animation: ${shimmer} 2s ease-in-out infinite;
    }
  }

  .header-actions {
    display: flex;
    gap: 1rem;
  }
`;

// --- Page de Connexion Ultra-Moderne ---
export const LoginForm = styled.form`
  margin: auto;
  padding: 3.5rem;
  max-width: 480px;
  background: ${({ theme }) =>
    theme.body === "#0F172A"
      ? "rgba(30, 41, 59, 0.9)"
      : "rgba(255, 255, 255, 0.9)"};
  backdrop-filter: blur(40px) saturate(200%);
  border: 1px solid ${({ theme }) => theme.cardBorder};
  border-radius: 24px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.8s ease-out;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg,
      transparent,
      rgba(255, 180, 0, 0.1),
      transparent,
      rgba(255, 140, 0, 0.1),
      transparent
    );
    animation: ${rotate} 10s linear infinite;
    z-index: -1;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 2px;
    background: ${({ theme }) =>
      theme.body === "#0F172A"
        ? "rgba(30, 41, 59, 0.95)"
        : "rgba(255, 255, 255, 0.95)"};
    border-radius: 22px;
    z-index: -1;
  }

  h2 {
    text-align: center;
    margin-bottom: 2.5rem;
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #ffb400 0%, #ff8c00 50%, #ff6b00 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;

    &::before {
      content: "🚀";
      position: absolute;
      top: -20px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 2rem;
      animation: ${float} 3s ease-in-out infinite;
    }
  }

  .form-group {
    margin-bottom: 2rem;
    position: relative;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.75rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
    font-size: 1rem;
  }

  .form-group input {
    width: 100%;
    padding: 1.25rem 1.5rem;
    background: ${({ theme }) =>
      theme.body === "#0F172A"
        ? "rgba(15, 23, 42, 0.8)"
        : "rgba(255, 255, 255, 0.8)"};
    backdrop-filter: blur(20px);
    border: 2px solid ${({ theme }) => theme.cardBorder};
    border-radius: 16px;
    color: ${({ theme }) => theme.text};
    font-size: 1.1rem;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;

    &:focus {
      outline: none;
      border-color: #ffb400;
      box-shadow: 0 0 0 4px rgba(255, 180, 0, 0.2),
        0 8px 25px rgba(255, 180, 0, 0.15);
      transform: translateY(-2px);
    }

    &::placeholder {
      color: ${({ theme }) => theme.iconColor};
      opacity: 0.7;
    }
  }

  .submit-btn {
    width: 100%;
    padding: 1.25rem;
    background: linear-gradient(135deg, #ffb400 0%, #ff8c00 100%);
    color: #0f172a;
    font-weight: 700;
    font-size: 1.1rem;
    border: none;
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    box-shadow: 0 8px 25px rgba(255, 180, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.3),
        transparent
      );
      transition: left 0.5s;
    }

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 35px rgba(255, 180, 0, 0.4);
      animation: ${glow} 2s ease-in-out infinite;

      &::before {
        left: 100%;
      }
    }

    &:active {
      transform: translateY(-1px);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
      animation: none;
    }

    svg {
      font-size: 1.2rem;
      flex-shrink: 0;
    }
  }
`;

// --- Sidebar Ultra-Moderne ---
export const Sidebar = styled.aside`
  width: 300px;
  flex-shrink: 0;
  background: ${({ theme }) =>
    theme.body === "#0F172A"
      ? "rgba(30, 41, 59, 0.9)"
      : "rgba(255, 255, 255, 0.9)"};
  backdrop-filter: blur(30px) saturate(180%);
  border-right: 1px solid ${({ theme }) => theme.cardBorder};
  padding: 2rem 1.5rem;
  overflow-y: auto;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      rgba(255, 180, 0, 0.05) 0%,
      transparent 50%,
      rgba(255, 140, 0, 0.05) 100%
    );
    pointer-events: none;
  }

  button {
    width: 100%;
    padding: 1.25rem 1.75rem;
    margin-bottom: 1rem;
    background: transparent;
    border: 2px solid transparent;
    border-radius: 16px;
    color: ${({ theme }) => theme.text};
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    gap: 1rem;
    text-align: left;
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 180, 0, 0.1),
        transparent
      );
      transition: left 0.5s;
    }

    &:hover {
      background: rgba(255, 180, 0, 0.1);
      border-color: rgba(255, 180, 0, 0.3);
      transform: translateX(8px) scale(1.02);
      box-shadow: 0 8px 25px rgba(255, 180, 0, 0.15);

      &::before {
        left: 100%;
      }
    }

    &.active {
      background: linear-gradient(135deg, #ffb400 0%, #ff8c00 100%);
      color: #0f172a;
      font-weight: 700;
      box-shadow: 0 8px 25px rgba(255, 180, 0, 0.3),
        0 0 0 1px rgba(255, 180, 0, 0.5);
      transform: translateX(8px) scale(1.02);
      animation: ${glow} 2s ease-in-out infinite;
    }

    svg {
      font-size: 1.2rem;
      flex-shrink: 0;
      transition: transform 0.3s ease;
    }

    &:hover svg {
      transform: scale(1.2) rotate(5deg);
    }
  }
`;

export const MainContent = styled.main`
  flex-grow: 1;
  padding: 2.5rem 3rem;
  overflow-y: auto;
  position: relative;
  z-index: 1;
`;

// --- Sections avec Effets Avancés ---
export const Section = styled.section`
  background: ${({ theme }) =>
    theme.body === "#0F172A"
      ? "rgba(30, 41, 59, 0.8)"
      : "rgba(255, 255, 255, 0.8)"};
  backdrop-filter: blur(30px) saturate(180%);
  border: 1px solid ${({ theme }) => theme.cardBorder};
  border-radius: 24px;
  padding: 2.5rem 3rem;
  margin-bottom: 3rem;
  animation: ${fadeIn} 0.6s ease-out;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(135deg, #ffb400 0%, #ff8c00 100%);
    border-radius: 24px 24px 0 0;
  }

  h2 {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 2.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    background: linear-gradient(135deg, #ffb400 0%, #ff8c00 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;

    svg {
      animation: ${float} 3s ease-in-out infinite;
    }
  }
`;

export const Card = styled.div`
  background: ${({ theme }) =>
    theme.body === "#0F172A"
      ? "rgba(15, 23, 42, 0.8)"
      : "rgba(248, 250, 252, 0.8)"};
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.cardBorder};
  border-radius: 20px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  animation: ${slideIn} 0.5s ease-out;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 180, 0, 0.05),
      transparent
    );
    transition: left 0.6s;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(255, 180, 0, 0.1);

    &::before {
      left: 100%;
    }
  }
`;

// --- Grilles Responsives Modernes ---
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;

  label {
    font-weight: 700;
    color: ${({ theme }) => theme.text};
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;

    svg {
      color: #ffb400;
      font-size: 1.1rem;
    }
  }

  &.full-width {
    grid-column: 1 / -1;
  }
`;

export const FullWidthItem = styled.div`
  grid-column: 1 / -1;
`;

// --- Éléments de Formulaire Ultra-Modernes ---
export const Input = styled.input`
  width: 100%;
  padding: 1.25rem 1.5rem;
  background: ${({ theme }) =>
    theme.body === "#0F172A"
      ? "rgba(15, 23, 42, 0.8)"
      : "rgba(255, 255, 255, 0.8)"};
  backdrop-filter: blur(20px);
  border: 2px solid ${({ theme }) => theme.cardBorder};
  border-radius: 16px;
  color: ${({ theme }) => theme.text};
  font-size: 1.1rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &:focus {
    outline: none;
    border-color: #ffb400;
    box-shadow: 0 0 0 4px rgba(255, 180, 0, 0.2),
      0 8px 25px rgba(255, 180, 0, 0.15);
    transform: translateY(-2px);
  }

  &::placeholder {
    color: ${({ theme }) => theme.iconColor};
    opacity: 0.7;
  }

  &:hover {
    border-color: rgba(255, 180, 0, 0.5);
    transform: translateY(-1px);
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 1.25rem 1.5rem;
  background: ${({ theme }) =>
    theme.body === "#0F172A"
      ? "rgba(15, 23, 42, 0.8)"
      : "rgba(255, 255, 255, 0.8)"};
  backdrop-filter: blur(20px);
  border: 2px solid ${({ theme }) => theme.cardBorder};
  border-radius: 16px;
  color: ${({ theme }) => theme.text};
  font-size: 1.1rem;
  resize: vertical;
  min-height: 140px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #ffb400;
    box-shadow: 0 0 0 4px rgba(255, 180, 0, 0.2),
      0 8px 25px rgba(255, 180, 0, 0.15);
    transform: translateY(-2px);
  }

  &::placeholder {
    color: ${({ theme }) => theme.iconColor};
    opacity: 0.7;
  }

  &:hover {
    border-color: rgba(255, 180, 0, 0.5);
    transform: translateY(-1px);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 1.25rem 1.5rem;
  background: ${({ theme }) =>
    theme.body === "#0F172A"
      ? "rgba(15, 23, 42, 0.8)"
      : "rgba(255, 255, 255, 0.8)"};
  backdrop-filter: blur(20px);
  border: 2px solid ${({ theme }) => theme.cardBorder};
  border-radius: 16px;
  color: ${({ theme }) => theme.text};
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23FFB400' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 1rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 3rem;

  &:focus {
    outline: none;
    border-color: #ffb400;
    box-shadow: 0 0 0 4px rgba(255, 180, 0, 0.2),
      0 8px 25px rgba(255, 180, 0, 0.15);
    transform: translateY(-2px);
  }

  &:hover {
    border-color: rgba(255, 180, 0, 0.5);
    transform: translateY(-1px);
  }
`;

// --- Boutons Ultra-Modernes ---
export const Button = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #ffb400 0%, #ff8c00 100%);
  color: #0f172a;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 8px 25px rgba(255, 180, 0, 0.3),
    0 0 0 1px rgba(255, 180, 0, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 12px 35px rgba(255, 180, 0, 0.4),
      0 0 0 1px rgba(255, 180, 0, 0.3);
    animation: ${glow} 2s ease-in-out infinite;

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px) scale(1.01);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    animation: none;
  }

  &.secondary {
    background: transparent;
    border: 2px solid ${({ theme }) => theme.cardBorder};
    color: ${({ theme }) => theme.text};
    box-shadow: none;

    &:hover {
      background: ${({ theme }) => theme.cardBorder};
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
  }

  svg {
    font-size: 1.1rem;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.2);
  }
`;

export const ActionButton = styled.button`
  background: transparent;
  border: 2px solid ${({ theme }) => theme.cardBorder};
  color: ${({ theme }) => theme.iconColor};
  cursor: pointer;
  padding: 1rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 1.1rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 180, 0, 0.1),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover {
    background: ${({ theme }) => theme.cardBorder};
    color: ${({ theme }) => theme.text};
    transform: translateY(-3px) scale(1.1);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);

    &::before {
      left: 100%;
    }
  }

  &.delete:hover {
    background: #ef444422;
    border-color: #ef444488;
    color: #ef4444;
    box-shadow: 0 8px 25px rgba(239, 68, 68, 0.2);
    animation: ${bounce} 0.6s ease-in-out;
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.2) rotate(5deg);
  }
`;

// --- Statistiques Ultra-Modernes ---
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

export const StatsCard = styled.div`
  background: ${({ theme }) =>
    theme.body === "#0F172A"
      ? "rgba(30, 41, 59, 0.8)"
      : "rgba(255, 255, 255, 0.8)"};
  backdrop-filter: blur(30px);
  border: 1px solid ${({ theme }) => theme.cardBorder};
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, #ffb400 0%, #ff8c00 100%);
    border-radius: 20px 20px 0 0;
  }

  &:hover {
    transform: translateY(-8px) scale(1.05);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(255, 180, 0, 0.1);
    animation: ${glow} 2s ease-in-out infinite;
  }

  .stat-number {
    font-size: 3.5rem;
    font-weight: 900;
    background: linear-gradient(135deg, #ffb400 0%, #ff8c00 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
    animation: ${pulse} 2s ease-in-out infinite;
  }

  .stat-label {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.iconColor};
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

export const PreviewCard = styled.div`
  background: ${({ theme }) =>
    theme.body === "#0F172A"
      ? "rgba(15, 23, 42, 0.8)"
      : "rgba(248, 250, 252, 0.8)"};
  backdrop-filter: blur(20px);
  border: 2px dashed ${({ theme }) => theme.cardBorder};
  border-radius: 16px;
  padding: 2rem;
  margin-top: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: #ffb400;
    transform: translateY(-2px);
  }

  h4 {
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.text};
    font-weight: 700;
    font-size: 1.2rem;
  }
`;

// --- Modales Ultra-Modernes ---
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(20px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.4s ease;
`;

export const Modal = styled.div`
  background: ${({ theme }) =>
    theme.body === "#0F172A"
      ? "rgba(30, 41, 59, 0.98)"
      : "rgba(255, 255, 255, 0.98)"};
  backdrop-filter: blur(40px) saturate(200%);
  border-radius: 28px;
  border: 1px solid ${({ theme }) => theme.cardBorder};
  box-shadow: 0 32px 64px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1);
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 0.4s ease;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, #ffb400 0%, #ff8c00 100%);
    border-radius: 28px 28px 0 0;
  }

  .modal-header {
    padding: 2.5rem 3rem;
    border-bottom: 1px solid ${({ theme }) => theme.cardBorder};
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      font-size: 2rem;
      font-weight: 800;
      margin: 0;
      background: linear-gradient(135deg, #ffb400 0%, #ff8c00 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  .modal-body {
    padding: 3rem;
  }

  .modal-footer {
    padding: 2.5rem 3rem;
    border-top: 1px solid ${({ theme }) => theme.cardBorder};
    display: flex;
    justify-content: flex-end;
    gap: 1.5rem;
  }
`;

export const Badge = styled.span`
  display: inline-block;
  padding: 0.75rem 1.25rem;
  font-size: 0.9rem;
  font-weight: 700;
  border-radius: 12px;
  background: linear-gradient(135deg, #ffb400 0%, #ff8c00 100%);
  color: #0f172a;
  border: none;
  margin: 0.25rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 8px 25px rgba(255, 180, 0, 0.3);
    animation: ${bounce} 0.6s ease-in-out;

    &::before {
      left: 100%;
    }
  }
`;

// --- Sélecteur d'Icônes Ultra-Moderne ---
export const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

export const IconItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 12px;
  border: 2px solid
    ${({ isSelected, theme }) => (isSelected ? theme.accent : theme.cardBorder)};
  background: ${({ isSelected }) =>
    isSelected ? "rgba(255, 180, 0, 0.1)" : "transparent"};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-align: center;

  svg {
    font-size: 2.5rem;
    margin-bottom: 0.75rem;
    color: ${({ isSelected, theme }) =>
      isSelected ? theme.accent : theme.iconColor};
  }

  span {
    font-size: 0.9rem;
    font-weight: 500;
    word-break: break-word;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 8px 20px rgba(255, 180, 0, 0.15);
  }
`;

// --- Spinner de Chargement Ultra-Moderne ---
export const LoadingSpinner = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid transparent;
  border-top: 3px solid currentColor;
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border: 3px solid transparent;
    border-top: 3px solid rgba(255, 180, 0, 0.3);
    border-radius: 50%;
    animation: ${rotate} 1.5s linear infinite reverse;
  }
`;
