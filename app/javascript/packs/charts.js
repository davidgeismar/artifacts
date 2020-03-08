import { fetchDataAndDisplayGraph, displayLotInfos } from './dashboard.js'
import { loader, artistDashboard } from './UIElements'

// x axis sale dates ordinal scale each sale width is total_width_available / number_of_sales
// within the bandwidth of each sale
// y axis is a linear scale of price domain : [0, max], range [0, height]



export const renderLotPlot = (data) => {
  const yMax = Math.max(data.map(lot => Math.max(lot.primaryPrice, lot.high_estimate, lot.low_estimate)));
  const saleDates = data.map(lot => lot.saleDate);
  debugger
  const margin = {top: 20, right: 20, bottom: 20, left: 60}

  var svg = d3.select("#lotPlot")
              .append('svg')
              .attr("preserveAspectRatio", "xMinYMin meet")
              .attr("viewBox", "0 0 960 500")
              .append("g")
              .attr("transform", `translate(${margin.left},${margin.top})`)


  const width = window.innerWidth*80/100 - 20
  const height = 500
  const innerWidth = width - margin.left -margin.right
  const innerHeight = height - margin.top - margin.bottom

  let xScale = d3.scaleBand()
        .range([0, innerWidth])
        .domain(saleDates)
        .paddingInner(0.1);

  var yScale = d3.scaleLinear()
      .range([innerHeight, 0])
      .domain([0, yMax]);
  var xAxis = d3.axisBottom(xScale)
  var yAxis = d3.axisLeft(yScale)
  var gX = svg.append("g")
              .attr("class", "x axis")
              .call(xAxis)
              .attr("transform", `translate(0, ${innerHeight})`)

  var gY = svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)

  svg.selectAll(".point.low-estimate")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "point low-estimate")
      .attr("cx", lot => xScale(lot.lotName))
      .attr("cy", lot => yScale(lot.low_estimate))
      .attr('data-id', lot => lot.id)
      .attr("r", 3)
      .style("fill", "blue")

  svg.selectAll(".point.primaryPrice")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "point primaryPrice")
      .attr("cx", lot => xScale(lot.lotName))
      .attr("cy", lot => yScale(lot.primaryPrice))
      .attr('data-id', lot => lot.id)
      .attr("r", 3)
      .style("fill", "orange")

  svg.selectAll(".point.high-estimate")
      .data(data)
      .enter()
      .append("circle")
      .attr('data-id', lot => lot.id)
      .attr("class", "point high-estimate")
      .attr("cx", lot => xScale(lot.lotName))
      .attr("cy", lot => yScale(lot.high_estimate))
      .attr("r", 3)
      .style("fill", "red")

}

export const renderScatterPlot = (data, max) => {
  let saleDates = Object.keys(data)

  const margin = {top: 20, right: 20, bottom: 20, left: 60}

  var svg = d3.select("#scatterPlot")
              .append('svg')
              .attr("preserveAspectRatio", "xMinYMin meet")
              .attr("viewBox", "0 0 960 500")
              .append("g")
              .attr("transform", `translate(${margin.left},${margin.top})`)


  const width = window.innerWidth*80/100 - 20
  const height = 500
  const innerWidth = width - margin.left -margin.right
  const innerHeight = height - margin.top - margin.bottom


  let xScale = d3.scaleBand()
        .range([0, innerWidth])
        .domain(saleDates)
        .paddingInner(0.1);

  var yScale = d3.scaleLinear()
      .range([innerHeight, 0])
      .domain([0, max]);


  // svg.call(zoom);
  var xAxis = d3.axisBottom(xScale)
  var yAxis = d3.axisLeft(yScale)
  var gX = svg.append("g")
              .attr("class", "x axis")
              .call(xAxis)
              .attr("transform", `translate(0, ${innerHeight})`)

  var gY = svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)

  const zoomed = () => {
    console.log('zooming')
    svg.attr("transform", d3.event.transform)
  }

  svg.call(d3.zoom().on("zoom", zoomed));
var sales = svg.selectAll(".per_sale")
    .data(saleDates)
    .enter().append("g")
    .attr("id", saleDate => (`sale-${saleDate}`))
    .attr("transform", saleDate => `translate(${xScale(saleDate)},0)`);

