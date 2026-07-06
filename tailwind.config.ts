import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      colors: {
        bg: "var(--bg)",
        "bg-elevated": "var(--bg-elevated)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        "text-faint": "var(--text-faint)",
        trace: {
          blue: "var(--trace-blue)",
          purple: "var(--trace-purple)",
          cyan: "var(--trace-cyan)",
        },
        signal: {
          positive: "var(--signal-positive)",
          negative: "var(--signal-negative)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(2.35rem, 7vw, 6.5rem)", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
        "display-xl": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2rem, 3.4vw, 3rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.5rem, 2.2vw, 2rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
      },
      maxWidth: {
        content: "1320px",
        prose: "68ch",
      },
      borderRadius: {
        xs: "6px",
        sm: "10px",
        md: "14px",
        lg: "20px",
        xl: "28px",
      },
      boxShadow: {
        glow: "0 0 0 1px var(--border), 0 20px 60px -20px rgba(76, 141, 255, 0.25)",
        "glow-purple": "0 0 0 1px var(--border), 0 20px 60px -20px rgba(155, 107, 255, 0.25)",
        panel: "0 1px 0 0 var(--border), 0 24px 48px -24px rgba(0,0,0,0.35)",
      },
      backgroundImage: {
        "grid-fine":
          "linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)",
      },
      keyframes: {
        "trace-flow": {
          "0%": { strokeDashoffset: "1" },
          "100%": { strokeDashoffset: "0" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.85)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "trace-flow": "trace-flow 2.4s linear infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        "accordion-down": "accordion-down 0.25s ease-out",
        "accordion-up": "accordion-up 0.25s ease-out",
      },
      transitionTimingFunction: {
        signal: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
