////////////////////////////////////////////////////////////// 
///////////////////// General settings ///////////////////////
//////////////////////////////////////////////////////////////

//Brush is the higher focus chart
//All is the smaller context chart

var startYear = 1960;
var endYear = 2020;
var yearRange = endYear - startYear;

var startFocusYear = 1960;
var endFocusYear = 2020;

// Margins
var margin = {top: 10, right: 30, bottom: 30, left: 50};
var width = 750;
var height = 500;
var heightBrush = 60;


////////////////////////////////////////////////////////////// 
////////////////////// Color Legend ////////////////////////// 
////////////////////////////////////////////////////////////// 

var marginLegend = {top: 15, right: 30, bottom: 10, left: 50}
var widthLegend = 350 - marginLegend.left - marginLegend.right
var heightLegend = 30;

var contients = ["Africa", "America", "Asia", "Europe", "Oceania"]

var colorScale = d3.scaleOrdinal()
    .domain(contients)
    .range(["#021D40", "#0D518C", "#1F82BF", "#F2E205", "#F2CB05"]);

//Create color legend SVG
var colorLegend = d3.selectAll(".colorLegend")
    .append("svg")
        .attr("width", width + marginLegend.left + marginLegend.right)
        .attr("height", heightLegend + marginLegend.top + marginLegend.bottom)
    .append("g")
        .attr("class", "colorLegendWrapper")
        .attr("transform", "translate(" + marginLegend.left + "," + marginLegend.top + ")");

//Add Legend symbols
var legendSize = 15
colorLegend.selectAll(".legendSymbols")
    .data(contients).enter()
    .append("rect")
        .attr("x", function(d,i) { return i*(legendSize+(width/7))})
        .attr("y", 0)
        .attr("width", legendSize)
        .attr("height", legendSize)
        .style("fill", function(d) { return colorScale(d)});

//Add Legend text
colorLegend.selectAll(".test")
    .data(contients).enter()
    .append("text")
        .attr("x", function(d,i) { return legendSize + 5+ i*(legendSize+(width/7))})
        .attr("y", (legendSize/2) + 2)
        //.style("fill", function(d) { return colorScale(d)})
        .text(function(d) { return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .style("font-size", legendSize);

////////////////////////////////////////////////////////////// 
///////////////////// Scales & Axes ////////////////////////// 
//////////////////////////////////////////////////////////////

var xScale = d3.scaleLinear().domain([startYear, endYear]).range([0, width]);
var xScaleFocus = d3.scaleLinear().domain([startFocusYear, endFocusYear]).range([0, width]);
var yScale = d3.scaleLinear().domain([0,1]).range([height, -margin.top]);
var yScaleBrush = d3.scaleLinear().domain([0,1]).range([heightBrush,-margin.top]);

var xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
var yAxis = d3.axisLeft(yScale).tickSize(5);

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
        .attr("height", height + margin.top);

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
        .attr("fill", "white")
        .attr("stroke", "black")
        .style("stroke-width", 0.5)
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
        .attr("transform", "translate(" + margin.left + "," + 20 + ")");

//Append border rect
focus.append("rect")
    .attr("id", "border")
    .attr("transform", "translate(-7,-16)")
    .attr("fill", "black")
    .attr("width", width + 14)
    .attr("height", height + 23);

//Append clippath to focus chart
focus.append("defs").append("clipPath")
    .attr("id", "clip")
    .attr("transform", "translate(0," + -margin.top + ")")
    .append("rect")
        .attr("width", width)
        .attr("height", height + margin.bottom);

//Append y axis to focus chart	
focus.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(-5,0)")
    .call(yAxis)
    .append("text")
        .attr("class", "titles")
        .attr("transform", "rotate(-90)")
        .attr("x", -(height/2))
        .attr("y", -45)
        .attr("dy", ".71em")
        .style("font-size", 14)
        .style("fill", "black")
        .style("text-anchor", "middle")
        .text("Ratio distribution in %");

//Make y axis line invisible (only ticks)
focus.select(".domain")
    .attr("stroke", "none");

//Append areas
var areaFocus= focus.selectAll(".pathContinent")
    .data(stackedSeries).enter()
    .append("path")
        .attr("class", "pathContinent")
        .attr("d", area)
        .attr("fill", "white")
        .attr("stroke", "black")
        .style("stroke-width", 4)
        .attr("clip-path", "url(#clip)");

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
    };