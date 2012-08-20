chart1.labelVarView = function (rawSelection, woodString, cityString, variationString, red) {
	if (!woodString) {woodString = selectedWood};
	if (!cityString) {cityString = selectedCity};
	if (!variationString) {variationString = selectedVariation};

	var city = dataTransform.filterCity(cityString)
	dataTransform.calculateVar(city, woodString, variationString)

	if (!chart1.labelVarView.d) {d = city.months[0]}
		else {d = chart1.labelVarView.d};
	if (rawSelection) {chart1.labelVarView.rawSelection = rawSelection}
		else {rawSelection = chart1.labelVarView.rawSelection};
	var color1, color2
	if (!red) {
		color1 = "black"
		color2 = "gray"
	} else {
		color1 = "red"
		color2 = "#fd627b"
	}

	var labelDist = .4

	var parentDiv = d3.select(rawSelection)
	var sel = d3.select(rawSelection)
	var w = parseFloat(sel.style("width"))
	var h = parseFloat(sel.style("height"))
	var yS = d3.scale.linear().domain(chart1Amplitude).range([0,h])
	var xS = d3.scale.ordinal()
		.rangeRoundBands([0,w], 0.02, 0)
		.domain(monthNames)

	sel.selectAll("svg").data([1])
		.enter().append("svg")
		.attr("width", w)
		.attr("height", h)
	sel = sel.select("svg")

	//sel.selectAll("text").remove()
	sel.selectAll("path").remove()
	parentDiv.selectAll("div").remove()

	parentDiv.style("position", "relative")

	//Year Label
	var yearLabel = parentDiv.append("div")
		.attr("class", "v-e-ty")
		.style({position: "absolute",	"color": color2, "pointer-events": "none"})
	yearLabel.append("p").text("year")
	yearLabel.append("p").text(d3.round(d.vy[0]-d.vy[1], 1) + "%")
	yearLabel.selectAll("p")
		.style({
			margin: 0,
			padding: "3px",
			"text-align": "center",
			background: "white"
		})
	var yearLabelW = parseFloat(yearLabel.style("width"))
	var yearLabelH = parseFloat(yearLabel.style("height"))
	yearLabel.style({
		top: (yS(d.vy[1]) + yS(d.vy[0]))/2 - yearLabelH/2 +"px",
		left: w/3*1 - yearLabelW/2 +"px"
	})

	sel.append("path")
		.classed("v-e-py0", true)
		.attr({
			d: "M"+w+" "+(Math.round(yS(d.vy[0]))+0.5)+" "+
				"L"+w/3*1+" "+(Math.round(yS(d.vy[0]))+0.5)+" "+
				"L"+w/3*1+" "+(Math.round(yS(d.vy[1]))+0.5)+" "+
				"L"+w+" "+(Math.round(yS(d.vy[1]))+0.5)+" ",
			// "shape-rendering": "crispEdges",
			"stroke-width": 1,
			fill: "none",
			stroke: color2
		})

	//MONTH LABEL
	var monthLabel = parentDiv.append("div")
		.attr("class", "v-e-tm")
		.style({position: "absolute",	"color": color1, "pointer-events": "none"})
	monthLabel.append("p").text("month")
	monthLabel.append("p").text(d3.round(d.vm[0]-d.vm[1], 1) + "%")
	monthLabel.selectAll("p")
		.style({
			margin: 0,
			padding: "3px",
			"text-align": "center",
			background: "white"
		})
	var monthLabelW = parseFloat(monthLabel.style("width"))
	var monthLabelH = parseFloat(monthLabel.style("height"))
	monthLabel.style({
		top: (yS(d.vm[1]) + yS(d.vm[0]))/2 - monthLabelH/2 +"px",
		left: w/3*2 - monthLabelW/2 +"px"
	})

	sel.append("path")
		.classed("v-e-pm0", true)
		.attr({
			d: "M"+w+" "+(Math.round(yS(d.vm[0]))+0.5)+" "+
				"L"+w/3*2+" "+(Math.round(yS(d.vm[0]))+0.5)+" "+
				"L"+w/3*2+" "+(Math.round(yS(d.vm[1]))+0.5)+" "+
				"L"+w+" "+(Math.round(yS(d.vm[1]))+0.5)+" ",
			stroke: color2,
			// "shape-rendering": "crispEdges",
			"stroke-width": 1,
			fill: "none"
		})
}
chart1.labelVarView.clickTransition = function () {

	var city = dataTransform.filterCity(selectedCity)
	dataTransform.calculateVar(city, selectedWood)

	d = city.months[0]
	rawSelection = chart1.labelVarView.rawSelection

	var labelDist = .4

	var parentDiv = d3.select(rawSelection)
	var sel = d3.select(rawSelection)
	var w = parseFloat(sel.style("width"))
	var h = parseFloat(sel.style("height"))
	var yS = d3.scale.linear().domain(chart1Amplitude).range([0,h])
	var xS = d3.scale.ordinal()
		.rangeRoundBands([0,w], 0.02, 0)
		.domain(monthNames)

	sel = sel.select("svg")

	//YEAR LABEL
	var yearLabel = parentDiv.select(".v-e-ty")
	var yearLabelW = parseFloat(yearLabel.style("width"))
	var yearLabelH = parseFloat(yearLabel.style("height"))
	yearLabel
		.transition()
		.style({
			top: (yS(d.vy[1]) + yS(d.vy[0]))/2 - yearLabelH/2 +"px",
			left: w/3*1 - yearLabelW/2 +"px",
			color: "gray"
		})
	sel.select(".v-e-py0")
		.transition()
		.attr({
			d: "M"+w+" "+(Math.round(yS(d.vy[0]))+0.5)+" "+
				"L"+w/3*1+" "+(Math.round(yS(d.vy[0]))+0.5)+" "+
				"L"+w/3*1+" "+(Math.round(yS(d.vy[1]))+0.5)+" "+
				"L"+w+" "+(Math.round(yS(d.vy[1]))+0.5)+" ",
			stroke: "gray"
		})

	//MONTH LABEL
	var monthLabel = parentDiv.select(".v-e-tm")
	var monthLabelW = parseFloat(monthLabel.style("width"))
	var monthLabelH = parseFloat(monthLabel.style("height"))
	monthLabel
		.transition()
		.style({
			top: (yS(d.vm[1]) + yS(d.vm[0]))/2 - monthLabelH/2 +"px",
			left: w/3*2 - monthLabelW/2 +"px",
			color: "black"
		})
	sel.select(".v-e-pm0")
		.transition()
		.attr({
			d: "M"+w+" "+(Math.round(yS(d.vm[0]))+0.5)+" "+
				"L"+w/3*2+" "+(Math.round(yS(d.vm[0]))+0.5)+" "+
				"L"+w/3*2+" "+(Math.round(yS(d.vm[1]))+0.5)+" "+
				"L"+w+" "+(Math.round(yS(d.vm[1]))+0.5)+" ",
			stroke: "black"
		})
}