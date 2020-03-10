import ArtistSelectors from './selectors'
import LotSelectors from '../lot/selectors'
import SharedUI from '../shared/ui'
import { renderScatterPlot } from './charts'
import { removeLotDashboard } from '../lot/dashboard'
import { renderBreadcrumb } from '../nav/nav'
import {
  salesCountTemplate,
  liquidityRateTemplate,
  performanceRateTemplate,
  artistScoreTemplate,
  totalSaleAmountTemplate,
  artistDescriptionTemplate,
 } from './templates'

const sharedUI = new SharedUI()
const artistSelectors = new ArtistSelectors()
const lotSelectors = new LotSelectors()

const toggleLotArtist = () => {
  if (!lotSelectors.dashboard.classList.contains('hide')){
    lotSelectors.dashboard.classList.add('hide');
  }
  if (lotSelectors.dashboard.classList.contains('grid')){
    lotSelectors.dashboard.classList.remove('grid');
  }
  if (artistSelectors.dashboard.classList.contains('hide')){
    artistSelectors.dashboard.classList.remove('hide');
  }
  if (!artistSelectors.dashboard.classList.contains('grid')){
    artistSelectors.dashboard.classList.add('grid');
  }
}
export const renderDashboard = (artistId) => {
  window.history.pushState("", "", `/artists/${artistId}`);
  if (artistSelectors.dashboard.classList.contains('hide')){
    d3.json(`http://localhost:3000/data/artist/${artistId}`).then((data) => {
    const { salesNumber, totalSalesAmount, artistName } = data;
    window.localStorage.setItem('artistName', artistName);
    window.localStorage.setItem('artistId', artistId);
    window.localStorage.removeItem('lotName');
    window.localStorage.removeItem('lotId');
    renderBreadcrumb()
    toggleLotArtist()
    sharedUI.loader.dispatchEvent(new Event('hide-loader'));
    artistSelectors.salesCountEl.innerHTML = salesCountTemplate(salesNumber);
    artistSelectors.liquidityRateEl.innerHTML = liquidityRateTemplate(15);
    artistSelectors.performanceRateEl.innerHTML = performanceRateTemplate(35);
    artistSelectors.artistScoreEl.innerHTML = artistScoreTemplate(5);
    artistSelectors.totalSalesEl.innerHTML = totalSaleAmountTemplate(totalSalesAmount);
    artistSelectors.artistDescription.innerHTML = artistDescriptionTemplate(artistName);
    artistSelectors.scatterplot.innerHTML = "";
    renderScatterPlot(data.grouped_by_sale_date, data.max);
  })
  }
}
