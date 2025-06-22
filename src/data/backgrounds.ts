import type { ISourceOptions } from "@tsparticles/engine";

export const backgroundOptions: Record<string, ISourceOptions> = {
  default: {
    fullScreen: { enable: false },
    /* Configuration par défaut (peut-être vide ou très simple) */
  },
  constellation: {
    fullScreen: { enable: false },
    particles: {
      number: { value: 80, density: { enable: true } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.5 },
      size: { value: { min: 1, max: 3 } },
      links: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        outModes: "out",
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        grab: { distance: 140, links: { opacity: 1 } },
        push: { quantity: 4 },
      },
    },
  },
  bubbles: {
    fullScreen: { enable: false },
    particles: {
      number: { value: 30, density: { enable: true } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: { min: 0.1, max: 0.5 } },
      size: { value: { min: 5, max: 15 } },
      move: {
        enable: true,
        speed: 2,
        direction: "top",
        outModes: "out",
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "bubble" },
      },
      modes: {
        bubble: { distance: 400, size: 40, opacity: 1 },
      },
    },
  },
  snow: {
    fullScreen: { enable: false },
    particles: {
      number: { value: 250, density: { enable: true } },
      color: { value: "#ffffff" },
      opacity: { value: 0.5 },
      size: { value: { min: 1, max: 3 } },
      move: {
        enable: true,
        speed: 1,
        direction: "bottom",
        straight: false,
      },
    },
  },
  nasa: {
    fullScreen: { enable: false },
    particles: {
      number: { value: 160, density: { enable: false } },
      size: { value: { min: 1, max: 3 } },
      move: {
        direction: "right",
        speed: 0.05,
      },
      opacity: {
        value: { min: 0.1, max: 0.5 },
        animation: {
          enable: true,
          speed: 1,
          sync: false,
        },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
      },
      modes: {
        repulse: { distance: 50 },
      },
    },
  },
  polygon: {
    fullScreen: { enable: false },
    particles: {
      number: { value: 50 },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.5 },
      size: { value: 2 },
      links: {
        enable: true,
        distance: 150,
        color: "random",
        opacity: 0.4,
        width: 1,
        triangles: {
          enable: true,
          color: "#333333",
          opacity: 0.1,
        },
      },
      move: {
        enable: true,
        speed: 1,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
    },
  },
  fireworks: {
    fullScreen: { enable: false },
    background: { color: "#000000" },
    emitters: {
      direction: "top",
      life: {
        count: 0,
        duration: 0.1,
        delay: 0.1,
      },
      rate: {
        delay: 0.15,
        quantity: 1,
      },
      size: {
        width: 100,
        height: 0,
      },
      position: {
        y: 100,
        x: 50,
      },
    },
    particles: {
      number: { value: 0 },
      color: {
        value: ["#ffffff", "#ff0000", "#00ff00", "#0000ff"],
      },
      shape: { type: "circle" },
      opacity: {
        value: { min: 0.1, max: 1 },
        animation: {
          enable: true,
          speed: 2,
          startValue: "max",
          destroy: "min",
        },
      },
      size: { value: { min: 2, max: 4 } },
      move: {
        enable: true,
        speed: { min: 5, max: 10 },
        gravity: { enable: true },
        decay: 0.05,
        direction: "top",
        outModes: "destroy",
      },
    },
  },
  sea: {
    fullScreen: { enable: false },
    particles: {
      number: { value: 100 },
      color: { value: "#00bfff" },
      shape: { type: "circle" },
      opacity: { value: 0.7 },
      size: { value: { min: 1, max: 3 } },
      move: {
        enable: true,
        speed: 1,
        direction: "bottom-left",
        outModes: "out",
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
      },
    },
  },
  stars: {
    fullScreen: { enable: false },
    particles: {
      number: { value: 200, density: { enable: true } },
      color: { value: "#fff" },
      shape: { type: "star" },
      opacity: {
        value: { min: 0.3, max: 0.8 },
        animation: { enable: true, speed: 1, sync: false },
      },
      size: { value: { min: 0.5, max: 1.5 } },
      move: {
        enable: false,
      },
    },
  },
  techno: {
    fullScreen: { enable: false },
    particles: {
      number: { value: 100 },
      color: { value: "#0f0" },
      shape: { type: "square" },
      opacity: { value: 0.5 },
      size: { value: 2 },
      move: {
        enable: true,
        speed: 5,
        direction: "top",
        outModes: "destroy",
      },
    },
    background: {
      image: "linear-gradient(to bottom, #000, #100)",
    },
  },
  matrix: {
    fullScreen: { enable: false },
    particles: {
      number: { value: 80 },
      color: { value: "#00ff00" },
      shape: {
        type: "character",
        options: {
          character: {
            value: "0123456789ABCDEF",
            font: "Verdana",
            style: "",
            weight: "400",
            fill: true,
          },
        },
      },
      opacity: { value: { min: 0.2, max: 0.8 } },
      size: { value: 16 },
      move: {
        enable: true,
        speed: 2,
        direction: "bottom",
        straight: true,
        outModes: "destroy",
      },
    },
  },
  confetti: {
    fullScreen: { enable: false },
    particles: {
      number: { value: 0 },
      color: { value: ["#FFD700", "#FF4500", "#FF69B4", "#1E90FF"] },
      shape: { type: ["circle", "square", "triangle", "star"] },
      opacity: { value: 1 },
      size: { value: { min: 5, max: 10 } },
      move: {
        enable: true,
        speed: 20,
        direction: "bottom",
        gravity: { enable: true, acceleration: 20 },
        outModes: "destroy",
        decay: 0.05,
      },
    },
    emitters: {
      position: { x: 50, y: 30 },
      rate: { quantity: 5, delay: 0.15 },
      life: { duration: 0.2, count: 1 },
    },
  },
  rain: {
    fullScreen: { enable: false },
    particles: {
      number: { value: 100 },
      color: { value: "#aaaaaa" },
      shape: { type: "line" },
      opacity: { value: 0.5 },
      size: { value: { min: 10, max: 20 } },
      move: {
        enable: true,
        speed: 8,
        direction: "bottom",
        straight: true,
      },
    },
  },
  hyperspace: {
    fullScreen: { enable: false },
    particles: {
      number: { value: 300, density: { enable: true } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: { min: 0.5, max: 1 } },
      size: { value: 1 },
      move: {
        enable: true,
        speed: 6,
        direction: "none",
        outModes: "out",
        warp: true,
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "bubble" },
      },
    },
    background: {
      color: "#000000",
    },
  },
};
