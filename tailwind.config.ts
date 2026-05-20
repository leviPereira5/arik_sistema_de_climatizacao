import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fraunces: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
      },
      colors: {
        "green-primary": "var(--green-primary)",
        "green-light": "var(--green-light)",
        "green-mid": "var(--green-mid)",
        "green-dark": "var(--green-dark)",
        "amber-accent": "var(--amber-accent)",
        "bg-warm": "var(--bg-warm)",
        "text-dark": "var(--text-dark)",
        "text-muted": "var(--text-muted)",
        "card-bg": "var(--card-bg)",
      },
    },
  },
  plugins: [],
};
export default config;
