import ArtistSelectors from './selectors';
import LotSelectors from '../lot/selectors';
import SharedUI from '../shared/ui';
import { renderScatterPlot } from './charts';
import { removeLotDashboard } from '../lot/dashboard';
import { renderBreadcrumb } from '../nav/nav';
import { baseDataApiURI } from '../env'
import {
  salesCountTemplate,
  liquidityRateTemplate,
  performanceRateTemplate,
  artistScoreTemplate,
  totalSaleAmountTemplate,
  artistDescriptionTemplate,
} from './templates';
import * as d3 from 'd3';


class Dashboard {
  constructor(artistId){
    this.artistId = artistId;
    this.sharedUI = new SharedUI();
    this.artistUI = new ArtistSelectors()
    this.lotUI = new LotSelectors()
  }
  toggleLotArtist(){
    if (!this.lotUI.dashboard.classList.contains('hide')){
      this.lotUI.dashboard.classList.add('hide');
    }
    if (this.lotUI.dashboard.classList.contains('grid')){
      this.lotUI.dashboard.classList.remove('grid');
    }
    if (this.artistUI.dashboard.classList.contains('hide')){
      this.artistUI.dashboard.classList.remove('hide');
    }
    if (!this.artistUI.dashboard.classList.contains('grid')){
      this.artistUI.dashboard.classList.add('grid');
    }
  }
  render(){
    window.history.pushState("", "", `/artists/${this.artistId}`);
    if (this.artistUI.dashboard.classList.contains('hide')){

      d3.json(`${baseDataApiURI}/data/artist/${this.artistId}`)
        .then((data) => {
        const { salesNumber, totalSalesAmount, artistName } = data;
        window.localStorage.setItem('artistName', artistName);
        window.localStorage.setItem('artistId', this.artistId);
        window.localStorage.removeItem('lotName');
        window.localStorage.removeItem('lotId');
        renderBreadcrumb()
        this.toggleLotArtist()
        this.sharedUI.loader.dispatchEvent(new Event('hide-loader'));
        this.artistUI.salesCountEl.innerHTML = salesCountTemplate(salesNumber);
        this.artistUI.liquidityRateEl.innerHTML = liquidityRateTemplate(15);
        this.artistUI.performanceRateEl.innerHTML = performanceRateTemplate(35);
        this.artistUI.artistScoreEl.innerHTML = artistScoreTemplate(5);
        this.artistUI.totalSalesEl.innerHTML = totalSaleAmountTemplate(totalSalesAmount);
        this.artistUI.artistDescription.innerHTML = artistDescriptionTemplate(artistName);
        this.artistUI.scatterplot.innerHTML = "";
        renderScatterPlot(data.grouped_by_sale_date, data.max);
      })
    }
  }
}

export default Dashboard