const band = xScale.bandwidth()
sales._groups[0].forEach(sale => {
  let lots = data[sale.__data__]
  const lotNames = lots.map(lot => lot.lotName)
  let x_sale = d3.scaleBand()
            .domain(lotNames).range([0, band])
            .padding(0.05);

  d3.select(sale).selectAll(".point.low-estimate")
      .data(lots)
      .enter()
      .append("circle")
      .attr("class", "point low-estimate")
      .attr("cx", lot => x_sale(lot.lotName))
      .attr("cy", lot => yScale(lot.low_estimate))
      .attr('data-id', lot => lot.id)
      .attr("r", 3)
      .on("click", (lot) => displayLotInfos(lot.id))
      .style("fill", "blue")

  d3.select(sale).selectAll(".point.primaryPrice")
      .data(lots)
      .enter()
      .append("circle")
      .attr("class", "point primaryPrice")
      .attr("cx", lot => x_sale(lot.lotName))
      .attr("cy", lot => yScale(lot.primaryPrice))
      .attr('data-id', lot => lot.id)
      .attr("r", 3)
      .on("click", (lot) => displayLotInfos(lot.id))
      .style("fill", "orange")

  d3.select(sale).selectAll(".point.high-estimate")
      .data(lots)
      .enter()
      .append("circle")
      .attr('data-id', lot => lot.id)
      .attr("class", "point high-estimate")
      .attr("cx", lot => x_sale(lot.lotName))
      .attr("cy", lot => yScale(lot.high_estimate))
      .attr("r", 3)
      .on("click", (lot) => displayLotInfos(lot.id))
      .style("fill", "red")

})

}
export const renderSaleGroupedBar = data => {
  var svg =  d3.select('#groupedBar')
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);
  let saleData = data['13 May 1998']
  var x0 = d3.scaleBand()
      .range([0, innerWidth])
      .domain(saleData.map(function(d) { return d.title2; }))
      .paddingInner(0.1);

  var keys = ['low_estimate', 'primaryPrice', 'high_estimate' ]

  var x1 = d3.scaleBand()
            .domain(keys).range([0, x0.bandwidth()])
            .padding(0.05);

  var y = d3.scaleLinear()
      .range([innerHeight, 0])
      .domain([0, d3.max(saleData, lot => Math.max(lot.high_estimate, lot.primaryPrice))]);

  var z = d3.scaleOrdinal()
          .range(["#98abc5", "#8a89a6", "#7b6888"]);


  var axis = svg.append("g")
                .attr("class", "x axis")
                .call(d3.axisBottom(x0))
                .attr("transform", `translate(0, ${innerHeight})`)



  svg.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(y))

var price_type = svg.selectAll(".price_type")
    .data(saleData)
    .enter().append("g")
    .attr("class", "price_type")
    .attr("transform", d => `translate(${x0(d.title2)},0)`);

/* Add field2 bars */
price_type.selectAll(".bar.high-estimate")
  .data(d => [d])
  .enter()
  .append("rect")
  .attr("class", "bar high-estimate")
.style("fill","red")
  .attr("x", d => x1('high_estimate'))
  .attr("y", d => y(d.high_estimate))
  .attr("width", x1.bandwidth())
  .attr("height", d => {
    return height - margin.top - margin.bottom - y(d.high_estimate)
  });

price_type.selectAll(".bar.low_estimate")
    .data(d => [d])
    .enter()
    .append('rect')
    .attr("class", "bar low_estimate")
  .style("fill","blue")
  .attr("x", d => x1('low_estimate'))
  .attr("y", d => y(d.low_estimate))
  .attr("width", x1.bandwidth())
  .attr("height", d => {
    return height - margin.top - margin.bottom - y(d.low_estimate)
  });

price_type.selectAll(".bar.primaryPrice")
    .data(d => [d])
    .enter()
    .append('rect')
    .attr("class", "bar primaryPrice")
  .style("fill","orange")
  .attr("x", d => x1('primaryPrice'))
  .attr("y", d => y(d.primaryPrice))
  .attr("width", x1.bandwidth())
  .attr("height", d => {
    return height - margin.top - margin.bottom - y(d.primaryPrice)
  });

var legend = svg.append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

legend.append("rect")
    .attr("x", width - 17)
    .attr("width", 15)
    .attr("height", 15)
    .attr("fill", z)
    .attr("stroke", z)
    .attr("stroke-width",2)

legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9.5)
    .attr("dy", "0.32em")
    .text(function(d) { return d; });

}


let scatterPlot = document.getElementById('scatterPlot')
artistDashboard.addEventListener('artistSelected', (e) => {
  console.log('selected', e)
  fetchDataAndDisplayGraph(e.detail)
}, false)
