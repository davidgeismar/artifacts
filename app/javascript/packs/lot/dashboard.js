import { renderLotPlot } from './charts.js'
import { loader, artistDashboard, lotDetails, lotDashboard } from '../UIElements'
import { salesCountTemplate, liquidityRateTemplate, performanceRateTemplate, objectScoreTemplate, totalSaleAmountTemplate, lotDescriptionTemplate } from './templates'
import LotDashboardSelectors from './selectors'
import { renderBreadcrumb } from '../nav/nav'

class Dashboard {

  constructor(){
    this.ui = new LotDashboardSelectors()
  }
  toggleArtistLot(){
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

  removeLotDashboard(){
    lotDashboard.classList.remove('grid');
    lotDashboard.classList.add('hide');
  }

  renderLotInfos(data){
    console.log(data)
    this.toggleArtistLot()
    lotDetails.innerHTML = lotDescriptionTemplate(data.lot);
    this.ui.salesCountEl.innerHTML = salesCountTemplate(data.sales_count);
    this.ui.liquidityRateEl.innerHTML = liquidityRateTemplate(15);
    this.ui.performanceRateEl.innerHTML = performanceRateTemplate(data.performance);
    this.ui.objectScoreEl.innerHTML = objectScoreTemplate(5);
    this.ui.totalSalesEl.innerHTML = totalSaleAmountTemplate(data.total);

  }
  render(lotId){
    window.history.pushState("", "", `/lot/${lotId}`);
    d3.json(`http://localhost:3000/lots/${lotId}`).then((data) => {
      window.localStorage.setItem('lotName', data.lot.title2);
      window.localStorage.setItem('lotId', lotId);
      renderBreadcrumb()
      this.renderLotInfos(data);
      this.ui.scatterplot.innerHTML = "";
      renderLotPlot(data.sales);
    })
  }
}

export default Dashboard