import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import { styled } from "styled-components";

export const TestimonialsSection = styled(motion.section)`
  padding: 4rem 2rem;
  margin: 0 auto;
  overflow: visible;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 0.5rem;
  }
`;

export const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
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

  @media (max-width: 480px) {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }
`;

export const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const AuthorImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.cardBorder};
  background: ${({ theme }) => theme.cardBackground};
  padding: 3px;
  backdrop-filter: blur(5px);
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  color: ${({ theme }) => theme.text}99;
  object-fit: cover;
  object-position: center;

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
  }
`;

export const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: auto;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

export const QuoteIcon = styled(FaQuoteLeft)`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  font-size: 4rem;
  color: ${({ theme }) => theme.text}dd;
  transform: rotate(-10deg);
  transition: color 0.3s ease, transform 0.3s ease;

  @media (max-width: 768px) {
    font-size: 3rem;
    top: 1rem;
    left: 1rem;
  }
`;

export const TestimonialCard = styled(motion.div)`
  background: ${({ theme }) => theme.cardBackground};
  backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 1px solid ${({ theme }) => theme.cardBorder};
  padding: 2.5rem;
  position: relative;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  margin: 10px 0;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 16px 45px rgba(0, 0, 0, 0.12);
  }

  &:hover ${AuthorImage} {
    transform: scale(1.15) rotate(5deg);
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 15px ${({ theme }) => theme.accent}70;
  }

  &:hover ${QuoteIcon} {
    color: ${({ theme }) => theme.accent};
    transform: rotate(-10deg) scale(1.1);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 12px;
    margin: 5px 0;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
    }

    &:hover ${AuthorImage} {
      transform: scale(1.1) rotate(3deg);
      border-color: ${({ theme }) => theme.accent};
      box-shadow: 0 0 10px ${({ theme }) => theme.accent}70;
    }

    &:hover ${QuoteIcon} {
      color: ${({ theme }) => theme.accent};
      transform: rotate(-10deg) scale(1.05);
    }
  }
`;

export const TestimonialText = styled.p`
  font-style: italic;
  margin-top: 3.5rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.text}dd;
  flex-grow: 1;
  line-height: 1.6;

  @media (max-width: 768px) {
    margin-top: 2.5rem;
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
  }
`;

export const Author = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.accent};

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const AuthorTitle = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text}99;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const SwiperContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 40px;
  overflow: visible;

  .swiper {
    overflow: visible;
  }

  .swiper-wrapper {
    padding: 20px 0;
  }

  .swiper-slide {
    height: auto;
    display: flex;
    padding: 0 10px;
  }

  .swiper-pagination-bullet {
    background: ${({ theme }) => theme.accent};
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: ${({ theme }) => theme.accent};
    top: 50%;
    transform: translateY(-50%);

    &:after {
      font-size: 2.5rem;
      font-weight: bold;
    }

    @media (max-width: 768px) {
      display: none;
    }
  }

  .swiper-button-prev {
    left: 0;
  }

  .swiper-button-next {
    right: 0;
  }

  @media (max-width: 768px) {
    padding: 1rem 20px;

    .swiper-wrapper {
      padding: 10px 0;
    }

    .swiper-slide {
      padding: 0 5px;
    }
  }
`;
