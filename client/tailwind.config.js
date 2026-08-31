/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#000000",
        "on-primary": "#ffffff",
        "primary-container": "#1b1b1b",
        "on-primary-container": "#848484",
        "inverse-primary": "#c6c6c6",
        
        "secondary": "#3e627e",
        "on-secondary": "#ffffff",
        "secondary-container": "#badeff",
        "on-secondary-container": "#3f637f",
        "secondary-fixed": "#cbe6ff",
        "secondary-fixed-dim": "#a7cbeb",
        
        "surface": "#A0C4E4",
        "surface-dim": "#dadada",
        "surface-bright": "#f9f9f9",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f3f3f3",
        "surface-container": "#eeeeee",
        "surface-container-high": "#e8e8e8",
        "surface-container-highest": "#e2e2e2",
        "surface-variant": "#e2e2e2",
        "surface-tint": "#5e5e5e",
        
        "container": "#FFFFFF",
        "on-container": "#000000",
        "accent-blue": "#B9D5EE",
        "background": "#A0C4E4",
        "on-background": "#1b1b1b",
        "on-surface": "#1b1b1b",
        "on-surface-variant": "#4c4546",
        
        "outline": "#7e7576",
        "outline-variant": "#cfc4c5",
        
        "error": "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "md": "0.5rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "full": "9999px"
      },
      spacing: {
        "gutter": "24px",
        "margin-desktop": "80px",
        "margin-mobile": "20px",
        "unit": "8px",
        "container-max": "1200px",
        "section-gap": "80px"
      },
      fontFamily: {
        "headline-md": ["Playfair Display", "serif"],
        "headline-lg": ["Playfair Display", "serif"],
        "display-lg": ["Playfair Display", "serif"],
        "body-lg": ["DM Sans", "sans-serif"],
        "body-md": ["DM Sans", "sans-serif"],
        "label-lg": ["DM Sans", "sans-serif"],
        "caption": ["DM Sans", "sans-serif"]
      }
    },
  },
  plugins: [],
}
