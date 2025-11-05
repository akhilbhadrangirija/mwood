/** @type {import('@tailwindcss/vite').Config} */
const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007ec7',
        secondary: '#009fe3',
        accent: '#41c0f0',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #007ec7 0%, #009fe3 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #009fe3 0%, #41c0f0 100%)',
        'gradient-accent': 'linear-gradient(135deg, #41c0f0 0%, #007ec7 100%)',
        'gradient-full': 'linear-gradient(135deg, #007ec7 0%, #009fe3 50%, #41c0f0 100%)',
      },
    },
  },
  plugins: [],
}

export default config