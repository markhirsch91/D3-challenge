var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Creating the SVG wrapper. 
var svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Importing the  Data
d3.csv("data.csv").then(function(censusData) {
    censusData.forEach(function(data) {
      data.state = +data.state;
      data.obesity = +data.obesity;
    })}
);

// Setting up the scale functions
var xLinearScale = d3.scaleLinear().range([0,width]);
var yLinearScale = d3.scaleLinear().range([height,0]);

// Setting up the axis functions

var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

