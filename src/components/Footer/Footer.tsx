import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  Copyright,
  FooterContainer,
  SocialIconLink,
  SocialIcons,
} from "./Footer.styles";

interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
}

interface FooterProps {
  socialLinks: SocialLinks;
}

const Footer: React.FC<FooterProps> = ({ socialLinks }) => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <SocialIcons>
        <SocialIconLink
          href={socialLinks.github}
          target="_blank"
          aria-label="GitHub"
        >
          <FaGithub />
        </SocialIconLink>
        <SocialIconLink
          href={socialLinks.linkedin}
          target="_blank"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </SocialIconLink>
      </SocialIcons>
      <Copyright>
        © {currentYear} Jonathan Favorel. Tous droits réservés.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
