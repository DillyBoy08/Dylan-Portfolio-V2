/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Bricolage Grotesque', 'system-ui', 'sans-serif'],
        sans: ['Karla', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        canvas:       '#F9F8F4',
        'canvas-alt': '#F0EDE5',
        ink:          '#221D15',
        'ink-2':      '#726A58',
        'ink-3':      '#9E9787',
        line:         '#E2DED6',
        'line-mid':   '#CCC8BE',
        accent:       '#B5623D',
        'accent-deep':'#8E4A2A',
      },
    },
  },
  plugins: [],
}
