import * as d3 from 'd3';
import {DataPoint} from "./DataPoint";
import {CountryData} from "./CountryData";

export default function lineGraph(): void {

    const margin = {top: 10, right: 30, bottom: 30, left: 60};
    const width = 700;
    const height = 500;

    d3.select("svg").remove();
    const svg = d3.select('body')
        .append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    function lineGraphing(data: DataPoint[]): void {
        const xScale = d3.scaleTime()
            .domain(d3.extent(data, function (d) {
                return d.getParsedTime();
            }))
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));

        // Add Y axis
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) {
                return d.cases;
            })])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(yScale));

        const lineFunc = d3.line<DataPoint>()
            .x(function (d) {
                return xScale(d.getParsedTime())
            })
            .y(function (d) {
                return yScale(d.cases)
            });
        // Add the line
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", lineFunc(data)
            );
    }

    const urlAustria = 'https://api.covid19api.com/dayone/country/austria';
    const data: DataPoint[] = [];
    d3.json(urlAustria).then(function (json: any[]) {
        json.forEach((value => {
                data.push(new DataPoint(value.Date, value.Active));
            }
        ));
    }).then(() => lineGraphing(data));
}

export function boxChart(): void {
    const margin = {top: 10, right: 30, bottom: 30, left: 60};
    const width = 700;
    const height = 500;

    d3.select("svg").remove();
    const svg = d3.select('body')
        .append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    function barGraphing(data: CountryData[]): void {
        const xScale = d3.scaleBand()
            .domain(data.map(function (d) {
                return d.country;
            }))
            .range([0, width])
            .padding(0.1);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));

        // Add Y axis
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) {
                return d.cases;
            })])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(yScale));

        // Add the line
        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return xScale(d.country);
            })
            .attr("width", xScale.bandwidth())
            .attr("y", height)
            .transition().duration(1000)
            .attr("y", function (d) {
                return yScale(d.cases);
            })
            .attr("height", function (d) {
                return height - yScale(d.cases);
            });
    }

    const urlSummary = 'https://api.covid19api.com/summary';
    const data: CountryData[] = [];
    d3.json(urlSummary).then(function (json: any) {
        json.Countries.forEach((country: any) => {
            data.push(new CountryData(country.CountryCode, country.TotalConfirmed));
        });
    })
        .then(() => data.sort((a, b): number => {
            if (a.cases > b.cases) {
                return -1;
            }
            if (a.cases < b.cases) {
                return 1;
            }
            return 0;
        }))
        .then(() => barGraphing(data.slice(0, 11)));
}
