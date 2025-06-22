import React, { useState } from "react";
import styled from "styled-components";
import { backgroundOptions } from "../../data/backgrounds";
import AnimatedBackground from "../shared/AnimatedBackground";
import { Button, Section } from "./Dashboard.styles";

const SelectorLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const PreviewContainer = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  height: 400px;
  background-color: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.cardBorder};
`;

const BackgroundGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 1rem;
`;

const BackgroundPreview = styled.div<{
  isSelected: boolean;
  isPreviewing: boolean;
}>`
  border: 2px solid
    ${({ theme, isSelected, isPreviewing }) =>
      isSelected ? theme.accent : isPreviewing ? "#fff" : theme.cardBorder};
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease-in-out;
  background-color: ${({ theme }) => theme.cardBackground};
  box-shadow: ${({ theme, isSelected }) =>
    isSelected ? `0 0 15px ${theme.accent}` : "none"};

  &:hover {
    transform: translateY(-5px);
  }

  p {
    margin: 0;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
    text-transform: capitalize;
  }
`;

const ActionsContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
`;

interface BackgroundSelectorProps {
  currentBackground: string;
  onSave: (key: string) => void;
}

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({
  currentBackground,
  onSave,
}) => {
  const [previewKey, setPreviewKey] = useState(currentBackground);

  const handleSave = () => {
    onSave(previewKey);
  };

  return (
    <Section>
      <h2>Thème et Fond d'écran</h2>
      <SelectorLayout>
        <div>
          <h4>Cliquez pour prévisualiser</h4>
          <BackgroundGrid>
            {Object.keys(backgroundOptions).map((key) => (
              <BackgroundPreview
                key={key}
                isSelected={currentBackground === key}
                isPreviewing={previewKey === key}
                onClick={() => setPreviewKey(key)}
              >
                <p>{key}</p>
              </BackgroundPreview>
            ))}
          </BackgroundGrid>
          <ActionsContainer>
            <Button
              onClick={handleSave}
              disabled={previewKey === currentBackground}
            >
              Appliquer et Sauvegarder
            </Button>
          </ActionsContainer>
        </div>
        <div>
          <h4>Aperçu en direct</h4>
          <PreviewContainer>
            <AnimatedBackground
              options={
                backgroundOptions[previewKey] || backgroundOptions.default
              }
            />
          </PreviewContainer>
        </div>
      </SelectorLayout>
    </Section>
  );
};

export default BackgroundSelector;
