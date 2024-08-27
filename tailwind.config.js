/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        'custom-layout-for-chatPage' : '1fr 2fr 1fr',
        'custom-layout-for-rightsidebar' : '1fr 1fr 1fr'
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.hide-scrollbar': {
          /* Hide scrollbar for WebKit browsers (Chrome, Safari, etc.) */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          /* Hide scrollbar for IE, Edge */
          '-ms-overflow-style': 'none',
          /* Hide scrollbar for Firefox */
          'scrollbar-width': 'none',
        },
      };

      addUtilities(newUtilities);
    },
  ],
}

