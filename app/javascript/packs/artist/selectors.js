class Selectors {
  constructor() {
    this.dashboard = document.getElementById('artist-dashboard');
    this.scatterplot = document.getElementById('scatterPlot')
    this.salesCountEl = document.getElementById('sales-count');
    this.liquidityRateEl = document.getElementById('liquidity-rate');
    this.performanceRateEl = document.getElementById('performance-rate');
    this.artistScoreEl =  document.getElementById('artist-score');
    this.totalSalesEl = document.getElementById('total-sales');
    this.artistDescription = document.getElementById('artist-description')
  }
}

export default Selectors
