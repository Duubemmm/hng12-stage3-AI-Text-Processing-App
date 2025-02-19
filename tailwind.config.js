/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
'primary': '#757684',
'secondary': '#ffed4a',
'danger': '#e3342f',
'card-color': '#464353',
'text-color': '#baada5',
'random-color': '#485b4e',
      },
    },
  },
  plugins: [],
}

