/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { lemon: '#FFF0C2', paper: '#FFFBF0', charcoal: '#25424C', ink: '#16262B', coral: '#FD8451', sienna: '#942911', falu: '#772014', coralDark: '#C05640', faluLight: '#7A3B30' },
      fontFamily: { display: ['Akira Expanded', 'sans-serif'], mono: ['JetBrains Mono', 'monospace'], rounded: ['SF Pro Rounded', 'sans-serif'], body: ['SF Pro', 'Inter', 'sans-serif'] },
    },
  },
  plugins: [],
};
