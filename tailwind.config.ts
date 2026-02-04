import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./types/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["NanumSquare", "system-ui", "sans-serif"],
      },

      fontSize: {
        title: ["20px", { lineHeight: "28px" }],
        subtitle: ["18px", { lineHeight: "26px" }],
        body: ["16px", { lineHeight: "24px" }],
      },

      fontWeight: {
        title: "700", // 20px Bold
        subtitle: "700", // 18px Bold
        bodyExtraBold: "800", // 16px ExtraBold
        bodyBold: "700", // 16px Bold
        body: "400", // 16px Regular
      },

      colors: {
        slate: {
          900: "#0F172A",
          800: "#1E293B",
          500: "#64748B",
          400: "#94A3B8",
          300: "#CBD5E1",
          200: "#E2E8F0",
          100: "#F1F5F9",
        },
        violet: {
          600: "#7C3AED",
          100: "#EDE9FE",
        },
        rose: {
          500: "#F43F5E",
        },
        lime: {
          300: "#BEF264",
        },
        amber: {
          800: "#92400E",
        },
      },
    },
  },
  plugins: [],
};

export default config;
