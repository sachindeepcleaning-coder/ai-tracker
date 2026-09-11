/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter","system-ui","sans-serif"], mono: ["JetBrains Mono","monospace"] },
      colors: {
        bg: "#0B0F1A",
        card: "#111827",
        surf: "#1F2937",
        border: "rgba(255,255,255,0.08)",
        primary: "#10B981",
        violet: "#8B5CF6",
      }
    },
  },
  plugins: [],
}
