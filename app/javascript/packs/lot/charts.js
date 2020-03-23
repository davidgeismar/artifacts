import { fetchDataAndDisplayGraph, displayLotInfos } from './dashboard.js';
import { loader, artistDashboard } from '../UIElements';
import * as d3 from 'd3';

export const renderLotPlot = (data) => {
  const yMax = Math.max(data.map(lot => Math.max(lot.primaryPrice, lot.high_estimate, lot.low_estimate)));
  const saleDates = data.map(lot => lot.saleDate);
  const margin = {top: 20, right: 20, bottom: 20, left: 60};
  let windowWidth = window.innerWidth
  const width = windowWidth < 640 ? windowWidth - 20 : windowWidth*60/100 - 20;
  const height = window.innerHeight*2/3 - 20;

  var svg = d3.select("#lotPlot")
              .append('svg')
              .attr("preserveAspectRatio", "xMinYMin meet")
              .attr('width', width)
              .attr('height', height)
              .attr("viewBox", `0 0 ${width} ${height}`)
              .append("g")
              .attr("transform", `translate(${margin.left},${margin.top})`);

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  let xScale = d3.scaleBand()
        .range([0, innerWidth])
        .domain(saleDates)
        .paddingInner(0.1);

  var yScale = d3.scaleLinear()
      .range([innerHeight, 0])
      .domain([0, yMax]);

  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);
  var gX = svg.append("g")
              .attr("class", "x axis")
              .call(xAxis)
              .attr("transform", `translate(0, ${innerHeight})`);

  var gY = svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

  svg.selectAll(".point.low-estimate")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "point low-estimate")
      .attr("cx", lot => xScale(lot.lotName))
      .attr("cy", lot => yScale(lot.low_estimate))
      .attr('data-id', lot => lot.id)
      .attr("r", 3)
      .style("fill", "blue");

  svg.selectAll(".point.primaryPrice")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "point primaryPrice")
      .attr("cx", lot => xScale(lot.lotName))
      .attr("cy", lot => yScale(lot.primaryPrice))
      .attr('data-id', lot => lot.id)
      .attr("r", 3)
      .style("fill", "orange");

  svg.selectAll(".point.high-estimate")
      .data(data)
      .enter()
      .append("circle")
      .attr('data-id', lot => lot.id)
      .attr("class", "point high-estimate")
      .attr("cx", lot => xScale(lot.lotName))
      .attr("cy", lot => yScale(lot.high_estimate))
      .attr("r", 3)
      .style("fill", "red");

}
