/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        base: '#09090b',          // Deep zinc
        surface: '#121215',       // Clean card surface
        surfaceHover: '#18181b',  // Card hover
        border: '#27272a',        // Clean zinc border
        borderHover: '#3f3f46',   // Hover border
        accent: '#3b82f6',        // Classic clean blue / or clean white
        accentHover: '#60a5fa',
        textMain: '#fafafa',      // High contrast crisp text
        textMuted: '#a1a1aa',     // Secondary text
        textDim: '#71717a',       // Tertiary / caption text
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 10px 30px -4px rgba(0, 0, 0, 0.7)',
      },
    },
  },
  plugins: [],
}
