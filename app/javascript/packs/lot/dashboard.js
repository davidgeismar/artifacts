import { renderLotPlot } from './charts.js'
import { loader, artistDashboard, lotDetails, lotDashboard } from '../UIElements'
import { salesCountTemplate, liquidityRateTemplate, performanceRateTemplate, objectScoreTemplate, totalSaleAmountTemplate } from './templates'
import LotDashboardSelectors from './selectors'
import { renderBreadcrumb } from '../nav/nav'

const lotDashboardUI = new LotDashboardSelectors()

const toggleArtistLot = () => {
  if (!artistDashboard.classList.contains('hide')) {
    artistDashboard.classList.add('hide')
  }

  if (artistDashboard.classList.contains("grid")){
    artistDashboard.classList.remove('grid')
  }
  if (lotDashboard.classList.contains('hide')) {
    lotDashboard.classList.remove('hide')
  }
  if (!lotDashboard.classList.contains("grid")){
    lotDashboard.classList.add('grid')
  }
}
export const renderLotInfos = (lot) => {
  const template = `
    <div class="card__lot">
      <div class='card__image' style='background: url("${lot.dump.lotDetails.LotImages.GridImage}");'></div>
      <div class="card__content">
        <div class="card__title">${lot.title2} - ${lot.title1}</div>
        <p class="card__text">Description : ${lot.dump.extra_details.lotDescription}</p>
        <p class="card__text">Litterature : ${lot.dump.extra_details.lotLitterature}</p>
        <p class="card__text">Description : ${lot.dump.extra_details.lotDescription}</p>
        <p class="card__text">Sale date : ${lot.dump.lotDetails.SaleDate}</p>
        <p class="card__text">Sale Number : ${lot.dump.lotDetails.SaleNumber}</p>
        <p class="card__text">Lot Number : ${lot.dump.lotDetails.LotNumber}</p>
        <p class="card__text">Sale Number : ${lot.dump.lotDetails.SaleNumber}</p>
        <p class="card__text">${lot.dump.lotDetails.Pricevalues.PriceLabel} : ${lot.dump.lotDetails.Pricevalues.PrimaryPrice}</p>
        <p class="card__text">Estimate : ${lot.dump.extra_details.estimate}</p>
      </div>
    </div>
  `
  toggleArtistLot()
  lotDetails.innerHTML = template;
  lotDashboardUI.salesCountEl.innerHTML = salesCountTemplate(5);
  lotDashboardUI.liquidityRateEl.innerHTML = liquidityRateTemplate(15);
  lotDashboardUI.performanceRateEl.innerHTML = performanceRateTemplate(35);
  lotDashboardUI.objectScoreEl.innerHTML = objectScoreTemplate(5);
  lotDashboardUI.totalSalesEl.innerHTML = totalSaleAmountTemplate(1000);

}
export const renderLotDashboard = (lotId) => {
  window.history.pushState("", "", `/lot/${lotId}`);
  d3.json(`http://localhost:3000/lots/${lotId}`).then((data) => {
    window.localStorage.setItem('lotName', data.lot.title2);
    window.localStorage.setItem('lotId', lotId);
    renderBreadcrumb()
    renderLotInfos(data.lot);
    lotDashboardUI.scatterplot.innerHTML = "";
    renderLotPlot(data.sales);
  })
}

export const removeLotDashboard = () => {

  lotDashboard.classList.remove('grid');
  lotDashboard.classList.add('hide');
}
