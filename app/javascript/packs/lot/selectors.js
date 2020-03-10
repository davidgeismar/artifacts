class Selectors {
  constructor() {
    this.dashboard = document.getElementById('lot-dashboard');
    this.scatterplot = document.getElementById('lotPlot');
    this.salesCountEl = document.getElementById('lot-sales-count');
    this.liquidityRateEl = document.getElementById('lot-liquidity-rate');
    this.performanceRateEl = document.getElementById('lot-performance-rate');
    this.objectScoreEl =  document.getElementById('object-score');
    this.totalSalesEl = document.getElementById('lot-total-sales');
  }
}

export default Selectors
