import React from "react";
import styled from "styled-components";
import { backgroundOptions } from "../../data/backgrounds";
import { Section } from "./Dashboard.styles";

const BackgroundGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
`;

const BackgroundPreview = styled.div<{ isSelected: boolean }>`
  border: 2px solid
    ${({ theme, isSelected }) => (isSelected ? theme.accent : theme.cardBorder)};
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease-in-out;
  background-color: ${({ theme }) => theme.cardBackground};

  &:hover {
    border-color: ${({ theme }) => theme.accent};
    transform: translateY(-5px);
  }

  p {
    margin: 0;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
    text-transform: capitalize;
  }
`;

interface BackgroundSelectorProps {
  currentBackground: string;
  onSelect: (key: string) => void;
}

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({
  currentBackground,
  onSelect,
}) => {
  return (
    <Section>
      <h2>Fond d'écran du Portfolio</h2>
      <BackgroundGrid>
        {Object.keys(backgroundOptions).map((key) => (
          <BackgroundPreview
            key={key}
            isSelected={currentBackground === key}
            onClick={() => onSelect(key)}
          >
            <p>{key}</p>
          </BackgroundPreview>
        ))}
      </BackgroundGrid>
    </Section>
  );
};

export default BackgroundSelector;
