export let baseDataApiURI;
if (process.env.RAILS_ENV == 'development') {
  baseDataApiURI = 'http://localhost:3000'
} else {
  baseDataApiURI = `${window.location.origin}:3000`
}
