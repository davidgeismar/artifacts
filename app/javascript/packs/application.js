// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
require('./env')
require('./search/search')
require('./search/selectors')
require('./artist/charts')
require('./artist/dashboard')
require('./artist/selectors')
require('./artist/templates')
require('./nav/nav')
require('./shared/ui')
require('./routes')
require('./loader')
require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")
require('chart.js')
require('chartjs-chart-box-and-violin-plot')
require('moment')



// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)
