export let baseDataApiURI;
if (process.env.RAILS_ENV == 'development') {
  baseDataApiURI = 'http://localhost:3000'
} else {
  baseDataApiURI = 'http://35.180.85.250:3000'
}
