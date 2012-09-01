
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
		.rangeRoundBands([0,w], 0.1, 0)
		.domain(citiesNames)
	var xS = d3.scale.ordinal()
		.rangeBands([0,xSGroups.rangeBand()], 0.1, 0)
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
			var sel = d3.select(this).selectAll(".v-e-monthBlock")
				.attr("fill", "red")
			if (d.name == selectedCity) {
				sel.attr("fill", "black")
			} 
			
			//Chart1
			//CityView
			chart1.cityView.setSelection(d.name)
			//LabelView
			chart1.labelVarView.hoverOn(d.name, false, false)
			//VarView
			chart1.varView.removeLabel()
			chart1.varView.hoverOn(d.name, false, false)
		})
		.on("mouseout", function (d) {
			var sel = d3.select(this)
			var red = sel.selectAll(".v-e-monthBlock")
				.attr("fill", "gray")
			if (d.name == selectedCity) {
				red.attr("fill", "black")
			}

			//Chart1
			//CityView
			chart1.cityView.setSelection()
			//LabelView
			chart1.labelVarView.hoverOff()
			// chart1.labelVarView()
			//VarView
			chart1.varView.hoverOff()
		})
		.on("click", function (d) {
			selectedCity = d.name
			//Chart1
			//City
			chart1.cityView.setSelection()
			//Label
			chart1.labelVarView.hoverOff()
			//Var
			chart1.varView.removeLabel()
			chart1.varView.hoverOff()
			//Condensed
			chart1.condensedView.setSelection()

			//Chart2
			chart2.labelMainView.removeCityHover()
			chart2.mainView.cityHover(d.name)
			chart2.mainView.cityRemoveHover()
			chart2.condensedView.setSelection()
			chart2.cityView.setSelection(d.name)

			//Chart3
			chart3.mainView.hoverInfoOff()
			chart3.labelMainView.hoverOff() 
			chart3.condensedView.setSelection()
			chart3.cityView.setSelection(d.name)

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
	
	groups.append("line")
		.attr({
			x1: 0, x2: xSGroups.rangeBand(),
			y1: yS(0), y2: yS(0),
			stroke: "white", "stroke-width": 2,
			"shape-rendering": "crispEdges"
		})

	//GROUPS Color
	groups.each(function (d,i) {
		if (d.name == selectedCity) {
			var sel = d3.select(this)
			sel.selectAll(".v-e-monthBlock")
				.classed("v-e-black", true)
				.attr("fill", "black")
		};
	})

	chart1.condensedView.setSelection = function (cityString) {

		sel.selectAll(".v-e-black, .red, .v-e-monthBlock")
			.attr("class", "v-e-monthBlock")
			.attr("fill", "gray")

		groups.each(function (d,i){
			if (d.name == cityString) {
				d3.select(this).selectAll(".v-e-monthBlock")
					.classed("red", true)
					.attr("fill", "red")
			}
			if (d.name == selectedCity) {
				d3.select(this).selectAll(".v-e-monthBlock")
					.classed("v-e-black", true)
					.attr("fill", "black")
			}
		})


	}

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