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
          "25%": { transform: "translateY(-20px) scale(1.15)" },
          "50%": { transform: "translateY(-35px) scale(1.3)" },
          "75%": { transform: "translateY(-15px) scale(1.1)" },
        },
        "float-music": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg) scale(1)" },
          "33%": { transform: "translateY(-25px) rotate(8deg) scale(1.2)" },
          "66%": { transform: "translateY(-15px) rotate(-5deg) scale(0.9)" },
        },
        "moon-glow": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.9", boxShadow: "0 0 30px rgba(255, 255, 150, 0.4), 0 0 60px rgba(255, 255, 150, 0.2)" },
          "50%": { transform: "scale(1.15)", opacity: "1", boxShadow: "0 0 50px rgba(255, 255, 150, 0.6), 0 0 100px rgba(255, 255, 150, 0.3)" }
        },
        "moonbeam": {
          "0%, 100%": { opacity: "0.4", transform: "scaleY(1) rotate(0deg)" },
          "50%": { opacity: "0.8", transform: "scaleY(1.3) rotate(2deg)" }
        },
        "moon-music": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg) scale(1)", opacity: "0.7" },
          "25%": { transform: "translateY(-15px) rotate(8deg) scale(1.1)", opacity: "0.9" },
          "75%": { transform: "translateY(8px) rotate(-5deg) scale(0.95)", opacity: "0.8" }
        },
        "moon-drift": {
          "0%": { transform: "translateX(0) translateY(0) rotate(0deg) scale(1)", opacity: "0.6" },
          "50%": { transform: "translateX(25px) translateY(-20px) rotate(180deg) scale(1.1)", opacity: "0.4" },
          "100%": { transform: "translateX(50px) translateY(-40px) rotate(360deg) scale(0.8)", opacity: "0.1" }
        },
        "moonlight-ripple": {
          "0%": { transform: "scale(0.7)", opacity: "0.5" },
          "50%": { transform: "scale(1.4)", opacity: "0.3" },
          "100%": { transform: "scale(2)", opacity: "0" }
        },
        "starlight-trail": {
          "0%": { transform: "translateX(0) translateY(0) scale(1) rotate(0deg)", opacity: "0.8" },
          "50%": { transform: "translateX(-40px) translateY(25px) scale(1.3) rotate(180deg)", opacity: "1" },
          "100%": { transform: "translateX(-80px) translateY(50px) scale(0.7) rotate(360deg)", opacity: "0.2" }
        },
        "moonlight-staff": {
          "0%, 100%": { opacity: "0.3", transform: "scaleX(0.6) translateY(0)" },
          "50%": { opacity: "0.7", transform: "scaleX(1.1) translateY(-5px)" }
        },
        "twinkle": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1) rotate(0deg)" },
          "50%": { opacity: "1", transform: "scale(1.8) rotate(180deg)" }
        },
        "star-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.6", filter: "brightness(1)" },
          "50%": { transform: "scale(1.4)", opacity: "1", filter: "brightness(1.5)" }
        },
        "music-wave": {
          "0%, 100%": { transform: "scaleY(1) translateY(0)", opacity: "0.5" },
          "25%": { transform: "scaleY(1.5) translateY(-10px)", opacity: "0.8" },
          "50%": { transform: "scaleY(2) translateY(-20px)", opacity: "1" },
          "75%": { transform: "scaleY(1.2) translateY(-5px)", opacity: "0.7" }
        },
        "constellation": {
          "0%": { opacity: "0.3", transform: "rotate(0deg) scale(1)" },
          "50%": { opacity: "0.8", transform: "rotate(180deg) scale(1.2)" },
          "100%": { opacity: "0.3", transform: "rotate(360deg) scale(1)" }
        },
        "moon-phase": {
          "0%": { transform: "scale(1) rotate(0deg)", filter: "brightness(0.8)" },
          "25%": { transform: "scale(1.05) rotate(90deg)", filter: "brightness(1)" },
          "50%": { transform: "scale(1.1) rotate(180deg)", filter: "brightness(1.2)" },
          "75%": { transform: "scale(1.05) rotate(270deg)", filter: "brightness(1)" },
          "100%": { transform: "scale(1) rotate(360deg)", filter: "brightness(0.8)" }
        },
        "shooting-star": {
          "0%": { transform: "translateX(-100px) translateY(-100px) scale(0)", opacity: "0" },
          "10%": { transform: "translateX(-80px) translateY(-80px) scale(1)", opacity: "1" },
          "90%": { transform: "translateX(80px) translateY(80px) scale(1)", opacity: "1" },
          "100%": { transform: "translateX(100px) translateY(100px) scale(0)", opacity: "0" }
        },
        // 白天模式动画
        "sun-rotation": {
          "0%": { transform: "rotate(0deg) scale(1)", filter: "brightness(1)" },
          "50%": { transform: "rotate(180deg) scale(1.05)", filter: "brightness(1.2)" },
          "100%": { transform: "rotate(360deg) scale(1)", filter: "brightness(1)" }
        },
        "sun-glow": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.9", boxShadow: "0 0 40px rgba(255, 165, 0, 0.5), 0 0 80px rgba(255, 165, 0, 0.3)" },
          "50%": { transform: "scale(1.1)", opacity: "1", boxShadow: "0 0 60px rgba(255, 165, 0, 0.7), 0 0 120px rgba(255, 165, 0, 0.4)" }
        },
        "sun-rays": {
          "0%, 100%": { transform: "translateX(-50%) scaleY(1)", opacity: "0.6" },
          "50%": { transform: "translateX(-50%) scaleY(1.3)", opacity: "0.9" }
        },
        "sunbeam": {
          "0%, 100%": { opacity: "0.3", transform: "scaleY(1) rotate(0deg)" },
          "50%": { opacity: "0.6", transform: "scaleY(1.2) rotate(1deg)" }
        },
        "sun-pulse": {
          "0%": { transform: "scale(0.8)", opacity: "0.4" },
          "50%": { transform: "scale(1.3)", opacity: "0.2" },
          "100%": { transform: "scale(1.8)", opacity: "0" }
        },
        "sunny-trail": {
          "0%": { transform: "translateX(0) translateY(0) scale(1) rotate(0deg)", opacity: "0.6" },
          "50%": { transform: "translateX(-30px) translateY(20px) scale(1.2) rotate(180deg)", opacity: "0.9" },
          "100%": { transform: "translateX(-60px) translateY(40px) scale(0.8) rotate(360deg)", opacity: "0.3" }
        },
        "sunny-staff": {
          "0%, 100%": { opacity: "0.2", transform: "scaleX(0.7) translateY(0)" },
          "50%": { opacity: "0.5", transform: "scaleX(1.2) translateY(-3px)" }
        },
        "light-wave": {
          "0%, 100%": { transform: "scaleY(1) translateY(0)", opacity: "0.4" },
          "25%": { transform: "scaleY(1.3) translateY(-8px)", opacity: "0.7" },
          "50%": { transform: "scaleY(1.8) translateY(-15px)", opacity: "0.9" },
          "75%": { transform: "scaleY(1.1) translateY(-3px)", opacity: "0.6" }
        },
        "warm-float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg) scale(1)", opacity: "0.5" },
          "33%": { transform: "translateY(-15px) rotate(120deg) scale(1.1)", opacity: "0.7" },
          "66%": { transform: "translateY(-8px) rotate(240deg) scale(0.9)", opacity: "0.6" }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "bounce-music": "bounce-music 1.8s ease-in-out infinite",
        "float-music": "float-music 2.5s ease-in-out infinite",
        "moon-glow": "moon-glow 3.5s ease-in-out infinite",
        "moonbeam": "moonbeam 2.8s ease-in-out infinite",
        "moon-music": "moon-music 2.2s ease-in-out infinite",
        "moon-drift": "moon-drift 7s ease-out infinite",
        "moonlight-ripple": "moonlight-ripple 4.5s ease-out infinite",
        "starlight-trail": "starlight-trail 5.5s ease-in-out infinite",
        "moonlight-staff": "moonlight-staff 3.8s ease-in-out infinite",
        "twinkle": "twinkle 2.5s ease-in-out infinite",
        "star-pulse": "star-pulse 3s ease-in-out infinite",
        "music-wave": "music-wave 1.5s ease-in-out infinite",
        "constellation": "constellation 8s linear infinite",
        "moon-phase": "moon-phase 12s ease-in-out infinite",
        "shooting-star": "shooting-star 4s ease-out infinite",
        // 白天模式动画
        "sun-rotation": "sun-rotation 20s linear infinite",
        "sun-glow": "sun-glow 4s ease-in-out infinite",
        "sun-rays": "sun-rays 2s ease-in-out infinite",
        "sunbeam": "sunbeam 3.2s ease-in-out infinite",
        "sun-pulse": "sun-pulse 3.5s ease-out infinite",
        "sunny-trail": "sunny-trail 4.5s ease-in-out infinite",
        "sunny-staff": "sunny-staff 3.2s ease-in-out infinite",
        "light-wave": "light-wave 1.8s ease-in-out infinite",
        "warm-float": "warm-float 3.5s ease-in-out infinite",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
