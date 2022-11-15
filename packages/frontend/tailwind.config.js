/** @type import("tailwindcss/types").Config */
module.exports = {
  content: ['./src/**/*.{html,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],
      },
    },
    fontSize: {
      '3xs': ['8px', '12px'],
      '2xs': ['12px', '16px'],
      xs: ['14px', '20px'],
      sm: ['15px', '22px'],
      base: ['16px', '24px'],
      lg: ['18px', '28px'],
      xl: ['20px', '30px'],
      '2xl': ['24px', '36px'],
      '3xl': ['32px', '36px'],
      '4xl': ['40px', '60px'],
    },
    colors: {
      current: 'currentColor',
      transparent: 'transparent',
      link: 'rgb(var(--link-rgb) / <alpha-value>)',
      white: '#FAFAFA',
      gray: {
        100: '#EDEDED',
        200: '#DFDFDF',
        300: '#D3D3D3',
        400: '#D0CED1',
        500: '#737373',
        550: '#888888',
        600: '#848484',
        650: '#5C5C5C',
        700: '#565656',
        800: '#424242',
        850: '#333333',
        860: '#323232',
        900: '#2F2F2F',
        950: '#111111',
      },
      black: '#1B1B1B',
      yellow: {
        200: '#FFC107',
        300: '#FDCF44',
        500: '#E5C227',
        700: '#CB9800',
      },
      purple: {
        100: '#7E41CC',
        300: '#F1D6FF',
        700: '#4A133C',
        800: '#32102A',
      },
      pink: {
        100: '#FF46C0',
        200: '#DB8BF7',
        900: '#AB3BD2',
      },
      green: {
        300: '#4EAB58',
        700: '#007408',
      },
      red: {
        100: '#FDD9D9',
        200: '#FF3F4A',
        300: '#FA3A3A',
        500: '#C32806',
        600: '#C71414',
        700: '#D70000',
        900: '#441111',
      },
      blue: {
        300: '#CBDFF9',
        400: '#BADAFF',
        450: '#96C0F7',
        500: '#53A2FF',
        600: '#2B5CD9',
        700: '#005DD7',
        900: '#112944',
      },
    },
    screens: {
      xs: '400px',
      sm: '550px',
      md: '750px',
      lg: '1000px',
    },
  },
  plugins: [],
}
