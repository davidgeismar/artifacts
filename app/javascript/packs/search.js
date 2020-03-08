import { slugify } from './utils.js'
import { searchResults, searchInput, closeSearchIcon, searchBar, artistDashboard, lotDashboard } from './UIElements'

const backgroundImages = ['/dejeuner-sur-herbe.jpg', '/guernica.jpeg', '/nuit-etoile.jpg', '/le-cri.png', '/naissance-de-venus.jpg', '/les-menines.jpg']

const classList = {
  '1': ['extra-large'],
  '2': ['large', 'large'],
  '3': ['large', 'large', 'large'],
  '4': ['large', 'medium', 'large', 'medium'],
  '5': ['large', 'medium', 'large', 'medium', 'tall'],
  '6': ['medium', 'large', 'medium', 'small', 'tall', 'wide'],
}

// window.onclick = () => removeChildNodes(artistDashboard);

searchInput.onclick = (e) => e.stopPropagation();
artistDashboard.onclick = (e) => e.stopPropagation();

searchInput.onfocus = (e) => {
  console.log(e.target.value)
  if (e.target.value) {
    filterByArtist(e.target.value)
  }
}

let timeout = null;
searchInput.onkeyup = () => {
  clearTimeout(timeout);
   timeout = setTimeout(() => {
     filterByArtist(searchInput.value)
   }, 300);
}

const removeChildNodes = () => {
  searchResults.querySelectorAll(':scope > div').forEach(node => searchResults.removeChild(node))
}

export const filterByArtist = (filter) => {
  removeChildNodes()

  fetch(`http://localhost:3000/artists?filter=${filter}`)
    .then((response) => {
      response.json()
        .then(artists => displayArtists(artists))
    })
}

const repositionSearchBar = () => {
  closeSearchIcon.setAttribute("style", 'margin: 0px; top: 20px; right: 20px; transition: all 2s')
  searchInput.setAttribute("style", 'margin: 0px; top: 20px; right: 20px; transition: all 2s')
}

const handleClicked = (elem, artist) => {
  removeChildNodes(artistDashboard);
  searchInput.value = elem.text;
  artistDashboard.dispatchEvent(new CustomEvent('artistSelected', { 'detail': elem.getAttribute('data-id')}))
  window.history.pushState("", "", `/artists/${slugify(artist.full_name)}`);
  searchBar.classList.add('hide')
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
    searchResults.append(artistNode)
  })
}
