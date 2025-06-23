import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    overflow-x: hidden;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: 'Inter', sans-serif;
    transition: all 0.25s linear;
    overflow-x: hidden;
    width: 100%;
    max-width: 100vw;
  }

  #root {
    overflow-x: hidden;
    width: 100%;
    max-width: 100vw;
  }

  .app-container {
    overflow-x: hidden;
    width: 100%;
    max-width: 100vw;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
  }

  a {
    color: ${({ theme }) => theme.accent};
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
  }

  /* Indicateur de thème pour mobile */
  .theme-indicator {
    position: fixed;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({ theme }) => theme.accent};
    z-index: 9999;
    pointer-events: none;
    opacity: 0.8;
    transition: all 0.3s ease;
  }

  @media (max-width: 768px) {
    .theme-indicator {
      width: 15px;
      height: 15px;
      top: 8px;
      right: 8px;
    }
  }

  /* Amélioration de la visibilité des boutons sur mobile */
  @media (max-width: 768px) {
    button {
      min-height: 44px;
      min-width: 44px;
    }
  }
`;
