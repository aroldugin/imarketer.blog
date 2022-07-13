module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', './node_modules/tw-elements/dist/js/**/*.js',
  ],

  daisyui: {
    themes: ["winter"],
  },
  plugins: [require("daisyui"), require('tw-elements/dist/plugin')], 
}