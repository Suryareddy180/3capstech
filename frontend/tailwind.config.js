/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        accent: "var(--accent)",
        accent2: "var(--accent2)",
        ink: "var(--text-primary)",
        muted: "var(--text-secondary)",
        line: "var(--border)",
      },
      fontFamily: {
        display: ['"Cabinet Grotesk"', "system-ui", "sans-serif"],
        sans: ['"Satoshi"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        spinslow: {
          to: { transform: "rotate(360deg)" },
        },
        gradient: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        spinslow: "spinslow 40s linear infinite",
        gradient: "gradient 8s ease infinite",
      },
    },
  },
  plugins: [],
};
