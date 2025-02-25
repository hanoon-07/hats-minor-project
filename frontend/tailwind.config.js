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
        secondaryGray: '#2B2E3C',
        darkGray: '#15171A',
        
        textGreen: '#33E775',
        buttonGreen: '#A8FF53',
        buttonGreen2: '#A8FF53',

        orangeButton: '#381C09',

      },
      
    },
    fontFamily: {
      'inter': ["Inter"]
    }
  },
  plugins: [],
}

