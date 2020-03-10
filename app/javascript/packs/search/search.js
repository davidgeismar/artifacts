import SearchUI from './selectors'
import { renderDashboard } from '../artist/dashboard'
import { renderBreadcrumb } from '../nav/nav'
const backgroundImages = ['/dejeuner-sur-herbe.jpg', '/guernica.jpeg', '/nuit-etoile.jpg', '/le-cri.png', '/naissance-de-venus.jpg', '/les-menines.jpg']

const classList = {
  '1': ['extra-large'],
  '2': ['large', 'large'],
  '3': ['large', 'large', 'large'],
  '4': ['large', 'medium', 'large', 'medium'],
  '5': ['large', 'medium', 'large', 'medium', 'tall'],
  '6': ['medium', 'large', 'medium', 'small', 'tall', 'wide'],
}

const searchUI = new SearchUI()



// class SearchBar {
//   constructor(){
//     this.searchUI = new SearchUI();
//     this.searchUI.searchInput.onfocus = (e) => {
//       if (e.target.value) {
//         filterByArtist(e.target.value)
//       }
//     }
//     let timeout = null;
//     this.searchUI.searchInput.onkeyup = () => {
//       clearTimeout(timeout);
//        timeout = setTimeout(() => {
//          filterByArtist(this.searchUI.searchInput.value)
//        }, 300);
//      }
//   }
//
//   setLocalStorage(){
//     window.localStorage.removeItem('lotName');
//     window.localStorage.removeItem('lotId');
//     window.localStorage.removeItem('artistName');
//     window.localStorage.removeItem('artistId');
//   }
//
//   render() {
//     window.history.pushState('', '', '/');
//     this.setLocalStorage()
//     renderBreadcrumb()
//     this.searchUI.lotDashboard.classList.remove('grid');
//     this.searchUI.lotDashboard.classList.add('hide');
//     this.searchUI.artistDashboard.classList.remove('grid');
//     this.searchUI.artistDashboard.classList.add('hide');
//     this.searchUI.searchBar.classList.remove('hide');
//     this.searchUI.searchBar.classList.remove('hidden');
//   }
// }

searchUI.searchInput.onfocus = (e) => {
  if (e.target.value) {
    filterByArtist(e.target.value)
  }
}

let timeout = null;
searchUI.searchInput.onkeyup = () => {
  clearTimeout(timeout);
   timeout = setTimeout(() => {
     filterByArtist(searchUI.searchInput.value)
   }, 300);
 }

const removeChildNodes = () => {
  searchUI.searchResults.querySelectorAll(':scope > div').forEach(node => searchUI.searchResults.removeChild(node))
}

export const renderSearch = () => {
  console.log('renderSearch')
  window.history.pushState('', '', '/');
  window.localStorage.removeItem('lotName');
  window.localStorage.removeItem('lotId');
  window.localStorage.removeItem('artistName');
  window.localStorage.removeItem('artistId');
  renderBreadcrumb()
  searchUI.lotDashboard.classList.remove('grid');
  searchUI.lotDashboard.classList.add('hide');
  searchUI.artistDashboard.classList.remove('grid');
  searchUI.artistDashboard.classList.add('hide');
  searchUI.searchBar.classList.remove('hide');
  searchUI.searchBar.classList.remove('hidden');
}


export const filterByArtist = (filter) => {
  removeChildNodes()

  fetch(`http://localhost:3000/artists?filter=${filter}`)
    .then((response) => {
      response.json()
        .then(artists => displayArtists(artists))
    })
}


const handleClicked = (elem, artist) => {
  removeChildNodes(searchUI.searchResults);
  searchUI.searchInput.value = elem.text;
  searchUI.searchBar.classList.add('hide')
  searchUI.searchInput.value = ''
  // d3.selectAll("svg > *").remove();
  renderDashboard(artist.id)
}

const createArtistNode = (artist, index, resultsSize) => {
  let div = document.createElement("div")
  div.setAttribute("data-id", artist.id);
  div.setAttribute("class", `portfolio-item ${classList[resultsSize][index]}`)
  div.setAttribute("style", `background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url("${backgroundImages[index]}");background-repeat: no-repeat;background-size: cover;background-position: center center;`);
  div.textContent = artist.full_name
  div.onclick = () => handleClicked(div, artist);
  return div
}

const displayArtists = (artists) => {
  const artistSubset = artists.slice(0, 6)
  console.log(artistSubset);
  artistSubset.forEach((artist, index) => {
    const artistNode = createArtistNode(artist, index, artistSubset.length)
    searchUI.searchResults.append(artistNode)
  })
}
