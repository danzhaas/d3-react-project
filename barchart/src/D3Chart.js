import * as d3 from 'd3'

const url = "https://udemy-react-d3.firebaseio.com/tallest_men.json"
// data = [ {"height":Number, "name":String} ]
const MARGIN = { TOP:10, BOTTOM:50, LEFT:75, RIGHT:10 }
const WIDTH = 800-MARGIN.LEFT-MARGIN.RIGHT;
const HEIGHT = 500-MARGIN.TOP-MARGIN.BOTTOM;


export default class D3Chart {
    constructor(element) {
        const svg = d3.select(element)
        .append("svg")
            .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT )
            .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
        .append("g")
            .attr("transform", `translate(${MARGIN.LEFT},${MARGIN.TOP})`)

    d3.json(url).then(data => {
        // data = [ {"height":Number, "name":String} ]
        const y = d3.scaleLinear()
            .domain([
                d3.min(data, d => {return d.height}) * 0.95, 
                d3.max(data, d => {return d.height})
            ])
            .range([HEIGHT,0])

        const x = d3.scaleBand()
            .domain(data.map(item => item.name))
            .range([0,WIDTH])
            .padding(0.4)

        const xAxisCall = d3.axisBottom(x)
        svg.append("g")
            .attr("transform", `translate(0, ${HEIGHT})`)
            .call(xAxisCall)

        const yAxisCall = d3.axisLeft(y)
        svg.append("g")
            .call(yAxisCall)

        svg.append("text")
            .attr("x", WIDTH/2)
            .attr("y", HEIGHT+50)
            .attr("text-anchor", "middle")
            .text("The World's Five Tallest Men")

        svg.append("text")
            .attr("x", -HEIGHT / 2)
            .attr("y", -50)
            .attr("text-anchor", "middle")
            .text("Height in cm")
            .attr("transform", "rotate(-90)")

        const rects = svg.selectAll("rect")
            .data(data)

        rects.enter()
            .append("rect")
                .attr("x", d => x(d.name))
                .attr("y", d => y(d.height))
                .attr("width", x.bandwidth)
                .attr("height", d => HEIGHT - y(d.height))
                .attr("fill", "grey")
        })
    }
}