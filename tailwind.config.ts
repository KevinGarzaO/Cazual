import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0B0B0B',
        card: '#151515',
        text: '#FFFFFF',
        textSecondary: '#B0B0B0',
        premium: '#D4AF37',
        success: '#22C55E',
        danger: '#EF4444',
      },
      boxShadow: {
        glow: '0 20px 80px rgba(212, 175, 55, 0.12)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
