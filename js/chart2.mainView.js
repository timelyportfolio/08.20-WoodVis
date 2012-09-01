chart2.mainView = function (rawSelection) {

	if (rawSelection) {chart2.mainView.rawSelection = rawSelection}
		else {rawSelection = chart2.mainView.rawSelection};

	var city = dataTransform.filterCity(selectedCity)

	var margins = [10,10,10,0]

	var sel = d3.select(rawSelection)
	var w = parseFloat(sel.style("width"))
	var h = parseFloat(sel.style("height"))
	var tempYS = d3.scale.linear().domain(tempAmpl)
		.range([0+margins[0], h-margins[2]])
	var humYS = d3.scale.linear().domain(humAmpl)
		.range([0+margins[0], h-margins[2]])
	var emcYS = d3.scale.linear().domain(emcAmpl)
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
	if (focusOn == "temp") {
		months.append("text")
			.attr({
				"class": "detailText",
				"x": xS.rangeBand()/3*0+xS.rangeBand()/6,
				"y": function (d) {return tempYS(d.t[0])},
				"fill": "red",
				"text-anchor": "middle", dy:"-.7em",
				"font-size": 11
			})
			.text(function (d) {return d3.round(d.t[0], 1)+"º"})
		months.append("text")
			.attr({
				"class": "detailText",
				"x": xS.rangeBand()/3*0+xS.rangeBand()/6,
				"y": function (d) {return tempYS(d.t[1])},
				"fill": "red",
				"text-anchor": "middle", dy:"1.35em",
				"font-size": 11
			})
			.text(function (d) {return d3.round(d.t[1], 1)+"º"})
	}
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
	if (focusOn == "hum") {
		months.append("text")
			.attr({
				"class": "detailText",
				"x": xS.rangeBand()/3*1+xS.rangeBand()/6,
				"y": function (d) {return humYS(d.h[0])},
				"fill": "blue",
				"text-anchor": "middle", dy:"-.7em",
				"font-size": 11
			})
			.text(function (d) {return d3.round(d.h[0], 1)+"%"})
		months.append("text")
			.attr({
				"class": "detailText",
				"x": xS.rangeBand()/3*1+xS.rangeBand()/6,
				"y": function (d) {return humYS(d.h[1])},
				"fill": "blue",
				"text-anchor": "middle", dy:"1.35em",
				"font-size": 11
			})
			.text(function (d) {return d3.round(d.h[1], 1)+"%"})
	}
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
	if (focusOn == "emc") {
		months.append("text")
			.attr({
				"class": "detailText",
				"x": xS.rangeBand()/3*2+xS.rangeBand()/6,
				"y": function (d) {return emcYS(d.emc[0])},
				"fill": "gray",
				"text-anchor": "middle", dy:"-.7em",
				"font-size": 11
			})
			.text(function (d) {return d3.round(d.emc[0], 1)+"%"})
		months.append("text")
			.attr({
				"class": "detailText",
				"x": xS.rangeBand()/3*2+xS.rangeBand()/6,
				"y": function (d) {return emcYS(d.emc[1])},
				"fill": "gray",
				"text-anchor": "middle", dy:"1.35em",
				"font-size": 11
			})
			.text(function (d) {return d3.round(d.emc[1], 1)+"%"})
	}
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
			fill: "black", "font-weight": "bold"
		})
		.text(function (d) {return d.month})

	/////////////////////////////////////////
	chart2.mainView.cityHover = function (selCityString) {

		var cityHover = dataTransform.filterCity(selCityString)
		months.data(cityHover.months)

		months.selectAll(".detailText").remove()

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

		//TEXT
		if (focusOn == "emc") {
			months.append("text")
				.attr({
					"class": "detailText",
					"x": xS.rangeBand()/3*2+xS.rangeBand()/6,
					"y": function (d) {return emcYS(d.emc[0])},
					"fill": "gray",
					"text-anchor": "middle", dy:"-.7em",
					"font-size": 11, opacity: 0.01
				})
				.text(function (d) {return d3.round(d.emc[0], 1)+"%"})
				.transition().delay(250)
				.attr("opacity", 1)
			months.append("text")
				.attr({
					"class": "detailText",
					"x": xS.rangeBand()/3*2+xS.rangeBand()/6,
					"y": function (d) {return emcYS(d.emc[1])},
					"fill": "gray",
					"text-anchor": "middle", dy:"1.35em",
					"font-size": 11, opacity: 0.01
				})
				.text(function (d) {return d3.round(d.emc[1], 1)+"%"})
				.transition().delay(250)
				.attr("opacity", 1)
		}
		if (focusOn == "temp") {
			months.append("text")
				.attr({
					"class": "detailText",
					"x": xS.rangeBand()/3*0+xS.rangeBand()/6,
					"y": function (d) {return tempYS(d.t[0])},
					"fill": "red",
					"text-anchor": "middle", dy:"-.7em",
					"font-size": 11, opacity: 0.01
				})
				.text(function (d) {return d3.round(d.t[0], 1)+"º"})
				.transition().delay(250)
				.attr("opacity", 1)
			months.append("text")
				.attr({
					"class": "detailText",
					"x": xS.rangeBand()/3*0+xS.rangeBand()/6,
					"y": function (d) {return tempYS(d.t[1])},
					"fill": "red",
					"text-anchor": "middle", dy:"1.35em",
					"font-size": 11, opacity: 0.01
				})
				.text(function (d) {return d3.round(d.t[1], 1)+"º"})
				.transition().delay(250)
				.attr("opacity", 1)
		}
		if (focusOn == "hum") {
			months.append("text")
				.attr({
					"class": "detailText",
					"x": xS.rangeBand()/3*1+xS.rangeBand()/6,
					"y": function (d) {return humYS(d.h[0])},
					"fill": "blue",
					"text-anchor": "middle", dy:"-.7em",
					"font-size": 11, opacity: 0.01
				})
				.text(function (d) {return d3.round(d.h[0], 1)+"%"})
				.transition().delay(250)
				.attr("opacity", 1)
			months.append("text")
				.attr({
					"class": "detailText",
					"x": xS.rangeBand()/3*1+xS.rangeBand()/6,
					"y": function (d) {return humYS(d.h[1])},
					"fill": "blue",
					"text-anchor": "middle", dy:"1.35em",
					"font-size": 11, opacity: 0.01
				})
				.text(function (d) {return d3.round(d.h[1], 1)+"%"})
				.transition().delay(250)
				.attr("opacity", 1)
		}

	}
	chart2.mainView.focusHover = function (focusOn2) {

		months.selectAll(".detailText").remove()

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

		//TEXT
		if (focusOn2 == "emc") {
			months.append("text")
				.attr({
					"class": "detailText",
					"x": xS.rangeBand()/3*2+xS.rangeBand()/6,
					"y": function (d) {return emcYS(d.emc[0])},
					"fill": "gray",
					"text-anchor": "middle", dy:"-.7em",
					"font-size": 11, opacity: 0.01
				})
				.text(function (d) {return d3.round(d.emc[0], 1)+"%"})
				.attr("opacity", 1)
				.transition()
			months.append("text")
				.attr({
					"class": "detailText",
					"x": xS.rangeBand()/3*2+xS.rangeBand()/6,
					"y": function (d) {return emcYS(d.emc[1])},
					"fill": "gray",
					"text-anchor": "middle", dy:"1.35em",
					"font-size": 11, opacity: 0.01
				})
				.text(function (d) {return d3.round(d.emc[1], 1)+"%"})
				.attr("opacity", 1)
				.transition()
		}
		if (focusOn2 == "temp") {
			months.append("text")
				.attr({
					"class": "detailText",
					"x": xS.rangeBand()/3*0+xS.rangeBand()/6,
					"y": function (d) {return tempYS(d.t[0])},
					"fill": "red",
					"text-anchor": "middle", dy:"-.7em",
					"font-size": 11, opacity: 0.01
				})
				.text(function (d) {return d3.round(d.t[0], 1)+"º"})
				.attr("opacity", 1)
				.transition()
			months.append("text")
				.attr({
					"class": "detailText",
					"x": xS.rangeBand()/3*0+xS.rangeBand()/6,
					"y": function (d) {return tempYS(d.t[1])},
					"fill": "red",
					"text-anchor": "middle", dy:"1.35em",
					"font-size": 11, opacity: 0.01
				})
				.text(function (d) {return d3.round(d.t[1], 1)+"º"})
				.attr("opacity", 1)
				.transition()
		}
		if (focusOn2 == "hum") {
			months.append("text")
				.attr({
					"class": "detailText",
					"x": xS.rangeBand()/3*1+xS.rangeBand()/6,
					"y": function (d) {return humYS(d.h[0])},
					"fill": "blue",
					"text-anchor": "middle", dy:"-.7em",
					"font-size": 11, opacity: 0.01
				})
				.text(function (d) {return d3.round(d.h[0], 1)+"%"})
				.attr("opacity", 1)
				.transition()
			months.append("text")
				.attr({
					"class": "detailText",
					"x": xS.rangeBand()/3*1+xS.rangeBand()/6,
					"y": function (d) {return humYS(d.h[1])},
					"fill": "blue",
					"text-anchor": "middle", dy:"1.35em",
					"font-size": 11, opacity: 0.01
				})
				.text(function (d) {return d3.round(d.h[1], 1)+"%"})
				.attr("opacity", 1)
				.transition()
		}

	}

	chart2.mainView.focusOut = function () {

		months.selectAll(".detailText").remove()

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

		//TEXT
		if (focusOn == "emc") {
			months.append("text")
				.attr({
					"class": "detailText",
					"x": xS.rangeBand()/3*2+xS.rangeBand()/6,
					"y": function (d) {return emcYS(d.emc[0])},
					"fill": "gray",
					"text-anchor": "middle", dy:"-.7em",
					"font-size": 11, 
					opacity: function () {
						if (focusOn == "emc") {return 1} 
							else{return 0.01};
					}
				})
				.text(function (d) {return d3.round(d.emc[0], 1)+"%"})
				.transition().delay(0)
				.attr("opacity", 1)
			months.append("text")
				.attr({
					"class": "detailText",
					"x": xS.rangeBand()/3*2+xS.rangeBand()/6,
					"y": function (d) {return emcYS(d.emc[1])},
					"fill": "gray",
					"text-anchor": "middle", dy:"1.35em",
					"font-size": 11, 
					opacity: function () {
						if (focusOn == "emc") {return 1} 
							else{return 0.01};
					}
				})
				.text(function (d) {return d3.round(d.emc[1], 1)+"%"})
				.transition().delay(0)
				.attr("opacity", 1)
		}
		if (focusOn == "temp") {
			months.append("text")
				.attr({
					"class": "detailText",
					"x": xS.rangeBand()/3*0+xS.rangeBand()/6,
					"y": function (d) {return tempYS(d.t[0])},
					"fill": "red",
					"text-anchor": "middle", dy:"-.7em",
					"font-size": 11, 
					opacity: function () {
						if (focusOn == "temp") {return 1} 
							else{return 0.01};
					}
				})
				.text(function (d) {return d3.round(d.t[0], 1)+"º"})
				.transition().delay(0)
				.attr("opacity", 1)
			months.append("text")
				.attr({
					"class": "detailText",
					"x": xS.rangeBand()/3*0+xS.rangeBand()/6,
					"y": function (d) {return tempYS(d.t[1])},
					"fill": "red",
					"text-anchor": "middle", dy:"1.35em",
					"font-size": 11, 
					opacity: function () {
						if (focusOn == "temp") {return 1} 
							else{return 0.01};
					}
				})
				.text(function (d) {return d3.round(d.t[1], 1)+"º"})
				.transition().delay(0)
				.attr("opacity", 1)
		}
		if (focusOn == "hum") {
			months.append("text")
				.attr({
					"class": "detailText",
					"x": xS.rangeBand()/3*1+xS.rangeBand()/6,
					"y": function (d) {return humYS(d.h[0])},
					"fill": "blue",
					"text-anchor": "middle", dy:"-.7em",
					"font-size": 11, 
					opacity: function () {
						if (focusOn == "hum") {return 1} 
							else{return 0.01};
					}
				})
				.text(function (d) {return d3.round(d.h[0], 1)+"%"})
				.transition().delay(0)
				.attr("opacity", 1)
			months.append("text")
				.attr({
					"class": "detailText",
					"x": xS.rangeBand()/3*1+xS.rangeBand()/6,
					"y": function (d) {return humYS(d.h[1])},
					"fill": "blue",
					"text-anchor": "middle", dy:"1.35em",
					"font-size": 11, 
					opacity: function () {
						if (focusOn == "hum") {return 1} 
							else{return 0.01};
					}
				})
				.text(function (d) {return d3.round(d.h[1], 1)+"%"})
				.transition().delay(0)
				.attr("opacity", 1)
		}
	}
}










