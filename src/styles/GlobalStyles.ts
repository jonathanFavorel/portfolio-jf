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
    height: 100%;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: 'Inter', sans-serif;
    transition: all 0.25s linear;
    overflow-x: hidden;
    width: 100%;
    max-width: 100vw;
    min-height: 100vh;
    height: 100%;
  }

  #root {
    overflow-x: hidden;
    width: 100%;
    max-width: 100vw;
    min-height: 100vh;
    height: 100%;
    background: ${({ theme }) => theme.body};
  }

  .app-container {
    overflow-x: hidden;
    width: 100%;
    max-width: 100vw;
    min-height: 100vh;
    height: 100%;
    background: ${({ theme }) => theme.body};
  }

  /* Amélioration de la visibilité du thème light */
  body {
    background: ${({ theme }) =>
      theme.body === "#F8FAFC"
        ? `linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 50%, #E2E8F0 100%)`
        : theme.body};
  }

  /* Styles spécifiques pour mobile */
  @media (max-width: 768px) {
    html, body, #root {
      height: 100vh;
      min-height: 100vh;
      width: 100vw;
      overflow-x: hidden;
    }
    
    body {
      background: ${({ theme }) =>
        theme.body === "#F8FAFC"
          ? `linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 50%, #E2E8F0 100%)`
          : theme.body};
      background-attachment: fixed;
      background-size: cover;
    }
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
`;
