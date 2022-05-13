// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/normalized-stacked-area-chart

// Custom/Simplfied version (based on Observable, Inc.)
function MyStackedAreaChart (data, {
    // x = ([x]) => x, // given d in data, returns the (ordinal) x-value
    // y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
    // z = () => 1, // given d in data, returns the (categorical) z-value
    x = (x) => x, // given d in data, returns the (ordinal) x-value
    y = (y) => y, // given d in data, returns the (quantitative) y-value
    z = (z) => 1, // given d in data, returns the (categorical) z-value
    marginTop = 20, // top margin, in pixels
    marginRight = 30, // right margin, in pixels
    marginBottom = 30, // bottom margin, in pixels
    marginLeft = 40, // left margin, in pixels
    width = 640, // outer width, in pixels
    height = 400, // outer height, in pixels
    xDomain, // [xmin, xmax]
    xRange = [marginLeft, width - marginRight], // [left, right]
    yDomain, // [ymin, ymax]
    yRange = [height - marginBottom, marginTop], // [bottom, top]
    zDomain, // array of z-values
    offset = d3.stackOffsetExpand, // stack offset method
    order = d3.stackOrderNone, // stack order method
    yLabel, // a label for the y-axis
    xFormat, // a format specifier string for the x-axis
    yFormat = "%", // a format specifier string for the y-axis
    colors = d3.schemeTableau10, // an array of colors for the (z) categories
} = {}) {

    // Compute values.
    const X = d3.map(data, x);
    const Y = d3.map(data, y);
    const Z = d3.map(data, z);

    // console.log(X);
    // console.log(Y);
    // console.log(Z);

    // Compute default x- and z-domains, and unique the z-domain.
    if (xDomain === undefined) xDomain = d3.extent(X);
    if (zDomain === undefined) zDomain = Z;
    zDomain = new d3.InternSet(zDomain);

    // Omit any data not present in the z-domain.
    const I = d3.range(X.length).filter(i => zDomain.has(Z[i]));

    // Compute a nested array of series where each series is [[y1, y2], [y1, y2],
    // [y1, y2], …] representing the y-extent of each stacked rect. In addition,
    // each tuple has an i (index) property so that we can refer back to the
    // original data point (data[i]). This code assumes that there is only one
    // data point for a given unique x- and z-value.
    const series = d3.stack()
        .keys(zDomain)
        .value(([x, I], z) => Y[I.get(z)])
        .order(order)
        .offset(offset)
        (d3.rollup(I, ([i]) => i, i => X[i], i => Z[i]))
        .map(s => s.map(d => Object.assign(d, {i: d.data[1].get(s.key)})));

    // Compute the default y-domain. Note: diverging stacks can be negative.
    if (yDomain === undefined) yDomain = d3.extent(series.flat(2));

    // Construct scales and axes.
    const xScale = d3.scaleTime(xDomain, xRange);
    const yScale = d3.scaleLinear(yDomain, yRange);
    const color = d3.scaleOrdinal(zDomain, colors);
    const xAxis = d3.axisBottom(xScale).ticks(width / 80, xFormat).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(height / 50, yFormat);

    // Define Chart area
    const area = d3.area()
        .x(({i}) => xScale(X[i]))
        .y0(([y1]) => yScale(y1))
        .y1(([, y2]) => yScale(y2));

    // Create empty svg.
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    // // Create area for each category in data
    svg.append("g")
        .selectAll("path")
        .data(series)
        .join("path")
            .attr("fill", ([{i}]) => color(Z[i]))
            .attr("d", area)
        .append("title")
            .text(([{i}]) => Z[i]);

    // Append X-Axis and X-Labels
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(xAxis)
        .call(g => g.select(".domain").remove());

    // Append Y-Axis and Y-Labels
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(yAxis)
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line")
            .filter(d => d === 0 || d === 1)
            .clone()
            .attr("x2", width - marginLeft - marginRight))
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(yLabel));

    return Object.assign(svg.node(), {scales: {color}});
};

// ------------------------------------------

