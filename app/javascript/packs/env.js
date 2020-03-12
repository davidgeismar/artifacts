export let baseDataApiURI;
if (process.env.RAILS_ENV == 'development') {
  baseDataApiURI = 'http://localhost:3000'
} else {
  baseDataApiURI = 'data_api'
}
