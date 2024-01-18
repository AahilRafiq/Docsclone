/** @type {import('tailwindcss').Config} */
export default {
  /** @type {import('rippleui').Config} */
	rippleui: {
		removeThemes: ['dark']
	},
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('rippleui')],
}

