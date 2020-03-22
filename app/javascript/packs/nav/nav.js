import Selectors from './selectors'
import ArtistDashboard from '../artist/dashboard'
import SearchBar from '../search/search'
const ui = new Selectors()

const renderArtistSpan = (artistName, artistId) => ((artistName  && artistId) ? `<span data-id=${artistId} id='artist-name' class='breadbrumb-element'>${artistName}</span>` : `<span id='artist-name'></span>`)
export const renderBreadcrumb = () => {
  ui.navbar.classList.remove('hide');
  const artistName = localStorage.getItem("artistName");
  const artistId = localStorage.getItem("artistId");
  const lotName = localStorage.getItem("lotName");
  ui.breadcrumb.innerHTML = `<span id='back-homepage'> Search </span> > ${renderArtistSpan(artistName, artistId)} ${ lotName ? `> ${lotName}` : ''  }`;
  document.getElementById('artist-name').onclick =  () => new ArtistDashboard(artistId).render();
  document.getElementById('back-homepage').onclick = () => new SearchBar().render();
}
