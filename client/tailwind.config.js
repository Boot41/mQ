const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Paths from the original config
    "app/**/*.{ts,tsx}", // Paths from the new config
    "components/**/*.{ts,tsx}", // Paths from the new config
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
        "3xl": "1600px",
        "4xl": "1920px",
        "6xl": "1920px",
      },
      maxWidth: {
        "3xl": "1600px",
        "4xl": "1920px",
      },
    },
    extend: {
      scrollbar: {
        thin: "2px",
        thumb: "gray",
        track: "white",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "slide-in": {
          "0%": { opacity: 0, transform: "translateY(100px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        progress: {
          "0%": { strokeDasharray: "0 628" },
          "100%": { strokeDasharray: "628 0" },
        },
      },
      animation: {
        "slide-in": "slide-in 1s ease-out forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        progress: "progress 2s ease-out forwards",
      },
      perspective: {
        1000: "1000px",
      },
      backfaceVisibility: {
        hidden: "hidden",
      },
      transformStyle: {
        "3d": "preserve-3d",
      },
      rotate: {
        180: "180deg",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".backface-hidden": {
          "backface-visibility": "hidden",
        },
        ".perspective-1000": {
          perspective: "1000px",
        },
        ".transform-style-3d": {
          "transform-style": "preserve-3d",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
    require("tailwindcss-animate"),
  ],
};
