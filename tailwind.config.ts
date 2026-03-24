import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charbon: {
          900: '#0f0f0f',
          800: '#1a1a1a',
          700: '#242424',
          600: '#2e2e2e',
          500: '#3a3a3a',
        },
        flamme: {
          600: '#c2410c',
          500: '#ea580c',
          400: '#f97316',
          300: '#fb923c',
          100: '#ffedd5',
        },
        acier: {
          100: '#f1f5f9',
          200: '#e2e8f0',
          400: '#94a3b8',
          600: '#475569',
        },
        rouge: '#DC2626',
        bleu: '#1e3a5f',
      },
      fontFamily: {
        display: ['Oswald', 'var(--font-oswald)', 'sans-serif'],
        body: ['Barlow', 'var(--font-barlow)', 'sans-serif'],
        mono: ['Space Mono', 'var(--font-space-mono)', 'monospace'],
      },
      backgroundImage: {
        'gradient-flamme': 'linear-gradient(135deg, #ea580c 0%, #DC2626 100%)',
      },
      keyframes: {
        slideUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        slideUp: 'slideUp 0.6s ease-out forwards',
        fadeIn: 'fadeIn 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;
