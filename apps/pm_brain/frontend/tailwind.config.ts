import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "oklch(96% 0.005 350)",
        paper: "oklch(98% 0 0)",
        ink: "oklch(10% 0 0)",
        charcoal: "oklch(25% 0 0)",
        ash: "oklch(55% 0 0)",
        mist: "oklch(92% 0 0)",
        accent: "oklch(60% 0.25 350)",
        "accent-hover": "oklch(52% 0.25 350)",
        "accent-dim": "oklch(60% 0.25 350 / 0.15)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0px",
        sm: "4px",
        md: "8px",
        lg: "12px",
      },
    },
  },
  plugins: [],
};

export default config;
