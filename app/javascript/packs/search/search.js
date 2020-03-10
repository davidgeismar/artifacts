import SearchUI from './selectors'
import ArtistDashboard from '../artist/dashboard'
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

class SearchBar {
  constructor(){
    this.ui = new SearchUI();
    this.searchResults = new SearchResults()
    this.ui.searchInput.onfocus = (e) => {
      if (e.target.value) {
        this.searchResults.filterByArtist(e.target.value)
      }
    }
    let timeout = null;
    this.ui.searchInput.onkeyup = () => {
      clearTimeout(timeout);
       timeout = setTimeout(() => {
         this.searchResults.filterByArtist(this.ui.searchInput.value)
       }, 300);
     }
  }

  setLocalStorage(){
    window.localStorage.removeItem('lotName');
    window.localStorage.removeItem('lotId');
    window.localStorage.removeItem('artistName');
    window.localStorage.removeItem('artistId');
  }

  render() {
    window.history.pushState('', '', '/');
    this.setLocalStorage()
    renderBreadcrumb()
    this.ui.lotDashboard.classList.remove('grid');
    this.ui.lotDashboard.classList.add('hide');
    this.ui.artistDashboard.classList.remove('grid');
    this.ui.artistDashboard.classList.add('hide');
    this.ui.searchBar.classList.remove('hide');
    this.ui.searchBar.classList.remove('hidden');
  }
}

class SearchResults{
  constructor(){
    this.ui = new SearchUI();
  }

  removeChildNodes(){
    this.ui.searchResults.querySelectorAll(':scope > div').forEach(node => this.ui.searchResults.removeChild(node))
  }

  handleClicked(elem, artist){
    this.removeChildNodes(this.ui.searchResults);
    this.ui.searchInput.value = elem.text;
    this.ui.searchBar.classList.add('hide')
    this.ui.searchInput.value = ''
    new ArtistDashboard(artist.id).render()
  }

  createArtistNode(artist, index, resultsSize){
    let div = document.createElement("div")
    div.setAttribute("data-id", artist.id);
    div.setAttribute("class", `portfolio-item ${classList[resultsSize][index]}`)
    div.setAttribute("style", `background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url("${backgroundImages[index]}");background-repeat: no-repeat;background-size: cover;background-position: center center;`);
    div.textContent = artist.full_name
    div.onclick = () => this.handleClicked(div, artist);
    return div
  }

  displayArtists(artists){
    const artistSubset = artists.slice(0, 6)
    console.log(artistSubset);
    artistSubset.forEach((artist, index) => {
      const artistNode = this.createArtistNode(artist, index, artistSubset.length)
      this.ui.searchResults.append(artistNode)
    })
  }

  filterByArtist(filter){
    this.removeChildNodes();
    fetch(`http://localhost:3000/artists?filter=${filter}`)
      .then((response) => {
        response.json().then(artists => this.displayArtists(artists));
      })
    }
}

export default SearchBar
