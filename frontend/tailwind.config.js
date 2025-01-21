/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryDark: '#000000',

        textRed: '#F6664C',
        backgroundRed: '#322525',
        
        textBlue: '#4D69F0',
        backgroundBlue: '#2A3A47',
        
        textGray: '#A8A8A8',
        buttonGray: '#494949',
        secondaryGray: '#333333',
        darkGray: '#262626',
        
        textGreen: '#33E775',
        buttonGreen: '#255B39',
        buttonGreen2: '#23D98D',

        orangeButton: '#381C09',

      },
      
    },
    fontFamily: {
      'inter': ["Inter"]
    }
  },
  plugins: [],
}

