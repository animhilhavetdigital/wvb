/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          dark: '#051A24',
          secondary: '#0D212C',
          muted: '#273C46',
          light1: '#F6FCFF',
          light2: '#E0EBF0',
        },
        background: '#ffffff',
        primary: {
          DEFAULT: '#051A24',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#f4f1ea',
          foreground: '#051A24',
        },
        muted: {
          DEFAULT: '#f1ede4',
          foreground: '#64748b',
        },
        border: 'rgba(5, 26, 36, 0.1)',
        card: {
          DEFAULT: '#ffffff',
          foreground: '#051A24',
        },
        ring: '#051A24',
      },
      fontFamily: {
        sans: ['"PP Neue Montreal"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['"PP Mondwest"', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace']
      },
      boxShadow: {
        'button-primary': '0 1px 2px 0 rgba(5,26,36,0.1), 0 4px 4px 0 rgba(5,26,36,0.09), 0 9px 6px 0 rgba(5,26,36,0.05), 0 17px 7px 0 rgba(5,26,36,0.01), 0 26px 7px 0 rgba(5,26,36,0), inset 0 2px 8px 0 rgba(255,255,255,0.5)',
        'button-secondary': '0 0 0 0.5px rgba(0,0,0,0.05), 0 4px 30px rgba(0,0,0,0.08)',
        'card-subtle': '0 4px 16px rgba(0,0,0,0.08)',
        'floating-pill': '0 10px 30px -5px rgba(5,26,36,0.15), 0 0 0 1px rgba(5,26,36,0.06)'
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'marquee-fast': 'marquee 10s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
}
