import LotDashboard from '../lot/dashboard';
import * as d3 from 'd3';
export const renderScatterPlot = (data, max) => {
  let saleDates = Object.keys(data);

  const margin = {top: 20, right: 20, bottom: 20, left: 60};
  const width = window.innerWidth*60/100 - 40;
  const height = window.innerHeight*2/3 - 40;
  var svg = d3.select("#scatterPlot")
              .append('svg')
              .attr("preserveAspectRatio", "xMinYMin meet")
              .attr('width', width)
              .attr('height', height)
              .attr("viewBox", `0 0 ${width} ${height}`)
              .append("g")
              .attr("transform", `translate(${margin.left},${margin.top})`);

  const innerWidth = width - margin.left -margin.right;
  const innerHeight = height - margin.top - margin.bottom;


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
              .attr("transform", `translate(0, ${innerHeight})`);

  var gY = svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

  const zoomed = () => {
    console.log('zooming')
    svg.attr("transform", d3.event.transform)
  };

  svg.call(d3.zoom().on("zoom", zoomed));
  var sales = svg.selectAll(".per_sale")
    .data(saleDates)
    .enter().append("g")
    .attr("id", saleDate => (`sale-${saleDate}`))
    .attr("transform", saleDate => `translate(${xScale(saleDate)},0)`);

  const band = xScale.bandwidth();
  const lotDashboard = new LotDashboard();

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
      .on("click", (lot) => lotDashboard.render(lot.id))
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
      .on("click", (lot) => lotDashboard.render(lot.id))
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
      .on("click", (lot) => lotDashboard.render(lot.id))
      .style("fill", "red")

    })
}
