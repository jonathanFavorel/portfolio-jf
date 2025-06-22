import styled from "styled-components";

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
`;

export const AboutContainer = styled.section`
  padding: 4rem 2rem;
  display: grid;
  grid-template-areas:
    "title title"
    "content content"
    "timeline timeline";
  gap: 2rem 4rem;
  align-items: start;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 2rem 1rem;
    gap: 1.5rem;
  }
`;

export const ProfileImage = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid ${({ theme }) => theme.accent};
  justify-self: center;
`;

export const AboutContent = styled.div`
  grid-area: content;
  p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.text}dd;
  }

  @media (max-width: 768px) {
    text-align: center;
    p {
      font-size: 1rem;
      margin-bottom: 1.5rem;
    }
  }
`;

export const TimelineContainer = styled.div`
  grid-column: 1 / -1; /* Span across both columns */
  margin-top: 4rem;
  position: relative;
  padding: 2rem 0;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    width: 2px;
    background-color: ${({ theme }) => theme.accent};

    @media (max-width: 768px) {
      left: 30px;
      transform: translateX(0);
    }
  }

  @media (max-width: 768px) {
    margin-top: 2rem;
    padding: 1rem 0;
  }
`;

export const TimelineItem = styled.div`
  padding: 1rem 0;
  position: relative;
  width: 100%;

  &.education {
    padding-right: calc(50% + 4rem);
    text-align: right;
  }

  &.work {
    padding-left: calc(50% + 4rem);
    text-align: left;
  }

  @media (max-width: 768px) {
    &.education,
    &.work {
      padding: 0;
      padding-left: 70px; /* Space for icon and line */
      text-align: left;
      margin-bottom: 2rem;
    }
  }
`;

export const TimelineIcon = styled.div`
  position: absolute;
  top: 4.8rem;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.accent};
  border: 4px solid ${({ theme }) => theme.body};
  border-radius: 50%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    left: 30px;
    top: 3.25rem;
    transform: translate(-50%, -50%);
    width: 30px;
    height: 30px;
    font-size: 1rem;
    border-width: 3px;
  }
`;

export const TimelineContent = styled.div`
  padding: 1.5rem;
  background: ${({ theme }) => theme.cardBackground};
  backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.cardBorder};
  display: inline-block;
  width: calc(100% - 2rem);
  max-width: 450px; // Max width for content
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    width: 100%;
    display: block;
    padding: 1rem;
    margin-left: 0;
    max-width: none;
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;

export const TimelineDate = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.accent};
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

export const TimelineTitle = styled.h4`
  font-size: 1.2rem;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const TimelineInstitution = styled.div`
  font-size: 1rem;
  font-style: italic;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text}aa;
`;

export const TimelineDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
  color: ${({ theme }) => theme.text}dd;
`;
