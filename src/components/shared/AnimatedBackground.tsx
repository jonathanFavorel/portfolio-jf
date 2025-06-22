import { initParticlesEngine } from "@tsparticles/react";
import React, { memo, useEffect, useState } from "react";
import { Particles } from "react-tsparticles";
import type { Engine, ISourceOptions } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

interface AnimatedBackgroundProps {
  options: ISourceOptions;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ options }) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (init) {
    return (
      <Particles
        id="tsparticles"
        options={options}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />
    );
  }

  return null;
};

export default memo(AnimatedBackground);
