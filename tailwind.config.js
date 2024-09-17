import flowbite from 'flowbite-react/tailwind'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    // "./routes/**/*.{html,js,jsx}",
    // "./pages/**/*.{html,js,jsx}",
    // "./components/**/*.{html,js,jsx}",
    "./src/**/*.{html,js,jsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
  ],
}

