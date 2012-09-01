chart3.condensedView = function (rawSelection) {

	if (rawSelection) {chart3.condensedView.rawSelection = rawSelection}
		else {rawSelection = chart3.condensedView.rawSelection};

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
	var yS = d3.scale.linear().domain(chart3Amplitude).range([0,h])
	var xSGroups = d3.scale.ordinal()
		.rangeRoundBands([0,w], 0.1, 0)
		.domain(citiesNames)
	var xS = d3.scale.ordinal()
		.rangeRoundBands([0,xSGroups.rangeBand()], 0.3, 0)
		.domain(monthNames)

	sel.selectAll("svg").data([1])
		.enter().append("svg")
		.attr("width", w)
		.attr("height", h)
	sel = sel.select("svg")

	var groups = sel.selectAll("g").data(data.cities)
		.enter().append("g")
		.classed("v-e-cityGroup", true)
		.attr("transform", function (d,i) {
			return "translate("+xSGroups(d.name)+",0)"
		})
		.style("cursor", "pointer")
		.on("mouseover", function (d) {
			// chart1.cityView.setRed(d.name)
			var sel = d3.select(this).selectAll(".v-e-monthBlock")
				.attr("fill", "green")
			if (d.name == selectedCity) {
				sel.attr("fill", "black")
				// chart1.varView.removeRed()
			} 
			chart3.mainView.hoverInfoOn(d.name, false, false)
			chart3.labelMainView.hoverOn(d.name, false, false)
			chart3.cityView.setSelection(d.name)
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
			chart3.mainView.hoverInfoOff()
			chart3.labelMainView.hoverOff() 
			chart3.cityView.setSelection()
			// chart1.cityView.unsetRed()
			// chart1.labelVarView.d = undefined
			// chart1.labelVarView()
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

	//Months
	var months = groups.selectAll("g")
		.data(function (d,i) {return d.months})
		.enter().append("g")
		.attr("transform", function (d,i) {
			return "translate("+ xS(d.month) +",0)"
		})
	months.each(function(d,i){
			if (i%2 == 0) {
				d3.select(this).append("rect")
					.attr({
						x:0,y:0,width:xS.rangeBand(),height:h,
						fill:"#f4f4f4"
					})
			};
		})

	//GreenLine
	groups.append("line")
		.attr({
			x1: 0, x2: xSGroups.rangeBand(),
			y1: yS(100), y2: yS(100),
			stroke: "green", "stroke-width": 2,
			"shape-rendering": "crispEdges"
		})
		
	//Month block
	months.append("rect")
		.classed("v-e-monthBlock", true)
		.attr("x", 0)
		.attr("y", function (d) {
			return yS(d.abs[0])
		})
		.attr("width", xS.rangeBand())
		.attr("height", function (d,i) {
			return yS(d.abs[1]) - yS(d.abs[0])
		})
		.attr("fill", "gray")
		.attr("shape-rendering", "crispEdges")
		// .attr("pointer-events", "none")

	groups.each(function (d,i) {
		if (d.name == selectedCity) {
			var sel = d3.select(this)
			sel.selectAll(".v-e-monthBlock")
				.classed("v-e-black", true)
				.attr("fill", "black")
		};
	})

	chart3.condensedView.adjust = function (woodString, varString) {

		var cityString = selectedCity
		if (!woodString) {woodString = selectedWood};
		if (!varString) {varString = selectedVariation};

		data.cities.forEach(function (d,i) {
			//dataTransform.filterCity(d.name)
			dataTransform.calculateVar(d, woodString, varString)
		})

		groups.data(data.cities)
			.selectAll(".v-e-monthBlock")
			.data(function (d,i) {return d.months})
			.attr("y", function (d) {
				return yS(d.abs[0])
			})
			.attr("height", function (d,i) {
				return yS(d.abs[1]) - yS(d.abs[0])
			})

	}

	chart3.condensedView.setSelection = function (cityString) {

		sel.selectAll(".v-e-black, .green, .v-e-monthBlock")
			.attr("class", "v-e-monthBlock")
			.attr("fill", "gray")

		groups.each(function (d,i){
			if (d.name == cityString) {
				d3.select(this).selectAll(".v-e-monthBlock")
					.classed("green", true)
					.attr("fill", "green")
			}
			if (d.name == selectedCity) {
				d3.select(this).selectAll(".v-e-monthBlock")
					.classed("v-e-black", true)
					.attr("fill", "black")
			}
		})


	}

}












