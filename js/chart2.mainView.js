chart2.mainView = function (rawSelection) {

	if (rawSelection) {chart2.mainView.rawSelection = rawSelection}
		else {rawSelection = chart2.mainView.rawSelection};

	var city = dataTransform.filterCity(selectedCity)

	var margins = [10,0,10,0]

	var sel = d3.select(rawSelection)
	var w = parseFloat(sel.style("width"))
	var h = parseFloat(sel.style("height"))
	var tempYS = d3.scale.linear().domain([40,-10])
		.range([0+margins[0], h-margins[2]])
	var humYS = d3.scale.linear().domain([100,0])
		.range([0+margins[0], h-margins[2]])
	var emcYS = d3.scale.linear().domain([30,5])
		.range([0+margins[0], h-margins[2]])
	var xS = d3.scale.ordinal()
		.rangeRoundBands([0+margins[3], w-margins[1]], 0.0, 0)
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
	

	////////////
	//FILLED
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
			opacity: function () {
				if (focusOn=="temp" || focusOn=="all") {return 1}
					else {return .1}
			}
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
			opacity: function () {
				if (focusOn == "hum" || focusOn == "all") {return 1}
					else {return .1}
			}
		})
	//EMC Block
	months.append("rect")
		.classed("v-e-emcBlock", true)
		.attr({
			"x": xS.rangeBand()/3*2,
			"y": function (d) {return emcYS(d.emc[0])},
			"fill": "gray",
			"shape-rendering": "crispEdges",
			"width": xS.rangeBand()/3,
			"height": function (d,i) {return emcYS(d.emc[1]) - emcYS(d.emc[0])},
			opacity: function () {
				if (focusOn == "emc" || focusOn == "all") {return 1}
					else {return .1}
			}
		})

	////////////
	//HOVER
	//Temp Block
	var strokeCorr = 1

	months.append("rect")
		.classed("v-e-tempHover", true)
		.attr({
			"x": xS.rangeBand()/3*0+strokeCorr,
			"y": function (d) {return tempYS(d.t[0])},
			"fill": "none",
			"stroke": "red",
			// "shape-rendering": "crispEdges",
			"width": xS.rangeBand()/3-strokeCorr*2,
			"height": function (d,i) {return tempYS(d.t[1]) - tempYS(d.t[0])},
			opacity: function () {
				if (focusOn == "temp" || focusOn == "all") {return 1}
					else {return .001}
			},
			"stroke-width": 2
		})
	//Hum Block
	months.append("rect")
		.classed("v-e-humHover", true)
		.attr({
			"x": xS.rangeBand()/3*1+strokeCorr,
			"y": function (d) {return humYS(d.h[0])},
			"fill": "none",
			"stroke": "blue",
			// "shape-rendering": "crispEdges",
			"width": xS.rangeBand()/3-strokeCorr*2,
			"height": function (d,i) {return humYS(d.h[1]) - humYS(d.h[0])},
			opacity: function () {
				if (focusOn == "hum" || focusOn == "all") {return 1}
					else {return .001}
			},
			"stroke-width": 2
		})
	//EMC Block
	months.append("rect")
		.classed("v-e-emcHover", true)
		.attr({
			"x": xS.rangeBand()/3*2+strokeCorr,
			"y": function (d) {return emcYS(d.emc[0])},
			"fill": "none",
			"stroke": "gray",
			// "shape-rendering": "crispEdges",
			"width": xS.rangeBand()/3-strokeCorr*2,
			"height": function (d,i) {return emcYS(d.emc[1]) - emcYS(d.emc[0])},
			opacity: function () {
				if (focusOn == "emc" || focusOn == "all") {return 1}
					else {return .001}
			},
			"stroke-width": 2
		})


	//Month label
	months.append("text")
		.attr({
			x: xS.rangeBand()/2,
			y: h-6,
			"text-anchor": "middle",
			"pointer-events": "none",
			fill: "gray"
		})
		.text(function (d) {return d.month})

	/////////////////////////////////////////
	chart2.mainView.cityHover = function (selCityString) {

		var cityHover = dataTransform.filterCity(selCityString)
		months.data(cityHover.months)
		////////////
		//HOVER
		months.select(".v-e-tempHover")
			.attr({
				"y": function (d) {return tempYS(d.t[0])},
				"stroke": "red",
				"height": function (d,i) {return tempYS(d.t[1]) - tempYS(d.t[0])},
				opacity: function () {
				if (focusOn == "temp" || focusOn == "all") {return 1}
					else {return .001}
			}
			}).transition()
		months.select(".v-e-humHover")
			.attr({
				"y": function (d) {return humYS(d.h[0])},
				"stroke": "blue",
				"height": function (d,i) {return humYS(d.h[1]) - humYS(d.h[0])},
				opacity: function () {
				if (focusOn == "hum" || focusOn == "all") {return 1}
					else {return .001}
			}
			}).transition()
		months.select(".v-e-emcHover")
			.attr({
				"y": function (d) {return emcYS(d.emc[0])},
				"stroke": "gray",
				"height": function (d,i) {return emcYS(d.emc[1]) - emcYS(d.emc[0])},
				opacity: function () {
				if (focusOn == "emc" || focusOn == "all") {return 1}
					else {return .001}
			}
			}).transition()

		////////////
		//BLOCK
		months.select(".v-e-tempBlock")
			.attr({
				opacity: function () {
				if (focusOn == "temp" || focusOn == "all") {return .5}
					else {return .1}
			}
			}).transition()
		months.select(".v-e-humBlock")
			.attr({
				opacity: function () {
				if (focusOn == "hum" || focusOn == "all") {return .5}
					else {return .1}
			}
			}).transition()
		months.select(".v-e-emcBlock")
			.attr({
				opacity: function () {
				if (focusOn == "emc" || focusOn == "all") {return .5}
					else {return .1}
			}
			}).transition()

	}
	chart2.mainView.cityRemoveHover = function () {

		city = dataTransform.filterCity(selectedCity)
		months.data(city.months)
		////////////
		//HOVER
		months.select(".v-e-tempHover")
			.transition()
			.attr({
				"y": function (d) {return tempYS(d.t[0])},
				"stroke": "red",
				"height": function (d,i) {return tempYS(d.t[1]) - tempYS(d.t[0])},
				opacity: function () {
					if (focusOn == "temp" || focusOn == "all") {return 1}
						else {return .001}
				}
			})
		months.select(".v-e-humHover")
			.transition()
			.attr({
				"y": function (d) {return humYS(d.h[0])},
				"stroke": "blue",
				"height": function (d,i) {return humYS(d.h[1]) - humYS(d.h[0])},
				opacity: function () {
					if (focusOn == "hum" || focusOn == "all") {return 1}
						else {return .001}
				}
			})
		months.select(".v-e-emcHover")
			.transition()
			.attr({
				"y": function (d) {return emcYS(d.emc[0])},
				"stroke": "gray",
				"height": function (d,i) {return emcYS(d.emc[1]) - emcYS(d.emc[0])},
				opacity: function () {
					if (focusOn == "emc" || focusOn == "all") {return 1}
						else {return .001}
				}
			})

		////////////
		//BLOCK
		months.select(".v-e-tempBlock")
			.transition()
			.attr({
				"y": function (d) {return tempYS(d.t[0])},
				"height": function (d,i) {return tempYS(d.t[1]) - tempYS(d.t[0])}
			})
			.transition().delay(300)
			.attr({opacity: function () {
					if (focusOn == "temp" || focusOn == "all") {return 1}
						else {return .1}
				}})
		months.select(".v-e-humBlock")
			.transition()
			.attr({
				"y": function (d) {return humYS(d.h[0])},
				"height": function (d,i) {return humYS(d.h[1]) - humYS(d.h[0])}
			})
			.transition().delay(300)
			.attr({opacity: function () {
					if (focusOn == "hum" || focusOn == "all") {return 1}
						else {return .1}
				}})
		months.select(".v-e-emcBlock")
			.transition()
			.attr({
				"y": function (d) {return emcYS(d.emc[0])},
				"height": function (d,i) {return emcYS(d.emc[1]) - emcYS(d.emc[0])}
			})
			.transition().delay(300)
			.attr({opacity: function () {
					if (focusOn == "emc" || focusOn == "all") {return 1}
						else {return .1}
				}})



	}
	chart2.mainView.focusHover = function (focusOn2) {

		////////////
		//HOVER
		months.select(".v-e-tempHover")
			.attr({
				"y": function (d) {return tempYS(d.t[0])},
				"stroke": "red",
				"height": function (d,i) {return tempYS(d.t[1]) - tempYS(d.t[0])},
				opacity: function () {
					if (focusOn2 == "temp" || focusOn2 == "all") {return 1}
						else {return .001}
				}
			}).transition()
		months.select(".v-e-humHover")
			.attr({
				"y": function (d) {return humYS(d.h[0])},
				"stroke": "blue",
				"height": function (d,i) {return humYS(d.h[1]) - humYS(d.h[0])},
				opacity: function () {
					if (focusOn2 == "hum" || focusOn2 == "all") {return 1}
						else {return .001}
				}
			}).transition()
		months.select(".v-e-emcHover")
			.attr({
				"y": function (d) {return emcYS(d.emc[0])},
				"stroke": "gray",
				"height": function (d,i) {return emcYS(d.emc[1]) - emcYS(d.emc[0])},
				opacity: function () {
					if (focusOn2 == "emc" || focusOn2 == "all") {return 1}
						else {return .001}
				}
			}).transition()

		////////////
		//BLOCK
		months.select(".v-e-tempBlock")
			.attr({
				"y": function (d) {return tempYS(d.t[0])},
				"height": function (d,i) {return tempYS(d.t[1]) - tempYS(d.t[0])}
			})
			.attr({opacity: function () {
					if (focusOn2 == "temp" || focusOn2 == "all") {return 1}
						else {return .1}
				}}).transition()
		months.select(".v-e-humBlock")
			.attr({
				"y": function (d) {return humYS(d.h[0])},
				"height": function (d,i) {return humYS(d.h[1]) - humYS(d.h[0])}
			})
			.attr({opacity: function () {
					if (focusOn2 == "hum" || focusOn2 == "all") {return 1}
						else {return .1}
				}}).transition()
		months.select(".v-e-emcBlock")
			.attr({
				"y": function (d) {return emcYS(d.emc[0])},
				"height": function (d,i) {return emcYS(d.emc[1]) - emcYS(d.emc[0])}
			})
			.attr({opacity: function () {
					if (focusOn2 == "emc" || focusOn2 == "all") {return 1}
						else {return .1}
				}}).transition()
	}

	chart2.mainView.focusOut = function () {

		////////////
		//HOVER
		months.select(".v-e-tempHover")
			.transition()
			.attr({
				"y": function (d) {return tempYS(d.t[0])},
				"stroke": "red",
				"height": function (d,i) {return tempYS(d.t[1]) - tempYS(d.t[0])},
				opacity: function () {
					if (focusOn == "temp" || focusOn == "all") {return 1}
						else {return .001}
				}
			})
		months.select(".v-e-humHover")
			.transition()
			.attr({
				"y": function (d) {return humYS(d.h[0])},
				"stroke": "blue",
				"height": function (d,i) {return humYS(d.h[1]) - humYS(d.h[0])},
				opacity: function () {
					if (focusOn == "hum" || focusOn == "all") {return 1}
						else {return .001}
				}
			})
		months.select(".v-e-emcHover")
			.transition()
			.attr({
				"y": function (d) {return emcYS(d.emc[0])},
				"stroke": "gray",
				"height": function (d,i) {return emcYS(d.emc[1]) - emcYS(d.emc[0])},
				opacity: function () {
					if (focusOn == "emc" || focusOn == "all") {return 1}
						else {return .001}
				}
			})

		////////////
		//BLOCK
		months.select(".v-e-tempBlock")
			.transition()
			.attr({
				"y": function (d) {return tempYS(d.t[0])},
				"height": function (d,i) {return tempYS(d.t[1]) - tempYS(d.t[0])}
			})
			.attr({opacity: function () {
					if (focusOn == "temp" || focusOn == "all") {return 1}
						else {return .1}
				}})
		months.select(".v-e-humBlock")
			.transition()
			.attr({
				"y": function (d) {return humYS(d.h[0])},
				"height": function (d,i) {return humYS(d.h[1]) - humYS(d.h[0])}
			})
			.attr({opacity: function () {
					if (focusOn == "hum" || focusOn == "all") {return 1}
						else {return .1}
				}})
		months.select(".v-e-emcBlock")
			.transition()
			.attr({
				"y": function (d) {return emcYS(d.emc[0])},
				"height": function (d,i) {return emcYS(d.emc[1]) - emcYS(d.emc[0])}
			})
			.attr({opacity: function () {
					if (focusOn == "emc" || focusOn == "all") {return 1}
						else {return .1}
				}})
	}
}










