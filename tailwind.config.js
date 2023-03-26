/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',

        // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            screens: {
                '3xl': '2000px'
            },
            colors: {
                darkBlue: '#0D1F29'
            },
            animation: {
                bounceCustom: 'bounceCustom 1s both ease-in-out infinite'
            },
            keyframes: {
                bounceCustom: {
                    '0%, 100%, 20%, 50%, 80%': {
                        transform: 'translateY(0)'
                    },
                    '40%': { transform: 'translateY(-30%)' },
                    '60%': { transform: 'translateY(-15%)' }
                }
            }
        }
    },
    plugins: [require('tailwind-scrollbar-hide')]
};
