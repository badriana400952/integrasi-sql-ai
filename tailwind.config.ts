/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
       boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "slide-down": "slideDown 0.3s ease-out",
        spotlight: "spotlight 2s ease .75s 1 forwards",

      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: 0,
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: 0.6 },
          "50%": { opacity: 1 },
        },
        slideDown: {
          "0%": { transform: "translateY(-10%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
      colors: {
        primary: {
          DEFAULT: '#4361ee',
          light: '#eaf1ff',
          'dark-light': 'rgba(67,97,238,.15)'
        },
        secondary: {
          DEFAULT: '#805dca',
          light: '#ebe4f7',
          'dark-light': 'rgb(128 93 202 / 15%)'
        },
        success: {
          DEFAULT: '#00ab55',
          light: '#ddf5f0',
          'dark-light': 'rgba(0,171,85,.15)'
        },
        danger: {
          DEFAULT: '#e7515a',
          light: '#fff5f5',
          'dark-light': 'rgba(231,81,90,.15)'
        },
        warning: {
          DEFAULT: '#e2a03f',
          light: '#fff9ed',
          'dark-light': 'rgba(226,160,63,.15)'
        },
        info: {
          DEFAULT: '#2196f3',
          light: '#e7f7ff',
          'dark-light': 'rgba(33,150,243,.15)'
        },
        dark: {
          DEFAULT: '#3b3f5c',
          light: '#eaeaec',
          'dark-light': 'rgba(59,63,92,.15)'
        },
        black: {
          DEFAULT: '#0e1726',
          light: '#e3e4eb',
          'dark-light': 'rgba(14,23,38,.15)'
        },
        white: {
          DEFAULT: '#ffffff',
          light: '#e0e6ed',
          dark: '#888ea8'
        }
      },
      fontFamily: {
        nunito: [
          'sans-serif'
        ]
      },
      spacing: {
        '4.5': '18px'
      },
      // boxShadow: {
      //   '3xl': '0 2px 2px rgb(224 230 237 / 46%), 1px 6px 7px rgb(224 230 237 / 46%)'
      // },
      typography: '({ theme }) => ({\r\n        DEFAULT: {\r\n          css: {\r\n            "--tw-prose-invert-headings": theme("colors.white.dark"),\r\n            "--tw-prose-invert-links": theme("colors.white.dark"),\r\n            h1: { fontSize: "40px", marginBottom: "0.5rem", marginTop: 0 },\r\n            h2: { fontSize: "32px", marginBottom: "0.5rem", marginTop: 0 },\r\n            h3: { fontSize: "28px", marginBottom: "0.5rem", marginTop: 0 },\r\n            h4: { fontSize: "24px", marginBottom: "0.5rem", marginTop: 0 },\r\n            h5: { fontSize: "20px", marginBottom: "0.5rem", marginTop: 0 },\r\n            h6: { fontSize: "16px", marginBottom: "0.5rem", marginTop: 0 },\r\n            p: { marginBottom: "0.5rem" },\r\n            li: { margin: 0 },\r\n            img: { margin: 0 },\r\n          },\r\n        },\r\n      })',
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [],
};
