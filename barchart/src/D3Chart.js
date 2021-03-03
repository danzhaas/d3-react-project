import * as d3 from 'd3'

const url1 = "https://udemy-react-d3.firebaseio.com/tallest_men.json"
const url2 = "https://udemy-react-d3.firebaseio.com/tallest_women.json"

// data format = [ {"height":Number, "name":String} ]
const MARGIN = { TOP:10, BOTTOM:50, LEFT:75, RIGHT:10 }
const WIDTH = 800-MARGIN.LEFT-MARGIN.RIGHT;
const HEIGHT = 500-MARGIN.TOP-MARGIN.BOTTOM;


export default class D3Chart {
    constructor(element) {  // These are rendered only once: when the page is loaded.  
        const vis = this;
        
        vis.svg = d3.select(element)  // appending canvas and moving to center of screen.  Only want this to run once
        .append("svg")
            .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT )
            .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
        .append("g")
            .attr("transform", `translate(${MARGIN.LEFT},${MARGIN.TOP})`)
        
        vis.svg.append("text")  // Axis labels: only should be appended to the canvas once
            .attr("x", WIDTH/2)
            .attr("y", HEIGHT+50)
            .attr("text-anchor", "middle")
            .text("The World's Five Tallest Men")

        vis.svg.append("text")
            .attr("x", -HEIGHT / 2)
            .attr("y", -50)
            .attr("text-anchor", "middle")
            .text("Height in cm")
            .attr("transform", "rotate(-90)")

        vis.xAxisGroup = vis.svg.append("g")
        .attr("transform", `translate(0, ${HEIGHT})`)

        vis.yAxisGroup = vis.svg.append("g")

        Promise.all([
            d3.json(url1),
            d3.json(url2)
        ]).then((datasets) => {
            console.log(datasets)
        });

        // d3.json(url1).then(data => { // data loading function; don't need to look at data frequently unless it's dynamic
        // vis.data = data;    
        // d3.interval(() => { // 
        //         vis.update()
        //     }, 1000)
        // })
    }

    update() {  // called every time we change the data - important for dynamic views or data.  This should include x and y scales, x and y axes, and all rectangles.
        const vis = this;

        const y = d3.scaleLinear()
        .domain([   // needs an update whenever page scale changes
            d3.min(vis.data, d => {return d.height}) * 0.95, 
            d3.max(vis.data, d => {return d.height})
        ])
        .range([HEIGHT,0])

        const x = d3.scaleBand()
            .domain(vis.data.map(item => item.name))
            .range([0,WIDTH])
            .padding(0.4)

        const xAxisCall = d3.axisBottom(x)  
            vis.xAxisGroup.call(xAxisCall)

        const yAxisCall = d3.axisLeft(y)  
            vis.yAxisGroup.call(yAxisCall)

        //DATA JOIN
        const rects = vis.svg.selectAll("rect")
            .data(vis.data)

        // EXIT
        rects
            .exit()
            .remove()

        //UPDATE
        rects
            .attr("x", d => x(d.name))
            .attr("y", d => y(d.height))
            .attr("width", x.bandwidth)
            .attr("height", d => HEIGHT - y(d.height))

        // ENTER
        rects
            .enter()
            .append("rect")
                .attr("x", d => x(d.name))
                .attr("y", d => y(d.height))
                .attr("width", x.bandwidth)
                .attr("height", d => HEIGHT - y(d.height))
                .attr("fill", "grey")
    }
}