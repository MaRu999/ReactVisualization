# README

## Regarding the index.html
The index.html in the dist-folder is the "true" index.

## Usage
Simply click on a button to display the corresponding graph.
The graphing-functions are set up in such a way that the "clean" the svg before every append of a graph, 
so there will be always only one graph displayed.

## Used Info
The Bar-chart will show the top 10 countries in total cases of COVID-19, starting with the one with the most cases on the left.
The Line-graph will show the active Corona-cases in Austria. 

## Known Issues
There are no issues in the code itself, but the d3.json command exectued by the Bar-chart sometimes returns a "Too many requests" error.
If this happens, no chart will be drawn.
This can be confirmed by checking the console (e.g. with the Chrome dev-tools).
In that case, simply waiting a few seconds and then clicking the button again is usually enough to get the chart to display.
This is not an issue with the code, as only one request is sent per draw. 
It is entirely possible that this was a result of frequent testing during development and won't affect normal use of the application at all.