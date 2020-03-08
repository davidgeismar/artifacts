import { renderScatterPlot, renderLotPlot } from './charts.js'
import { loader, artistDashboard, lotDetails, lotDashboard } from './UIElements'

export const fetchDataAndDisplayGraph = (artistId) => {
  d3.json(`http://localhost:3000/data/artist/${artistId}`).then((data) => {
    artistDashboard.classList.remove('hide')
    artistDashboard.classList.add('grid')
    d3.selectAll("svg > *").remove();
    loader.dispatchEvent(new Event('hide-loader'))
    renderScatterPlot(data.grouped_by_sale_date, data.max)
  })
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
  artistDashboard.classList.add('hide')
  artistDashboard.classList.remove('grid')
  lotDashboard.classList.remove('hide')
  lotDashboard.classList.add('grid')
  lotDetails.innerHTML = template;

}
export const displayLotInfos = (lotId) => {
  d3.json(`http://localhost:3000/lots/${lotId}`).then((data) => {
    // debugger
    console.log(data)
    d3.selectAll("svg > *").remove();
    renderLotInfos(data.lot)
    renderLotPlot(data.sales)
    // renderLotPlot(data.grouped_by_sale_date, data.max)
  })
}
