// tailwind.config.js
const { heroui } = require('@heroui/theme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/@heroui/theme/dist/components/(button|input|modal|pagination|select|tabs|toast|ripple|spinner|form|listbox|divider|popover|scroll-shadow).js'
  ],
  theme: {
    extend: {}
  },
  darkMode: 'class',
  plugins: [heroui()]
}
