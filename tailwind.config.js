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
        sans:    ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "sans-serif"],  // fixed: was --font-geist (not loaded)
        mono:    ["var(--font-jetbrains-mono)", "monospace"],
      },
      colors: {
        /* Backgrounds */
        background:   "var(--color-ink)",
        surface:      "var(--color-surface)",
        "surface-2":  "var(--color-surface-2)",

        /* Borders */
        "border-color":        "var(--color-border)",
        "border-color-bright": "var(--color-border-bright)",

        /* Accent */
        accent:         "var(--color-signal)",
        "accent-dim":   "var(--color-signal-dim)",
        "accent-glow":  "var(--color-signal-glow)",
        "accent-amber": "var(--color-ember)",
        "accent-rose":  "var(--color-fault)",

        /* Text */
        primary: "var(--color-stone)",
        muted:   "var(--color-fog)",

        /* Alias */
        success: "var(--color-signal)",
      },
    }
  },
  plugins: []
};
