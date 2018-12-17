// @TODO: YOUR CODE HERE!
var svgWidth = parseInt(d3.select("#scatter").style("width"));
var svgHeight = svgWidth - svgWidth/ 3.9;

// var svgWidth = 590;
// var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Import Data
d3.csv("./assets/data/data.csv").then(function(data) {
  // if (err) throw err;
  
  // // Step 1: Parse Data/Cast as numbers
  //  // ==============================
  //   data.forEach(function(data) {
  //   data.age = +data.age;
  //   data.smokes = +data.smokes;
  // });

  console.log(data)


  // Step 2: Create scale functions
  // ==============================
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => parseFloat(d.age)), d3.max(data, d => parseFloat(d.age))])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => parseFloat(d.smokes)), d3.max(data, d => parseFloat(d.smokes))])
    .range([height, 0]);

  // var xLinearScale = d3.scaleLinear()
  // .domain([20, 60])
  // .range([0, width]);

  // var yLinearScale = d3.scaleLinear()
  // .domain([30, 10])
  // .range([height, 0]);

    

  // Step 3: Create axis functions
  // ==============================
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Step 4: Append Axes to the chart
  // ==============================
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

    var circlesGroup = chartGroup.selectAll("g circle")
    .data(data)
    .enter()

    circlesGroup.append("circle")
    .attr("cx", d => xLinearScale(d.age))
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", "10")
    .attr("class", "stateCircle")
    // .attr("fill", "#FFFFFF")
    .attr("opacity", ".8");


  circlesGroup.append("text")
  .text(d => d.abbr)
  .attr("dx", d => xLinearScale(d.age))
  .attr("dy", d => yLinearScale(d.smokes))
  // .attr("color", "#FFFFFF")
  .attr("font-size", 10)
  // .attr("stroke", "black")
  .attr("font-family", "sans-serif")
  .attr("opacity", "1")
  .attr("class", "stateText")
  .attr("x",function (d) {return d;})
  .attr("y", 4);


// text label for the axis
 

   circlesGroup.append("text")
   .attr("transform", "rotate(-90)")
   .attr("y", 0 + margin.left / 2 - 100)
   .attr("x",0 - (height / 2))
   .attr("dy", "1em")
   .attr("class", "aText")
   .text("Smokes (%)");

 
   circlesGroup.append("text")
   .attr("transform", `translate(${width / 2}, ${height + margin.top + 25})`)
   .attr("class", "aText")
   .text("Age (In Years)");

  ;







});
