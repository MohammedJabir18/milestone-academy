import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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

        /* Milestone Brand Colors */
        'bg-primary': "var(--bg-primary)",
        'bg-secondary': "var(--bg-secondary)",
        'bg-card': "var(--bg-card)",
        'bg-dark': "var(--bg-dark)",
        'bg-dark-card': "var(--bg-dark-card)",
        
        green: {
          50: "var(--green-50)",
          100: "var(--green-100)",
          200: "var(--green-200)",
          300: "var(--green-300)",
          400: "var(--green-400)",
          500: "var(--green-500)",
          600: "var(--green-600)",
          700: "var(--green-700)",
          800: "var(--green-800)",
          900: "var(--green-900)",
        },

        /* Branded Accents */
        brandGold: "var(--accent-gold)",
        brandMint: "var(--accent-mint)",
        brandNeon: "var(--accent-neon)",

        'text-primary': "var(--text-primary)",
        'text-secondary': "var(--text-secondary)",
        'text-muted': "var(--text-muted)",
        'text-inverse': "var(--text-inverse)",

        'border-light': "var(--border-light)",
        'border-medium': "var(--border-medium)",
      },
      boxShadow: {
        green: "var(--shadow-green)",
        card: "var(--shadow-card)",
        lift: "var(--shadow-lift)",
      },
      backgroundImage: {
        "gradient-hero": "var(--gradient-hero)",
        "gradient-green": "var(--gradient-green)",
        "gradient-dark": "var(--gradient-dark)",
        "gradient-glow": "var(--gradient-glow)",
      },
      fontFamily: {
        serif: ["var(--font-instrument-serif)", "serif"],
        sans: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      spacing: {
        section: "var(--section-padding)",
      },
      maxWidth: {
        container: "var(--container-max)",
      },
      borderRadius: {
        sm: "var(--r-sm)",
        md: "var(--r-md)",
        lg: "var(--r-lg)",
        xl: "var(--r-xl)",
        pill: "var(--r-pill)",
      },
      animation: {
        ripple: "ripple 0.6s linear",
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 50s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        ripple: {
          "0%": { transform: "translate(-50%, -50%) scale(0)", opacity: "1" },
          "100%": { transform: "translate(-50%, -50%) scale(4)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
