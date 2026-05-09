/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#0A0F1E',
        surface: {
          DEFAULT: '#141B2E',
          elevated: '#1C2540',
        },
        accent: {
          DEFAULT: '#2B6BFF',
          dark: '#1A4FBF',
        },
        'text-primary': '#FFFFFF',
        'text-secondary': '#8896B3',
        'nav-inactive': '#5A6582',
        border: '#1E2A45',
        success: '#22C55E',
        error: '#EF4444',
      },
      fontSize: {
        display: ['28px', { lineHeight: '34px', fontWeight: '700' }],
        heading: ['20px', { lineHeight: '26px', fontWeight: '600' }],
        subheading: ['17px', { lineHeight: '22px', fontWeight: '600' }],
        price: ['18px', { lineHeight: '24px', fontWeight: '700' }],
        button: ['15px', { lineHeight: '20px', fontWeight: '600' }],
        body: ['14px', { lineHeight: '20px', fontWeight: '400' }],
        caption: ['12px', { lineHeight: '16px', fontWeight: '400' }],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
        '3xl': '48px',
      },
    },
  },
  plugins: [],
};
