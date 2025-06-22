import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Blob = styled(motion.div)`
  position: fixed;
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle,
    ${({ theme }) => theme.accent}aa,
    transparent 60%
  );
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
  z-index: -1;
  top: 0;
  left: 0;
`;

const BackgroundBlob = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Blob
      animate={{
        x: mousePosition.x - 200, // Center the blob on the cursor
        y: mousePosition.y - 200,
      }}
      transition={{ type: "spring", stiffness: 100, damping: 20, mass: 2 }}
    />
  );
};

export default BackgroundBlob;
