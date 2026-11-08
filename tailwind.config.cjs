module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}"],
  theme: {
    // Declared in full (not extended) so the tablet breakpoints keep ascending
    // source order; `extend` would append them after xl and let them win at
    // desktop widths.
    screens: {
      // Whole header nav: it fits from about 480px, so small Android tablets
      // in portrait (OPPO Pad Mini) and phones in landscape get it. Same
      // 540px as tw93.fun's $nav-full.
      nav: "540px",
      sm: "640px",
      md: "768px",
      pad: "1000px",
      lg: "1080px",
      wide: "1300px",
      xl: "1412px",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
