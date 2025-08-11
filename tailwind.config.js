/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
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
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "bounce-music": {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "25%": { transform: "translateY(-15px) scale(1.1)" },
          "50%": { transform: "translateY(-25px) scale(1.2)" },
          "75%": { transform: "translateY(-10px) scale(1.05)" },
        },
        "float-music": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg) scale(1)" },
          "33%": { transform: "translateY(-20px) rotate(5deg) scale(1.1)" },
          "66%": { transform: "translateY(-10px) rotate(-3deg) scale(0.95)" },
        },
        "moon-glow": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.8", boxShadow: "0 0 20px rgba(255, 255, 0, 0.3)" },
          "50%": { transform: "scale(1.1)", opacity: "1", boxShadow: "0 0 40px rgba(255, 255, 0, 0.5)" }
        },
        "moonbeam": {
          "0%, 100%": { opacity: "0.3", transform: "scaleY(1)" },
          "50%": { opacity: "0.6", transform: "scaleY(1.2)" }
        },
        "moon-music": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)", opacity: "0.6" },
          "25%": { transform: "translateY(-10px) rotate(5deg)", opacity: "0.8" },
          "75%": { transform: "translateY(5px) rotate(-3deg)", opacity: "0.7" }
        },
        "moon-drift": {
          "0%": { transform: "translateX(0) translateY(0) rotate(0deg)", opacity: "0.5" },
          "50%": { transform: "translateX(20px) translateY(-15px) rotate(180deg)", opacity: "0.3" },
          "100%": { transform: "translateX(40px) translateY(-30px) rotate(360deg)", opacity: "0.1" }
        },
        "moonlight-ripple": {
          "0%": { transform: "scale(0.8)", opacity: "0.4" },
          "50%": { transform: "scale(1.2)", opacity: "0.2" },
          "100%": { transform: "scale(1.5)", opacity: "0" }
        },
        "starlight-trail": {
          "0%": { transform: "translateX(0) translateY(0) scale(1)", opacity: "0.7" },
          "50%": { transform: "translateX(-30px) translateY(20px) scale(1.2)", opacity: "0.9" },
          "100%": { transform: "translateX(-60px) translateY(40px) scale(0.8)", opacity: "0.2" }
        },
        "moonlight-staff": {
          "0%, 100%": { opacity: "0.2", transform: "scaleX(0.5)" },
          "50%": { opacity: "0.5", transform: "scaleX(1)" }
        },
        "twinkle": {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.5)" }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "bounce-music": "bounce-music 2s ease-in-out infinite",
        "float-music": "float-music 3s ease-in-out infinite",
        "moon-glow": "moon-glow 4s ease-in-out infinite",
        "moonbeam": "moonbeam 3s ease-in-out infinite",
        "moon-music": "moon-music 2.5s ease-in-out infinite",
        "moon-drift": "moon-drift 8s ease-out infinite",
        "moonlight-ripple": "moonlight-ripple 5s ease-out infinite",
        "starlight-trail": "starlight-trail 6s ease-in-out infinite",
        "moonlight-staff": "moonlight-staff 4s ease-in-out infinite",
        "twinkle": "twinkle 3s ease-in-out infinite",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
