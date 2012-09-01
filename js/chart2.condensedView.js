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
		.rangeBands([0,w], 0.2, 0)
		.domain(citiesNames)
	var xS = d3.scale.ordinal()
		.rangeBands([0,xSGroups.rangeBand()], 0, 0)
		.domain(monthNames)

	var tempYS = d3.scale.linear().domain(tempAmpl)
		.range([0+margins[0], h-margins[2]])
	var humYS = d3.scale.linear().domain(humAmpl)
		.range([0+margins[0], h-margins[2]])
	var emcYS = d3.scale.linear().domain(emcAmpl)
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
			var sel = d3.select(this).selectAll("circle")
				.attr("fill", "gray")

			if (d.name == selectedCity) {
				sel.attr("fill", "black")
			} 
			
			chart2.cityView.setSelection(d.name)
			chart2.labelMainView.cityHover(d.name)
			chart2.mainView.cityHover(d.name)
		})
		.on("mouseout", function (d) {
			var sel = d3.select(this).selectAll("circle")
				.attr("fill", "white")

			if (d.name == selectedCity) {
				sel.attr("fill", "black")
			} 

			chart2.cityView.setSelection()
			chart2.labelMainView.removeCityHover()
			chart2.mainView.cityRemoveHover()

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

	chart2.condensedView.setSelection = function (cityString) {

		groups.selectAll("circle")
			.attr("class", "")
			.attr("fill", "white")

		groups.each(function (d,i){
			if (d.name == cityString) {
				d3.select(this).selectAll("circle")
					.classed("gray", true)
					.attr("fill", "gray")
			}
			if (d.name == selectedCity) {
				d3.select(this).selectAll("circle")
					.classed("black", true)
					.attr("fill", "black")
			}
		})


	}

}