unemployment = [
    {date: 2000-01-01, industry: "Wholesale and Retail Trade", unemployed: 1000},
    {date: 2000-01-01, industry: "Manufacturing", unemployed: 734},
    {date: 2000-01-01, industry: "Leisure and hospitality", unemployed: 782},
    {date: 2000-01-01, industry: "Business services", unemployed: 655},
    {date: 2000-01-01, industry: "Construction", unemployed: 745},
    {date: 2000-01-01, industry: "Education and Health", unemployed: 353},
    {date: 2000-01-02, industry: "Wholesale and Retail Trade", unemployed: 2000},
    {date: 2000-01-02, industry: "Manufacturing", unemployed: 800},
    {date: 2000-01-02, industry: "Leisure and hospitality", unemployed: 900},
    {date: 2000-01-02, industry: "Business services", unemployed: 750},
    {date: 2000-01-02, industry: "Construction", unemployed: 800},
    {date: 2000-01-02, industry: "Education and Health", unemployed: 200},
    {date: 2000-01-03, industry: "Wholesale and Retail Trade", unemployed: 1500},
    {date: 2000-01-03, industry: "Manufacturing", unemployed: 760},
    {date: 2000-01-03, industry: "Leisure and hospitality", unemployed: 400},
    {date: 2000-01-03, industry: "Business services", unemployed: 700},
    {date: 2000-01-03, industry: "Construction", unemployed: 900},
    {date: 2000-01-03, industry: "Education and Health", unemployed: 400},
    {date: 2000-01-04, industry: "Wholesale and Retail Trade", unemployed: 1500},
    {date: 2000-01-04, industry: "Manufacturing", unemployed: 760},
    {date: 2000-01-04, industry: "Leisure and hospitality", unemployed: 400},
    {date: 2000-01-04, industry: "Business services", unemployed: 700},
    {date: 2000-01-04, industry: "Construction", unemployed: 900},
    {date: 2000-01-04, industry: "Education and Health", unemployed: 60},
];

//console.log(unemployment);

// myJson = fetch("./dataset_records_V2.json")
//     .then(function (resp) {
//         return resp.json();
//     })
//     .then(function (data) {
//         return console.log(data);
//     });

// var parseDate = d3.timeParse("%Y-%m-%d");

// test = d3.json("./dataset_records_V2.json", function (json) {
//     const data = json.data;

//     data.forEach(element => {
//         element.date = parseDate(element.date);
//     });

//     //console.log(data);
// });

// // Storing json data in a variable
// fileContent = fetch("./dataset_records_V3.json")
//     .then(response => {
//         return response.json();
//     })
//     .then(data => console.log(data));

// //var jsonObj = JSON.parse(fileContent);


// // Test with Observable
// myfile = d3.json("./dataset_records_V3.json")
//     .then(function(data){ 
//         return data;
//         console.log(data);
//     });


chart = MyStackedAreaChart(unemployment, {
    x: d => d.date,
    y: d => d.unemployed,
    z: d => d.industry,
    //yLabel: "↑ Unemployed persons",
    // width: 900,
    // height: 600
});


// const mydata = d3.json("dataset_records_v3.json");
// chart = mydata.then(function (data) {
//     MyStackedAreaChart(data, {
//         x: d => d.date,
//         y: d => d.unemployed,
//         z: d => d.industry,
//         //yLabel: "↑ Unemployed persons",
//         // width: 900,
//         // height: 600
//     });    
// })

// chart = d3.json("dataset_records_v3.json")
//     .then(function (data) {
//         MyStackedAreaChart(data, {
//             x: d => d.date,
//             y: d => d.unemployed,
//             z: d => d.industry,
//             //yLabel: "↑ Unemployed persons",
//             // width: 900,
//             // height: 600
//         });
//     });


// gitdata = d3.json("https://github.com/trothhslu/dvn03/blob/main/website/test_dataset.json");


// chart = MyStackedAreaChart(test, {
//     x: d => d.date,
//     y: d => d.unemployed,
//     z: d => d.industry,
//     //yLabel: "↑ Unemployed persons",
//     // width: 900,
//     // height: 600
// });

//attachment = FileAttachment("dataset_records.json");

// const dataset = fetch('dataset_records.json')
//   .then(response => response.json())
//   .then(data => data.data)
//   .then(d => console.log(d));

//unemployment = d3.FileAttachment("dataset.csv").csv({typed: true});

// unemployment = d3.csv("dataset.csv", function (error, dataset) {
//     dataset.forEach(element => {
//         element.unemployed = +element.unemployed
//     });
// });


//key = Swatches(chart.scales.color, {columns: "180px"});

document.body.append(chart);