import { fetchDataAndDisplayGraph } from './dashboard'
import { searchBar } from './components/search'
window.onload = () => route(window.location.pathname)

export const route = (pathName) => {
  switch(pathName) {
    case '/artists/pablo-picasso':
      fetchDataAndDisplayGraph('4093')
    case '/':
      document.getElementById('root').innerHTML = searchBar;
  }
}
