/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{mjs,html}', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        linen: '#F5F1EA',
        paper: '#FBF9F5',
        sand: '#ECE5D9',
        line: '#DDD5C7',
        ink: { DEFAULT: '#1B2026', soft: '#474C52', mute: '#65696D' },
        navy: { DEFAULT: '#0B4F7C', deep: '#083B5E' },
        night: { DEFAULT: '#12202A', line: '#2A3843', mute: '#A7B0B7' },
        danger: '#9B2C2C',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', '"Iowan Old Style"', 'Georgia', 'serif'],
        sans: ['"Hanken Grotesk"', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
      },
      maxWidth: { site: '1320px', prose: '40rem' },
      transitionTimingFunction: { soft: 'cubic-bezier(.2,.7,.2,1)' },
    },
  },
  plugins: [],
};
