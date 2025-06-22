import { styled } from "styled-components";

export const FooterContainer = styled.footer`
  padding: 2rem;
  background-color: ${({ theme }) => theme.body};
  text-align: center;
  border-top: 1px solid ${({ theme }) => theme.cardBorder};
  margin-top: 4rem;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    margin-top: 2rem;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    gap: 1.25rem;
    margin-bottom: 0.75rem;
  }
`;

export const SocialIconLink = styled.a`
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.accent};
    transform: scale(1.2);
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;

    &:hover {
      transform: none;
    }
  }
`;

export const Copyright = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text}99;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;
