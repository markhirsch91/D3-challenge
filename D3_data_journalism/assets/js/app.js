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

// Importing the  Data. Will be using "Smokes vs. Average Obesity" as my data.
d3.csv("assets/data/data.csv").then(function(censusData) {
    censusData.forEach(function(data) {
      data.smokes = +data.smokes;
      data.obesity = +data.obesity;
      // console.log(censusData)
    })


  // Setting up the scale functions
  var xLinearScale = d3.scaleLinear().range([0,width]);
  var yLinearScale = d3.scaleLinear().range([height,0]);

  // Setting up the axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);


  var xMin;
  var yMin;
  var xMax;
  var yMax;

  xMin = d3.min(censusData, function(data) {
    return data.smokes;
  });

  yMin = d3.min(censusData, function(data) {
    return data.obesity;
  });

  xMax = d3.max(censusData, function(data) {
    return data.smokes;
  });

  yMax = d3.max(censusData, function(data) {
    return data.obesity;
  });

  xLinearScale.domain([xMin, xMax]);
  yLinearScale.domain([yMin, yMax]);



  // Append Axes to the scatter plot chart
  chartGroup.append("g")
      .attr("transform",`translate(0, ${height})`)
      .call(bottomAxis);
  chartGroup.append("g")
      .call(leftAxis);


  // Creating the Circles
  var circlesGroup = chartGroup.selectAll("circle")
      .data(censusData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.smokes))
      .attr("cy", d => yLinearScale(d.obesity))
      .attr("r", "15")
      .attr("fill", "darkturquoise")
      .attr("opacity", ".5")
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    // Initialize tool tip
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        var smoking = d.smokes;
        var stateLabel = d.state;
        var obesityNumber = d.obesity;
        return("<br>State: " + stateLabel + "<br>Smokes?: " + smoking + "<br>Obesity?: " + obesityNumber);
      });

    // Creating the Tool Tip Chart
    chartGroup.call(toolTip);
    
    // Creating Event Listeners to display and hide the tool tip
    circlesGroup.on("click", function(data) {
      toolTip.show(data);
    })
      .on("mouseout", function(data,index) {
        toolTip.hide(data);
      });
      
    // Creating the axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Smokes vs. Average Obesity");


});