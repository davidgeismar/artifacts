import { renderDashboard } from './artist/dashboard'
import { renderLotDashboard } from './lot/dashboard'
import { renderSearch } from './search/search'
import { renderBreadcrumb } from './nav/nav'

import UIElements from './UIElements'

window.addEventListener("DOMContentLoaded", () => route(window.location.pathname));
export const route = (pathName) => {
  renderBreadcrumb()
  const ui = new UIElements();
  if (RegExp(/\/artists\//).test(pathName)) {
    console.log('artists url')
    const artistId = pathName.substring(pathName.lastIndexOf('/') + 1)
    ui.searchBar.classList.add('hidden')
    return renderDashboard(artistId);
  }
  if (RegExp(/\/lot\//).test(pathName)){
    const lotId = pathName.substring(pathName.lastIndexOf('/') + 1)
    ui.searchBar.classList.add('hidden')
    return renderLotDashboard(lotId);
  }
  renderSearch()
}
