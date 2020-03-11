import { renderLotPlot } from './charts.js';
import {
  salesCountTemplate,
  liquidityRateTemplate,
  performanceRateTemplate,
  objectScoreTemplate,
  totalSaleAmountTemplate,
  lotDescriptionTemplate
} from './templates';
import ArtistDashboardSelectors from '../artist/selectors';
import LotDashboardSelectors from './selectors';
import { renderBreadcrumb } from '../nav/nav';
import * as d3 from 'd3';

class Dashboard {

  constructor(){
    this.ui = new LotDashboardSelectors();
    this.artistDashboardUI = new ArtistDashboardSelectors();
  }
  toggleArtistLot(){
    const artistDashboard = this.artistDashboardUI.dashboard
    const lotDashboard = this.ui.dashboard
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

  updateDashboard(data){
    const { description, salesCountEl, liquidityRateEl, performanceRateEl, objectScoreEl, totalSalesEl } = this.ui
    description.innerHTML = lotDescriptionTemplate(data.lot);
    salesCountEl.innerHTML = salesCountTemplate(data.sales_count);
    liquidityRateEl.innerHTML = liquidityRateTemplate(15);
    performanceRateEl.innerHTML = performanceRateTemplate(data.performance);
    objectScoreEl.innerHTML = objectScoreTemplate(5);
    totalSalesEl.innerHTML = totalSaleAmountTemplate(data.total);
  }

  renderLotInfos(data){
    this.toggleArtistLot();
    this.updateDashboard(data);
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
