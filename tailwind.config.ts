import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        '1250': '1250px',
        '1680': '1680px',
        '3xl': '1920px', // 1080p
        '4xl': '2560px', // 1440p
        '5xl': '3840px', // 4K
      },
      colors: {
        background: 'var(--background)',
        'background-dark': 'var(--background-dark)',
        foreground: 'var(--foreground)',
        accent: 'var(--accent)',
        'accent-secondary': 'var(--accent-secondary)',
        'accent-tertiary': 'var(--accent-tertiary)',
        border: 'var(--border)', // Border color
        'off-white': 'var(--off-white)',
      },
    },
  },
  plugins: [],
} satisfies Config;
