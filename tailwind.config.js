/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'nunito':['Press Start 2P','cursive']
      },
      gridTemplateColumns:{
        'large':'15rem auto 30%',
        'large2':'15rem auto 20rem',
        'medium':'15rem auto',
        'medium-messaging':'15rem auto',
        'large-messaging':'15rem auto 18rem',
        'medium-network':'20rem auto',
        'medium-connections':'auto 20rem',
        'profile':'20% 30% 50%',
        'followed':'repeat(auto-fill, minmax(250px,1fr))',
        'mk':'repeat(auto-fill, minmax(200px,1fr))',
        'mk2':'repeat(auto-fill, minmax(250px,1fr))'
      },
      gridTemplateRows:{
        'profile':'20% 30% 50%',
      },
      screens:{
        'sm':'567px',
        'md':'960px',
        'lg':'1280px',
      }
    },
  },
  plugins: [require("daisyui")],
}
