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
`;
