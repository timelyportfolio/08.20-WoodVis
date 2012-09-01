chart1.labelVarView = function (rawSelection) {
	
	if (rawSelection) {chart1.labelVarView.rawSelection = rawSelection}
		else {rawSelection = chart1.labelVarView.rawSelection};

	var city = dataTransform.filterCity(selectedCity)
	dataTransform.calculateVar(city, selectedWood, selectedVariation)

	d = city.months[0]

	// var color1, color2
	// if () {
	// 	color1 = "black"
	// 	color2 = "gray"
	// } else {
	// 	color1 = "red"
	// 	color2 = "#fd627b"
	// }

	var labelDist = .4

	var parentDiv = d3.select(rawSelection)
	var sel = d3.select(rawSelection)
	var w = parseFloat(sel.style("width"))
	var h = parseFloat(sel.style("height"))
	var yS = d3.scale.linear().domain(chart1Amplitude).range([0,h])
	var xS = d3.scale.ordinal()
		.rangeRoundBands([0,w], 0.02, 0)
		.domain(monthNames)

	sel.append("svg")
		.attr("width", w)
		.attr("height", h)
	sel = sel.select("svg")

	//sel.selectAll("text").remove()
	// sel.selectAll("path").remove()
	// parentDiv.selectAll("div").remove()

	parentDiv.style("position", "relative")

	//Year Label
	var yearLabel = parentDiv.append("div")
		.attr("class", "v-e-ty")
		.style({
			position: "absolute",
			"color": "gray", "pointer-events": "none"
		})

	yearLabel.append("p").text("year")

	var yearText = yearLabel.append("p").text(d3.round(d.vy[0]-d.vy[1], 1) + "%")
	yearLabel.selectAll("p")
		.style({
			margin: 0,
			padding: "1px",
			"text-align": "center",
			background: "white"
		})

	var yearLabelW = parseFloat(yearLabel.style("width"))
	var yearLabelH = parseFloat(yearLabel.style("height"))
	yearLabel.style({
		top: (yS(d.vy[1]) + yS(d.vy[0]))/2 - yearLabelH/2 +"px",
		left: w/3*1 - yearLabelW/2 +"px"
	})

	var yearPath = sel.append("path")
		.classed("v-e-py0", true)
		.attr({
			d: "M"+w+" "+(Math.round(yS(d.vy[0]))+0.5)+" "+
				"L"+w/3*1+" "+(Math.round(yS(d.vy[0]))+0.5)+" "+
				"L"+w/3*1+" "+(Math.round(yS(d.vy[1]))+0.5)+" "+
				"L"+w+" "+(Math.round(yS(d.vy[1]))+0.5)+" ",
			// "shape-rendering": "crispEdges",
			"stroke-width": 1,
			fill: "none",
			stroke: "gray"
		})

	//MONTH LABEL
	var monthLabel = parentDiv.append("div")
		.attr("class", "v-e-tm")
		.style({position: "absolute",	"color": "black", "pointer-events": "none"})
	monthLabel.append("p").text("month")
	var monthText = monthLabel.append("p").text(d3.round(d.vm[0]-d.vm[1], 1) + "%")
	monthLabel.selectAll("p")
		.style({
			margin: 0,
			padding: "1px",
			"text-align": "center",
			background: "white"
		})
	var monthLabelW = parseFloat(monthLabel.style("width"))
	var monthLabelH = parseFloat(monthLabel.style("height"))
	monthLabel.style({
		top: (yS(d.vm[1]) + yS(d.vm[0]))/2 - monthLabelH/2 +"px",
		left: w/3*2 - monthLabelW/2 +"px"
	})

	var monthPath = sel.append("path")
		.classed("v-e-pm0", true)
		.attr({
			d: "M"+w+" "+(Math.round(yS(d.vm[0]))+0.5)+" "+
				"L"+w/3*2+" "+(Math.round(yS(d.vm[0]))+0.5)+" "+
				"L"+w/3*2+" "+(Math.round(yS(d.vm[1]))+0.5)+" "+
				"L"+w+" "+(Math.round(yS(d.vm[1]))+0.5)+" ",
			stroke: "black",
			// "shape-rendering": "crispEdges",
			"stroke-width": 1,
			fill: "none"
		})

	chart1.labelVarView.hoverOn = function (cityString, woodString, varString, monthNumber) {

		if (!cityString) {cityString = selectedCity};
		if (!woodString) {woodString = selectedWood};
		if (!varString) {varString = selectedVariation};
		if (!monthNumber) {monthNumber = 0};

		var city = dataTransform.filterCity(cityString)
		dataTransform.calculateVar(city, woodString, varString)

		d = city.months[monthNumber]

		//Year
		yearLabel
			.style({
			top: (yS(d.vy[1]) + yS(d.vy[0]))/2 - yearLabelH/2 +"px",
			left: w/3*1 - yearLabelW/2 +"px",
			color: "#fd627b"
		})
		.transition()

		yearText.text(d3.round(d.vy[0]-d.vy[1], 1) + "%")

		yearPath
			.attr({
				d: "M"+w+" "+(Math.round(yS(d.vy[0]))+0.5)+" "+
					"L"+w/3*1+" "+(Math.round(yS(d.vy[0]))+0.5)+" "+
					"L"+w/3*1+" "+(Math.round(yS(d.vy[1]))+0.5)+" "+
					"L"+w+" "+(Math.round(yS(d.vy[1]))+0.5)+" ",
				stroke: "#fd627b"
			})
			.transition()

		//Month
		monthLabel
			.style({
				top: (yS(d.vm[1]) + yS(d.vm[0]))/2 - monthLabelH/2 +"px",
				left: w/3*2 - monthLabelW/2 +"px",
				color: "red"
			})
			.transition()

		monthText.text(d3.round(d.vm[0]-d.vm[1], 1) + "%")

		monthPath
			.attr({
				d: "M"+w+" "+(Math.round(yS(d.vm[0]))+0.5)+" "+
					"L"+w/3*2+" "+(Math.round(yS(d.vm[0]))+0.5)+" "+
					"L"+w/3*2+" "+(Math.round(yS(d.vm[1]))+0.5)+" "+
					"L"+w+" "+(Math.round(yS(d.vm[1]))+0.5)+" ",
				stroke: "red"
			})
			.transition()
	}
	chart1.labelVarView.hoverOff = function () {

		var cityString = selectedCity
		var woodString = selectedWood
		var varString = selectedVariation
		var monthNumber = 0

		var city = dataTransform.filterCity(cityString)
		dataTransform.calculateVar(city, woodString, varString)

		d = city.months[monthNumber]

		//Year
		yearLabel
			.transition()
			.style({
				top: (yS(d.vy[1]) + yS(d.vy[0]))/2 - yearLabelH/2 +"px",
				left: w/3*1 - yearLabelW/2 +"px",
				color: "gray"
			})

		yearText.text(d3.round(d.vy[0]-d.vy[1], 1) + "%")

		yearPath
			.transition()
			.attr({
				d: "M"+w+" "+(Math.round(yS(d.vy[0]))+0.5)+" "+
					"L"+w/3*1+" "+(Math.round(yS(d.vy[0]))+0.5)+" "+
					"L"+w/3*1+" "+(Math.round(yS(d.vy[1]))+0.5)+" "+
					"L"+w+" "+(Math.round(yS(d.vy[1]))+0.5)+" ",
				stroke: "gray"
			})

		//Month
		monthLabel
			.transition()
			.style({
				top: (yS(d.vm[1]) + yS(d.vm[0]))/2 - monthLabelH/2 +"px",
				left: w/3*2 - monthLabelW/2 +"px",
				color: "black"
			})

		monthText.text(d3.round(d.vm[0]-d.vm[1], 1) + "%")

		monthPath
			.transition()
			.attr({
				d: "M"+w+" "+(Math.round(yS(d.vm[0]))+0.5)+" "+
					"L"+w/3*2+" "+(Math.round(yS(d.vm[0]))+0.5)+" "+
					"L"+w/3*2+" "+(Math.round(yS(d.vm[1]))+0.5)+" "+
					"L"+w+" "+(Math.round(yS(d.vm[1]))+0.5)+" ",
				stroke: "black"
			})
	}

}