chart1.varView = function (rawSelection) {

	if (rawSelection) {chart1.varView.rawSelection = rawSelection}
		else {rawSelection = chart1.varView.rawSelection};

	var city = dataTransform.filterCity(selectedCity)
	dataTransform.calculateVar(city, selectedWood)

	var sel = d3.select(rawSelection)
	var w = parseFloat(sel.style("width"))
	var h = parseFloat(sel.style("height"))
	var yS = d3.scale.linear().domain(chart1Amplitude).range([0,h])
	var xS = d3.scale.ordinal()
		.rangeBands([0,w], 0.08, 0)
		.domain(monthNames)
	sel = sel.append("svg")
		.attr("width", w)
		.attr("height", h)

	chart1.varView.xS = xS
	chart1.varView.yS = yS

	//Define months groups
	var months = sel
		.selectAll("g").data(city.months)
	  .enter().append("g")
		.attr("transform", function (d,i) {
			return "translate("+ xS(d.month) +",0)"
		})
	

	//Year block
	months.append("rect")
		.classed("v-e-yearBlock", true)
		.attr("x", 0)
		.attr("y", function (d) {
			return yS(d.vy[0])
		})
		.attr("fill", "lightgray")
		.attr("shape-rendering", "crispEdges")
		.attr("width", xS.rangeBand()/2)
		.attr("height", function (d,i) {
			return yS(d.vy[1]) - yS(d.vy[0])
		})
	months.append("rect")
		.classed("v-e-yearBlock", true)
		.classed("v-e-yearRed", true)
		.attr("x", xS.rangeBand()/2)
		.attr("y", function (d) {
			return yS(d.vy[0])
		})
		.attr("fill", "lightgray")
		.attr("shape-rendering", "crispEdges")
		.attr("width", xS.rangeBand()/2)
		.attr("height", function (d,i) {
			return yS(d.vy[1]) - yS(d.vy[0])
		})

	//Month block
	months.append("rect")
		.classed("v-e-monthBlock", true)
		.attr("x", 0)
		.attr("y", function (d) {
			return yS(d.vm[0])
		})
		.attr("width", xS.rangeBand()/2)
		.attr("height", function (d,i) {
			return yS(d.vm[1]) - yS(d.vm[0])
		})
		.attr("fill", "black")
		.attr("shape-rendering", "crispEdges")
		.attr("pointer-events", "none")
	months.append("rect")
		.classed("v-e-monthBlock", true)
		.classed("v-e-monthRed", true)
		.attr("x", xS.rangeBand()/2)
		.attr("y", function (d) {
			return yS(d.vm[0])
		})
		.attr("width", xS.rangeBand()/2)
		.attr("height", function (d,i) {
			return yS(d.vm[1]) - yS(d.vm[0])
		})
		.attr("fill", "black")
		.attr("shape-rendering", "crispEdges")
		.attr("pointer-events", "none")

	//Mean line
	months.append("line")
		.attr("x1", 0)
		.attr("x1", function (d) {
			return xS.rangeBand()+2
		})
		.attr("y1", function (d) {return (yS(d.vm[1]) + yS(d.vm[0]))/2})
		.attr("y2", function (d) {return (yS(d.vm[1]) + yS(d.vm[0]))/2})
		.attr("stroke", "white")
		.attr("stroke-width", 2)
		.attr("shape-rendering", "crispEdges")
		.attr("pointer-events", "none")

	//Month label
	months.append("text")
		.attr({
			x: xS.rangeBand()/2,
			y: h-6,
			"text-anchor": "middle",
			"pointer-events": "none"
		})
		.text(function (d) {return d.month})

	//Mouse Over
	months.on("mouseover", function mouseover (d,i) {
		var sel = d3.select(this)
		var city = dataTransform.filterCity(selectedCity)
		dataTransform.calculateVar(city, selectedWood)
		d = city.months[i]

		months.selectAll(".v-e-label").remove()
		months.selectAll("text").attr("fill", "gray")
			.attr("font-weight", "none")
		sel.select("text").attr("fill", "red")
			.attr("font-weight", "bold")

		chart1.labelVarView.hoverOn(false,false,false,i)

		sel.select(".v-e-monthRed")
			.attr("fill", "red")
		sel.select(".v-e-monthBlock")
			.attr("fill", "red")
		sel.select(".v-e-yearRed")
			.attr("fill", "#ffe2e6")
		sel.select(".v-e-yearBlock")
			.attr("fill", "#ffe2e6")

		sel.append("text")
			.attr({
				x: xS.rangeBand()/2,
				y: function (e) {return yS(d.vm[0])},
				"text-anchor": "middle",
				dy: "-.4em",
				"class": "v-e-label",
				"pointer-events": "none",
				"font-size": 11,
				"font-weight": "bold",
				fill: "red"
			})
			.text(function (e) {return "+"+d3.round(d.vm[0], 1)+"%"})

		sel.append("text")
			.attr({
				x: xS.rangeBand()/2,
				y: function (e) {return yS(d.vm[1])},
				"text-anchor": "middle",
				dy: "1em",
				"class": "v-e-label",
				"pointer-events": "none",
				"font-size": 11,
				"font-weight": "bold",
				fill: "red"
			})
			.text(function (e) {return d3.round(d.vm[1], 1)+"%"})

		sel.append("text")
			.attr({
				x: xS.rangeBand()/2,
				y: function (e) {return yS(d.vy[0])},
				"text-anchor": "middle",
				dy: "-.4em",
				fill: function (e) {
					if (d.vy[0]-d.vm[0]>.55) {
						return "#fd627b"
					} else{return "none"};
				},
				"class": "v-e-label",
				"pointer-events": "none",
				"font-size": 11
			})
			.text(function (e) {return "+"+d3.round(d.vy[0], 1)+"%"})

		sel.append("text")
			.attr({
				x: xS.rangeBand()/2,
				y: function (e) {return yS(d.vy[1])},
				"text-anchor": "middle",
				dy: "1em",
				fill: function (e) {
					if (d.vy[1]-d.vm[1]<-.55) {
						return "#fd627b"
					} else{return "none"};
				},
				"class": "v-e-label",
				"pointer-events": "none",
				"font-size": 11
			})
			.text(function (e) {return d3.round(d.vy[1], 1)+"%"})

	})
		.on("mouseout", function (d) {
			var sel = d3.select(this)
			sel.select(".v-e-monthRed")
				.attr("fill", "black")
			sel.select(".v-e-monthBlock")
				.attr("fill", "black")
			sel.select(".v-e-yearRed")
				.attr("fill", "lightgray")
			sel.select(".v-e-yearBlock")
				.attr("fill", "lightgray")

			sel.selectAll(".v-e-label").remove()
				.attr("fill", "black")
			
			chart1.labelVarView.hoverOff()
			
			months.selectAll("text").attr("fill", "gray")
			.attr("font-weight", "none")
		})

	chart1.varView.hoverOn = function (cityString, woodString, varString) {

		if (!cityString) {cityString = selectedCity};
		if (!woodString) {woodString = selectedWood};
		if (!varString) {varString = selectedVariation};

		var city = dataTransform.filterCity(cityString)
		dataTransform.calculateVar(city, woodString, varString)

		months.data(city.months)

		//Year block
		months.select(".v-e-yearBlock")
			.transition()
		months.select(".v-e-yearRed")
			.attr("y", function (d) {
				return yS(d.vy[0])
			})
			.attr("height", function (d,i) {
				return yS(d.vy[1]) - yS(d.vy[0])
			})
			.attr({
				"fill": "#ffe2e6",
				stroke: "red",
				"stroke-width": 1
			})
			.transition()


		//Month block
		months.select(".v-e-monthBlock")
			.transition()
		months.select(".v-e-monthRed")
			.attr("y", function (d) {
				return yS(d.vm[0])
			})
			.attr("height", function (d,i) {
				return yS(d.vm[1]) - yS(d.vm[0])
			})
			.attr("fill", "#ff0000")
			.transition()

	}

	chart1.varView.hoverOff = function () {

		var cityString = selectedCity
		var woodString = selectedWood
		var varString = selectedVariation

		var city = dataTransform.filterCity(cityString)
		dataTransform.calculateVar(city, woodString, varString)
		months.data(city.months)

		//Year block
		months.select(".v-e-yearBlock")
			.transition()
			.attr("y", function (d) {
				return yS(d.vy[0])
			})
			.attr("height", function (d,i) {
				return yS(d.vy[1]) - yS(d.vy[0])
			})
			.attr("fill", "lightgray")
		months.select(".v-e-yearRed")
			.transition()
			.attr("y", function (d) {
				return yS(d.vy[0])
			})
			.attr("height", function (d,i) {
				return yS(d.vy[1]) - yS(d.vy[0])
			})
			.attr({
				"fill": "lightGray",
				stroke: "none"
			})


		//Month block
		months.select(".v-e-monthBlock")
			.transition()
			.attr("y", function (d) {
				return yS(d.vm[0])
			})
			
			.attr("height", function (d,i) {
				return yS(d.vm[1]) - yS(d.vm[0])
			})
			.attr("fill", "#000000")
		months.select(".v-e-monthRed")
			.transition()
			.attr("y", function (d) {
				return yS(d.vm[0])
			})
			.attr("height", function (d,i) {
				return yS(d.vm[1]) - yS(d.vm[0])
			})
			.attr("fill", "black")
			.attr("stroke", "none")

	}

}

chart1.varView.removeLabel = function () {
	d3.select(chart1.varView.rawSelection).selectAll(".v-e-label").remove()
	var months = d3.select(chart1.varView.rawSelection).selectAll("g")
	months.selectAll("text").attr("fill", "gray")
			.attr("font-weight", "none")
}
