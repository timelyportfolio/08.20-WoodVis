chart2.condensedView = function (rawSelection) {

	if (rawSelection) {chart2.condensedView.rawSelection = rawSelection}
		else {rawSelection = chart2.condensedView.rawSelection};

	var citiesNames = data.cities.map(function (d) {
		return d.name
	})

	var margins = [0,0,10,0]

	var sel = d3.select(rawSelection)
	var w = parseFloat(sel.style("width"))
	var h = parseFloat(sel.style("height"))
	// var yS = d3.scale.linear().domain(chart1Amplitude).range([0,h])
	var xSGroups = d3.scale.ordinal()
		.rangeRoundBands([0,w], 0.001, 0)
		.domain(citiesNames)
	var xS = d3.scale.ordinal()
		.rangeRoundBands([0,xSGroups.rangeBand()], 0, 0)
		.domain(monthNames)

	var tempYS = d3.scale.linear().domain([40,-10])
		.range([0+margins[0], h-margins[2]])
	var humYS = d3.scale.linear().domain([100,0])
		.range([0+margins[0], h-margins[2]])
	var emcYS = d3.scale.linear().domain([30,5])
		.range([0+margins[0], h-margins[2]])

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
			// chart1.cityView.setRed(d.name)
			var sel = d3.select(this).selectAll(".v-e-monthBlock")
				.attr("fill", "red")
			// chart1.varView.addRed(false, d)
			if (d.name == selectedCity) {
				sel.attr("fill", "black")
				// chart1.varView.removeRed()
				red = false
			} 
			
			// chart1.varView.removeLabel()
			// chart1.labelVarView.d = undefined
			// chart1.labelVarView(false, false, d.name, false, red)
		})
		.on("mouseout", function (d) {
			// chart1.varView.removeRed()
			var sel = d3.select(this)
			var red = sel.selectAll(".v-e-monthBlock")
				.attr("fill", "gray")
			if (d.name == selectedCity) {
				red.attr("fill", "black")
			}
			// chart1.cityView.unsetRed()
			// chart1.labelVarView.d = undefined
			// chart1.labelVarView()
		})
		.on("click", function (d) {
			selectedCity = d.name
			// chart1.varView.removeLabel()
			// chart1.varView.update()

			// chart1.labelVarView.clickTransition()
			// chart1.cityView.setBlack()
			// chart1.condensedView.setBlack()
		})
	groups.append("rect")
		.attr({
			x:0, y:0, width:xSGroups.rangeBand(), height:h,
			fill:"white"
		})

	var months = groups.selectAll("g")
		.data(function (d,i) {return d.months})
		.enter().append("g")
		.attr("transform", function (d,i) {
			return "translate("+ xS(d.month) +",0)"
		})

	//Temp Block
	months.append("rect")
		.classed("v-e-tempBlock", true)
		.attr({
			"x": xS.rangeBand()/3*0,
			"y": function (d) {return tempYS(d.t[0])},
			"fill": "red",
			"shape-rendering": "crispEdges",
			"width": xS.rangeBand()/3,
			"height": function (d,i) {return tempYS(d.t[1]) - tempYS(d.t[0])},
			opacity: 1
		})
	//Hum Block
	months.append("rect")
		.classed("v-e-humBlock", true)
		.attr({
			"x": xS.rangeBand()/3*1,
			"y": function (d) {return humYS(d.h[0])},
			"fill": "blue",
			"shape-rendering": "crispEdges",
			"width": xS.rangeBand()/3,
			"height": function (d,i) {return humYS(d.h[1]) - humYS(d.h[0])},
			opacity: 1
		})
	//EMC Block
	months.append("rect")
		.classed("v-e-emcBlock", true)
		.attr({
			"x": xS.rangeBand()/3*2,
			"y": function (d) {return emcYS(d.emc[0])},
			"fill": "gray", //#c09d2e
			"shape-rendering": "crispEdges",
			"width": xS.rangeBand()/3,
			"height": function (d,i) {return emcYS(d.emc[1]) - emcYS(d.emc[0])},
			opacity: 1
		})

	//Selected Ball
	groups.append("circle")
		.attr({
			"cx": xSGroups.rangeBand()/2,
			"cy": h-8,
			"fill": "white",
			r: 4
		})
	//Ball Color
	groups.each(function (d,i) {
		if (d.name == selectedCity) {
			var sel = d3.select(this)
			sel.select("circle")
				.attr("fill", "black")
		};
	})
}















