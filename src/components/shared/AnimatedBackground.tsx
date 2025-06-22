import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { Particles, initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import React, { memo, useEffect, useState } from "react";

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
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    );
  }

  return null;
};

export default memo(AnimatedBackground);
