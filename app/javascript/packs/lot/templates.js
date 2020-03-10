export const salesCountTemplate = (kpi) => `<div><span class='kpi'>${kpi}</span><br> <span class='indicator'>Sales</span></div>`
export const totalSaleAmountTemplate = (kpi) => `<div><span class='kpi'>$${kpi}</span><br> <span class='indicator'>Total Sales</span></div>`
export const liquidityRateTemplate = (kpi) => `<div><span class='kpi'>${kpi}%</span><br> <span class='indicator'>liquidity</span> </div>`
export const performanceRateTemplate = (kpi) => `<div><span class='kpi'>${Math.round(kpi * 100)/100}</span><br> <span class='indicator'>Performance</span> </div>`
export const objectScoreTemplate = (kpi) => `<div><span class='kpi'>${kpi}</span><br><span class='indicator'>Global</span>Unique Object </div>`
export const lotDescriptionTemplate = (lot) => `
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
