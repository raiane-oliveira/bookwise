import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "green-100": "#50B2C0",
        "green-200": "#255D6A",
        "green-300": "#0A313C",
        "purple-100": "#8381D9",
        "purple-200": "#2A2879",
        "gray-100": "#F8F9FC",
        "gray-200": "#E6E8F2",
        "gray-300": "#D1D6E4",
        "gray-400": "#8D95AF",
        "gray-500": "#303F73",
        "gray-600": "#252D4A",
        "gray-700": "#181C2A",
        "gray-800": "#0E1116",
      },
      fontFamily: {
        sans: ["var(--font-nunito-sans)"],
      },
      lineHeight: {
        base: "140%",
        relaxed: "160%",
      },
      spacing: {
        "4.5": "18px",
      },
      maxWidth: {
        app: "1440px",
      },
      backgroundImage: {
        "gradient-horizontal":
          "linear-gradient(90deg, #7FD1CC 0%, #9694F5 100%)",
        "gradient-vertical":
          "linear-gradient(180deg, #7FD1CC 0%, #9694F5 100%)",
      },
      gridTemplateColumns: {
        home: "minmax(20.25rem, 1fr) minmax(15rem, 20.25rem)",
      },
    },
  },
  plugins: [],
}
export default config
