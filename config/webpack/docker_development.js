process.env.NODE_ENV = process.env.NODE_ENV || 'docker_development';

const environment = require('./environment');

module.exports = environment.toWebpackConfig();
