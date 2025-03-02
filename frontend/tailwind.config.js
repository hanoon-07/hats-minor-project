/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#A8FF53', // Lime green
        'primary-dark': '#8DD639',
        secondary: '#5CB8FF', // Light blue
        'secondary-dark': '#3A9BF7',

        'dark-bg': '#12141D',
        'card-bg': '#1E2130',
        'light-bg': '#262A3B',

        'light-text': '#F5F5F5',
        'dark-text': '#121212',
        'grey-text': '#9DA2B1',
        
        success: '#A8FF53', // Using primary color
        warning: '#FFD166',
        danger: '#FF6B6B',




        

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

