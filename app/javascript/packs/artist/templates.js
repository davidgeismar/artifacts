export const salesCountTemplate = (kpi) => `<div><span class='kpi'>${kpi}</span><br> <span class='indicator'>Sales</span></div>`
export const totalSaleAmountTemplate = (kpi) => `<div><span class='kpi'>$${kpi}</span><br> <span class='indicator'>Total Sales</span></div>`
export const liquidityRateTemplate = (kpi) => `<div><span class='kpi'>${kpi}%</span><br> <span class='indicator'>liquidity</span> </div>`
export const performanceRateTemplate = (kpi) => `<div><span class='kpi'>${Math.round(kpi * 100)/100}</span><br> <span class='indicator'>Performance</span> </div>`
export const artistScoreTemplate = (kpi) => `<div><span class='kpi'>${kpi}</span><br><span class='indicator'>Global</span>blue chip artist </div>`

export const artistDescriptionTemplate = (artistName) => `
  <h2>${artistName}</h2>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
  esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
  culpa qui officia deserunt mollit anim id est laborum.
`
