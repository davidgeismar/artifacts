process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const webpack = require('webpack')


const environment = require('./environment')

// console.log('envi',   process.env.RAILS_ENV)
// environment.plugins.prepend(
//   'Provide',
//   new webpack.DefinePlugin({ "process.env": { RAILS_ENV: process.env.RAILS_ENV } })
// )

module.exports = environment.toWebpackConfig()
