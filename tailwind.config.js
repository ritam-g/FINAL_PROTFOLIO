/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-geist)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"]
      },
      colors: {
        background: "var(--color-bg)",
        surface: "var(--color-surface)",
        "border-color": "var(--color-border)",
        accent: "var(--color-accent)",
        "accent-glow": "var(--color-accent-glow)",
        "accent-amber": "var(--color-accent-amber)",
        "accent-rose": "var(--color-accent-rose)",
        primary: "var(--color-text-primary)",
        muted: "var(--color-text-muted)",
        success: "var(--color-success)"
      }
    }
  },
  plugins: []
};
