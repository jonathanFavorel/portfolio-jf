// Création du fichier Testimonials.tsx

import { type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  Author,
  AuthorImage,
  AuthorInfo,
  AuthorTitle,
  QuoteIcon,
  SectionTitle,
  SwiperContainer,
  TestimonialCard,
  TestimonialsSection,
  TestimonialText,
} from "./Testimonials.styles";

interface Testimonial {
  id: string;
  text: string;
  textEn: string;
  author: string;
  title: string;
  titleEn: string;
  image: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const cardVariants: Variants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 0.8,
    },
  },
};

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const { i18n } = useTranslation();
  const isEnglish = i18n.language === "en";

  return (
    <TestimonialsSection
      id="testimonials"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
    >
      <SectionTitle>
        {isEnglish ? "Testimonials" : "Recommandations"}
      </SectionTitle>
      <SwiperContainer>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={false}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          style={{ paddingBottom: "4rem" }}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
              centeredSlides: false,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
              centeredSlides: false,
            },
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <TestimonialCard variants={cardVariants}>
                <QuoteIcon />
                <TestimonialText>
                  "{isEnglish ? testimonial.textEn : testimonial.text}"
                </TestimonialText>
                <AuthorInfo>
                  <AuthorImage
                    src={testimonial.image}
                    alt={testimonial.author}
                  />
                  <div>
                    <Author>{testimonial.author}</Author>
                    <AuthorTitle>
                      {isEnglish ? testimonial.titleEn : testimonial.title}
                    </AuthorTitle>
                  </div>
                </AuthorInfo>
              </TestimonialCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperContainer>
    </TestimonialsSection>
  );
};

export default Testimonials;
