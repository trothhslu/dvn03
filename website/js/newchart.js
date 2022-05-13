////////////////////////////////////////////////////////////// 
///////////////////// General settings ///////////////////////
//////////////////////////////////////////////////////////////

//Brush is the higher focus chart
//All is the smaller context chart

var startYear = 1960;
var endYear = 2009; //reset to 2020
var yearRange = endYear - startYear;

var startFocusYear = 1960;
var endFocusYear = 1965; //reset to 2020

// Margins
var margin = {top: 10, right: 30, bottom: 30, left: 50};
var width = 600; //?? - margin.left - margin.right,
var height = 400;
var heightBrush = 100 - margin.top - margin.bottom; //reset to 100


////////////////////////////////////////////////////////////// 
////////////////////// Color Legend ////////////////////////// 
////////////////////////////////////////////////////////////// 

var marginLegend = {top: 15, right: 30, bottom: 10, left: 30}
widthLegend = 350 - marginLegend.left - marginLegend.right
heightLegend = 30;

var colorScale = d3.scaleOrdinal()
    .domain(["Afrika", "Amerika", "Asien", "Europa", "Ozeanien"])
    .range(["#021D40", "#0D518C", "#1F82BF", "#F2E205", "#F2CB05"]);

//Create color legend SVG
var colorLegend = d3.select(".colorLegend").append("svg")
    .attr("width", widthLegend + marginLegend.left + marginLegend.right)
    .attr("height", heightLegend + marginLegend.top + marginLegend.bottom)
  .append("g")
	.attr("class", "colorLegendWrapper")
    .attr("transform", "translate(" + marginLegend.left + "," + marginLegend.top + ")");

////////////////////////////////////////////////////////////// 
///////////////////// Scales & Axes ////////////////////////// 
//////////////////////////////////////////////////////////////

var xScale = d3.scaleLinear().domain([startYear, endYear]).range([0, width]);
var xScaleFocus = d3.scaleLinear().domain([startFocusYear, endFocusYear]).range([0, width]);
var yScale = d3.scaleLinear().domain([0,1]).range([height, -margin.top]);
var yScaleBrush = d3.scaleLinear().domain([0,1]).range([heightBrush,-margin.top]);

var xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
var yAxis = d3.axisLeft(yScale).tickSize(0);

////////////////////////////////////////////////////////////// 
/////////////// Other initializations //////////////////////// 
////////////////////////////////////////////////////////////// 

//Stack
var stack = d3.stack()
    .keys(["Afrika", "Amerika", "Asien", "Europa", "Ozeanien"])
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetExpand);

var stackedSeries = stack(myStackedData);

//Area Focus
var area = d3.area()
    .x(function(d) { return xScaleFocus(d.data.Year)})
    .y0(function(d) { return yScale(d[0])})
    .y1(function(d) { return yScale(d[1])})

    // Using curveNatural
    .curve(d3.curveNatural);

//Area Brush
var areaBrush = d3.area()
    .x(function(d) { return xScale(d.data.Year)})
    .y0(function(d) { return yScaleBrush(d[0])})
    .y1(function(d) { return yScaleBrush(d[1])})

    // Using curveNatural
    .curve(d3.curveNatural);

////////////////////////////////////////////////////////////// 
//////////////////////// Context ///////////////////////////// 
////////////////////////////////////////////////////////////// 

//Create context SVG
var context = d3.select(".chart.context").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", heightBrush + margin.top + margin.bottom)
    .append("g")
        .attr("class", "contextWrapper")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Append clippath to context chart
context.append("defs").append("clipPath")
    .attr("id", "clipContext")
    .attr("transform", "translate(0," + -margin.top + ")")
    .append("rect")
        .attr("width", width)
        .attr("height", height);

//Append x axis to context chart
context.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + (heightBrush + 5) + ")")
  .call(xAxis);

//Append areas
var areaContinents = context.selectAll(".pathContinent")
    .data(stackedSeries).enter()
    .append("path")
        .attr("class", "pathContinent")
        .attr("d", areaBrush)
        .attr("fill", function(d) { return colorScale(d.key)})
        .attr("fill-opacity", 0.5)
        .attr("clip-path", "url(#clipContext)");

////////////////////////////////////////////////////////////// 
////////////////////////// Focus ///////////////////////////// 
//////////////////////////////////////////////////////////////

// Create focus SVG
var focus = d3.select(".chart.focus")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("class", "FocusWrapper")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Append clippath to focus chart
focus.append("defs").append("clipPath")
    .attr("id", "clip")
    .attr("transform", "translate(0," + -margin.top + ")")
    .append("rect")
        .attr("width", width)
        .attr("height", height);

//Append areas
var areaFocus= focus.selectAll(".pathContinent")
    .data(stackedSeries).enter()
    .append("path")
        .attr("class", "pathContinent")
        .attr("d", area)
        .attr("fill", function(d) { return colorScale(d.key)})
        .attr("clip-path", "url(#clip)");


//Append x axis to focus chart
// focus.append("g")
//     .attr("class", "x axis")
//     .style("font-size", 13)
//     .attr("transform", "translate(0," + (height) + ")")
//     .call(xAxis);

// //Append y axis to focus chart	
// focus.append("g")
//     .attr("class", "y axis")
//     .attr("transform", "translate(-10,0)")
//     .call(yAxis)
// .append("text")
//     .attr("class", "titles")
//     .attr("transform", "rotate(-90)")
//     .attr("x", -(height/2))
//     .attr("y", -35)
//     .attr("dy", ".71em")
//     .style("font-size", 14)
//     .style("text-anchor", "middle")
//     .text("Position in Top 10");


////////////////////////////////////////////////////////////// 
/////////////////////// Brushing ///////////////////////////// 
//////////////////////////////////////////////////////////////

const brush = d3.brushX()
    .extent([[0, - margin.top], [width, heightBrush]])
    .on("end", brushed);

//Set up the brush
var gBrush = context.append("g")
	.attr("class", "brush")
	.call(brush)
    .call(brush.move, [367, 490]);

gBrush.selectAll(".handle")
    .attr("stroke-width", 1.5);

function brushed({selection}) {

        if (selection === null) {
            console.log("selection is null");
        } else {
            console.log(selection.map(xScale.invert));
            var brushExtent = selection.map(xScale.invert);
            // context.selectAll(".pathContinent")
            //     .attr("fill-opacity", d => brushExtent[0] <= d.Year && d.Year <= brushExtent[1] ? 1:0.1);

            //Update Focus chart
            xScaleFocus.domain([brushExtent[0], brushExtent[1]]);
            areaFocus
                .transition()
                .duration(1000)
                .attr("d", area);
        }
        //d3.select(this).call(brushHandle, selection);
        }

// for (k in mydata) {
//     console.log(mydata[k].Kontinent_EN);
// };