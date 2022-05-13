// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/bar-chart

// Custom/Simplfied version (based on Observable, Inc.)
function MyBarChart (data, {
    x = x, // given d in data, returns the (ordinal) x-value
    y = y, // given d in data, returns the (quantitative) y-value
    marginTop = 20, // the top margin, in pixels
    marginRight = 0, // the right margin, in pixels
    marginBottom = 30, // the bottom margin, in pixels
    marginLeft = 40, // the left margin, in pixels
    width = 640, // the outer width of the chart, in pixels
    height = 400, // the outer height of the chart, in pixels
    xDomain, // an array of (ordinal) x-values (Sortierung von dict)
    xRange = [marginLeft, width - marginRight], // [left, right]
    yDomain, // [ymin, ymax]
    yRange = [height - marginBottom, marginTop], // [bottom, top]
    xPadding = 0.1, // amount of x-range to reserve to separate bars
    yFormat, // a format specifier string for the y-axis
    yLabel, // a label for the y-axis
    color = "currentColor" // bar fill color
} = {}) {

    // Compute values
    const X = d3.map(data, x);
    const Y = d3.map(data, y);

    console.log(X);
    console.log(Y);

    // Compute default domains, and unique the x-domain.
    if (xDomain === undefined) xDomain = X;
    if (yDomain === undefined) yDomain = [0, d3.max(Y)];
    xDomain = new d3.InternSet(xDomain);

    // Omit any data not present in the x-domain.
    const I = d3.range(X.length).filter(i => xDomain.has(X[i]));

    // Construct scales, axes, and formats.
    const xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
    const yScale = d3.scaleLinear(yDomain, yRange);
    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);

    // Create empty svg.
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    // Append Y-Axis and Y-Labels
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(yAxis)
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(yLabel));

    // Create bars for each entry in data
    const bar = svg.append("g")
        .attr("fill", color)
        .selectAll("rect")
        .data(I)
        .join("rect")
            .attr("x", i => xScale(X[i]))
            .attr("y", i => yScale(Y[i]))
            .attr("height", i => yScale(0) - yScale(Y[i]))
            .attr("width", xScale.bandwidth());

    // Append X-Axis and X-Labels
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(xAxis);

    return svg.node();
};

// ------------------------------------------

data = [
    {country: "Italy", refugee: 60},
    {country: "France", refugee: 50},
    {country: "Greece", refugee: 120},
    {country: "Germany", refugee: 90},
    {country: "Lichtenstein", refugee: 30},
    {country: "Albanien", refugee: 75}
];

MyFirstBarChart = MyBarChart(data, {
    x: d => d.country,
    y: d => d.refugee,
    xDomain: d3.groupSort(data, ([d]) => -d.refugee, d => d.country), // sort by descending frequency
    //yFormat: "%",
    yLabel: "Anzahl", //"↑ Frequency",
    //width,
    //height: 500,
    color: "steelblue"
});


document.body.appendChild(MyFirstBarChart);