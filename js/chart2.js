var chart2 = {}
chart2.mainView = function (rawSelection) {

	if (rawSelection) {chart2.mainView.rawSelection = rawSelection}
		else {rawSelection = chart2.mainView.rawSelection};

	var city = dataTransform.filterCity(selectedCity)

	var sel = d3.select(rawSelection)
	var w = parseFloat(sel.style("width"))
	var h = parseFloat(sel.style("height"))
	var tempYS = d3.scale.linear().domain([40,-10]).range([0,h])
	var humYS = d3.scale.linear().domain([100,0]).range([0,h])
	var emcYS = d3.scale.linear().domain([30,0]).range([0,h])
	var xS = d3.scale.ordinal()
		.rangeRoundBands([0,w], 0.0, 0)
		.domain(monthNames)
	sel = sel.append("svg")
		.attr("width", w)
		.attr("height", h)

	//Define months groups
	var months = sel
		.selectAll("g").data(city.months)
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
			"fill": "gold",
			"shape-rendering": "crispEdges",
			"width": xS.rangeBand()/3,
			"height": function (d,i) {return emcYS(d.emc[1]) - emcYS(d.emc[0])},
			opacity: 1,
			// stroke: "black"
		})

	//Month label
	months.append("text")
		.attr({
			x: xS.rangeBand()/2,
			y: h-6,
			"text-anchor": "middle",
			"pointer-events": "none"
		})
		.text(function (d) {return d.month})
}

chart2.labelMainView = function (rawSelection) {

	if (rawSelection) {chart2.labelMainView.rawSelection = rawSelection}
		else {rawSelection = chart2.labelMainView.rawSelection};

	var sel = d3.select(rawSelection)
	var w = parseFloat(sel.style("width"))
	var h = parseFloat(sel.style("height"))

	var tempYS = d3.scale.linear().domain([40,-10]).range([10,h-12])
	var humYS = d3.scale.linear().domain([100,0]).range([10,h-12])
	var emcYS = d3.scale.linear().domain([30,0]).range([10,h-12])

	var xS = d3.scale.ordinal()
		.rangeRoundBands([10,w-10], 0, 0)
		.domain(d3.range(3))

	sel = sel.append("svg")
		.attr("width", w)
		.attr("height", h)

	var aData = [
		{axis: d3.svg.axis().orient("left").scale(tempYS), color: "red"},
		{axis: d3.svg.axis().orient("left").scale(humYS), color: "blue"},
		{axis: d3.svg.axis().orient("left").scale(emcYS), color: "gold"}
	]

	sel.selectAll("g").data(aData)
		.enter().append("g")
		.attr("transform", function (d,i) {
			return "translate("+ (xS(i)+xS.rangeBand()) +",0)"
		})
		.each(function (d,i){
			d3.select(this).call(d.axis)
		})
		.attr({
			fill: function (d){return d.color},
			"font-size": 12,
			"font-weight": "bold"
		})
		.selectAll("line")
		.attr("stroke", "gray")
	sel.selectAll("path")
		.attr({
			"fill": "none",
			stroke: "none"
		})

}

chart2.cityView = function (rawSelection) {
	if (rawSelection) {chart2.cityView.rawSelection = rawSelection}
		else {rawSelection = chart2.cityView.rawSelection};

	var sel = d3.select(rawSelection)

	var cities = sel.append("div")
		.style({
			width:"100%", height:"100%",
			"margin": "0px 0px 0 0px",
			overflow: "auto"
		})

		.selectAll("div").data(data.cities)
	  .enter().append("div")
		.style({
			"border-bottom-style": "solid",
			"border-width": "1px",
			"cursor": "pointer"
		}).each(function (d,i){
			var sel = d3.select(this)
			if (d.name == selectedCity) {
				sel.classed("v-e-cSelected", true)
					.style("background", "black")
					.style("color", "white")
			}
		})
		.on("mouseover", function (d,i) {
			var red = true
			var sel = d3.select(this)
			sel.style("background", "gray")
				.style("color", "white")
			
			// chart1.varView.addRed(false, d)
			sel.each(function (d,i){
				var sel = d3.select(this)
				if (d.name == selectedCity) {
					sel.style("background", "black")
					// chart1.varView.removeRed()
					red = false
				}
			})
			// chart1.varView.removeLabel()
			// chart1.labelVarView.d = undefined
			// chart1.labelVarView(false, false, d.name, false, red)

			// chart1.condensedView.setRed(d.name)
		})
		.on("mouseout", function (d,i) {
			var sel = d3.select(this)
			sel.style("background", "white")
				.style("color", "black")
				.style("font-style", "normal")
			sel.each(function (d,i){
				var sel = d3.select(this)
				if (d.name == selectedCity) {
					sel.style("background", "black")
						.style("color", "white")
				}
			})
			// chart1.varView.removeRed()
			// chart1.condensedView.unsetRed()
			// chart1.labelVarView.d = undefined
			// chart1.labelVarView()
		})
		.on("click", function (d,i){
			selectedCity = d.name
			// chart1.varView.removeLabel()
			// chart1.varView.update()

			// chart1.labelVarView.clickTransition()

			d3.select(".v-e-cSelected")
				.classed("v-e-cSelected", false)
				.style("background", "white")
				.style("color", "black")

			d3.select(this).classed("v-e-cSelected", true)
				.style("background", "black")
				.style("color", "white")

			// chart1.condensedView.setBlack()
		})

	cities.append("p")
		.style({
			margin: "0px",
			padding: "3px 4px",
			"pointer-events": "none"
		})
		.html(function (d,i) {
			return d3.format("02d")(i+1)+". \t"+d.name
		})
}





