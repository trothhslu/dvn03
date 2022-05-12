data = [
    {country: "Italy", refugee: 60},
    {country: "France", refugee: 50},
    {country: "Greece", refugee: 120},
    {country: "Germany", refugee: 90},
    {country: "Lichtenstein", refugee: 30},
    {country: "Albanien", refugee: 75}
];

//const data = [10, 20, 30, 40];

const width = 800;
const height = 800;
const margin = {top: 20, bottom: 20, left: 20, right: 20};
const innerHeight = height - margin.top - margin.bottom
const innerWidth = width - margin.left - margin.right

// Leeres SVG erstellen
const svgContainer = d3.select("#d3-container")
    .append("svg")
    .attr("height", innerHeight)
    .attr("width", innerWidth)
    .attr("viewBox", [0, 0, width, height]);


/*
// x-Achse definieren
const xScale = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);

// y-Achse definieren
const yScale = d3.scaleLinear()
    .domain([0, d3.max(data.refugee)])
    .range([height - margin.bottom, margin.top]);
*/

// Compute values.
const xValues = d => d.country;
const yValues = d => d.refugee;

const xScale = d3.scaleBand()
    .domain(data.map(xValues))
    .range([0, innerWidth])
    .paddingOuter(0.2)
    .paddingInner(0.1);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, yValues)])
    .range([0, innerHeight]);

const yAxis = d3.axisLeft(yScale);
const xAxis = d3.axisBottom(xScale);

// console.log(xScale.domain());
// console.log(xScale.range());
// console.log(yScale.domain());
// console.log(yScale.range());
// console.log(yScale(0));

const g = svgContainer.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Bars
const bar = svgContainer
    .append("g")
    //.attr("fill", "royalblue")
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => xScale(xValues(d)))
    .attr("y", d => innerHeight - yScale(yValues(d)))
    .attr("height", d => yScale(yValues(d)))
    .attr("width", xScale.bandwidth())

    console.log(yScale(yValues(0)));

// Achsen-Beschrieftung
g.append("g").call(d3.axisLeft(yScale));
g.append("g").call(d3.axisBottom(xScale))
    .attr("transform", `translate(0,${innerHeight})`);

/*
// Balken definieren
const bars = svgContainer
    .append("g")
    .attr("fill", "royalblue")
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .text(function (d) {return d.country;})
    .join("rect")
        .attr("height", function (d) {return d.refugee;})
        .attr("width", 50);


svg
    .append("g")
    .attr("fill", "royalblue")
    .selectAll("rect")
    .data(data)
    .join("rect")
        .attr("x", (d, i) => x(i))
        .attr("y", (d) => y(d.refugee))
        .attr("height", d => y(0) - y(d.refugee))
        .attr("width", x.bandwidth());


const bar = svg.append("g")
    .attr("fill", "royalblue")
    .selectAll("rect")
    .data(data)
    .join("rect")
        .attr("x", i => x(data[i]))
        .attr("y", x(data.refugee))
        .attr("height", data.refugee)
        .attr("width", x.bandwidth());
*/

svgContainer.node();