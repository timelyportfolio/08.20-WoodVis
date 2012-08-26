
chart1.condensedView = function (rawSelection) {
	if (rawSelection) {chart1.condensedView.rawSelection = rawSelection}
		else {rawSelection = chart1.condensedView.rawSelection};
	
	var citiesNames = data.cities.map(function (d) {
		return d.name
	})
	data.cities.forEach(function (d,i) {
		//dataTransform.filterCity(d.name)
		dataTransform.calculateVar(d, selectedWood)
	})

	var sel = d3.select(rawSelection)
	var w = parseFloat(sel.style("width"))
	var h = parseFloat(sel.style("height"))
	var yS = d3.scale.linear().domain(chart1Amplitude).range([0,h])
	var xSGroups = d3.scale.ordinal()
		.rangeRoundBands([0,w], 0.001, 0)
		.domain(citiesNames)
	var xS = d3.scale.ordinal()
		.rangeRoundBands([0,xSGroups.rangeBand()], 0.1, 0)
		.domain(monthNames)

	sel.selectAll("svg").data([1])
		.enter().append("svg")
		.attr("width", w)
		.attr("height", h)
	sel = sel.select("svg")

	var groups = sel.selectAll("svg").data(data.cities)
		.enter().append("g")
		.classed("v-e-cityGroup", true)
		.attr("transform", function (d,i) {
			return "translate("+xSGroups(d.name)+",0)"
		})
		.style("cursor", "pointer")
		.on("mouseover", function (d) {
			var red = true
			chart1.cityView.setRed(d.name)
			var sel = d3.select(this).selectAll(".v-e-monthBlock")
				.attr("fill", "red")
			chart1.varView.addRed(false, d)
			if (d.name == selectedCity) {
				sel.attr("fill", "black")
				chart1.varView.removeRed()
				red = false
			} 
			
			chart1.varView.removeLabel()
			chart1.labelVarView.d = undefined
			chart1.labelVarView(false, false, d.name, false, red)
		})
		.on("mouseout", function (d) {
			chart1.varView.removeRed()
			var sel = d3.select(this)
			var red = sel.selectAll(".v-e-monthBlock")
				.attr("fill", "gray")
			if (d.name == selectedCity) {
				red.attr("fill", "black")
			}
			chart1.cityView.unsetRed()
			chart1.labelVarView.d = undefined
			chart1.labelVarView()
		})
		.on("click", function (d) {
			selectedCity = d.name
			chart1.varView.removeLabel()
			chart1.varView.update()

			chart1.labelVarView.clickTransition()
			chart1.cityView.setBlack()
			chart1.condensedView.setBlack()

		})
	var months = groups.selectAll("g")
		.data(function (d,i) {return d.months})
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
		.attr("width", xS.rangeBand())
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
		.attr("width", xS.rangeBand())
		.attr("height", function (d,i) {
			return yS(d.vm[1]) - yS(d.vm[0])
		})
		.attr("fill", "gray")
		.attr("shape-rendering", "crispEdges")
		.attr("pointer-events", "none")

	//GROUPS Number
	// groups.append("text")
	// 	.text(function (d,i) {
	// 		return d3.format("02d")(i+1)
	// 	})
	// 	.attr({
	// 		fill: "white",
	// 		x: xSGroups.rangeBand()/2,
	// 		y: h/2,
	// 		"text-anchor": "middle",
	// 		"pointer-events": "none",
	// 		dy: ".35em"
	// 	})

	//GROUPS Color
	groups.each(function (d,i) {
		if (d.name == selectedCity) {
			var sel = d3.select(this)
			sel.selectAll(".v-e-monthBlock")
				.classed("v-e-black", true)
				.attr("fill", "black")
		};
	})
}
chart1.condensedView.setRed = function (cityName) {
	var sel = d3.select(chart1.condensedView.rawSelection)
	var groups = sel.selectAll(".v-e-cityGroup")
	groups.each(function (d,i) {
		if (d.name == cityName && d.name != selectedCity) {
			var sel = d3.select(this)
			sel.selectAll(".v-e-monthBlock")
				.classed("v-e-red", true)
				.attr("fill", "red")
		};
	})
}
chart1.condensedView.unsetRed = function () {
	var sel = d3.select(chart1.condensedView.rawSelection)
	var red = sel.selectAll(".v-e-red")
		.classed("v-e-red", false)
		.attr("fill", "gray")
	if (red.classed("v-e-black")) {
		red.attr("fill", "black")
	} else {red.attr("fill", "gray")};	
}
chart1.condensedView.setBlack = function () {
	var sel = d3.select(chart1.condensedView.rawSelection)
	sel.selectAll(".v-e-black")
		.classed("v-e-black", false)
		.attr("fill", "gray")
	var groups = sel.selectAll(".v-e-cityGroup")	
	groups.each(function (d,i) {
		if (d.name == selectedCity) {
			var sel = d3.select(this)
			sel.selectAll(".v-e-monthBlock")
				.classed("v-e-black", true)
				.attr("fill", "black")
		};
	})
}
chart1.condensedView.update = function (woodName, variationName) {
	if (!woodName) {woodName = selectedWood};
	if (!variationName) {variationName = selectedVariation};
	var citiesNames = data.cities.map(function (d) {
		return d.name
	})
	data.cities.forEach(function (d,i) {
		dataTransform.calculateVar(d, woodName, variationName)
	})

	var sel = d3.select(chart1.condensedView.rawSelection)
	var h = parseFloat(sel.style("height"))
	var yS = d3.scale.linear().domain(chart1Amplitude).range([0,h])

	var groups = sel.selectAll(".v-e-cityGroup").data(data.cities)
	var months = groups.selectAll("g")
		.data(function (d,i) {return d.months})

	//Year block
	months.select(".v-e-yearBlock")
		.attr("y", function (d) {
			return yS(d.vy[0])
		})
		.attr("height", function (d,i) {
			return yS(d.vy[1]) - yS(d.vy[0])
		})
	//Month block
	months.select(".v-e-monthBlock")
		.attr("y", function (d) {
			return yS(d.vm[0])
		})
		.attr("height", function (d,i) {
			return yS(d.vm[1]) - yS(d.vm[0])
		})
}