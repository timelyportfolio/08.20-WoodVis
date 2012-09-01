chart2.labelMainView = function (rawSelection) {

	if (rawSelection) {chart2.labelMainView.rawSelection = rawSelection}
		else {rawSelection = chart2.labelMainView.rawSelection};

	var city = dataTransform.filterCity(selectedCity)

	var margins = [10,0,10,0] // [0] and [2] need to be equal to main view
	var tickSize = 4
	var lDist = 6
	var fSize = 12

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
		.rangeRoundBands([0+margins[3], w-margins[1]], 0.0, 0.1)
		.domain(d3.range(3))

	sel.selectAll("svg").data([1])
		.enter().append("svg")
		.attr("width", w)
		.attr("height", h)
	sel = sel.select("svg")
	// sel.selectAll("path").remove()
	// sel.selectAll("text").remove()

	var aData = [
		{limits1: city.t1Label, limits2: city.t2Label, color: "red", scale:tempYS, format:"º"},
		{limits1: city.h1Label, limits2: city.h2Label, color: "blue", scale:humYS, format:"%"},
		{limits1: city.emc1Label, limits2: city.emc2Label, color: "gray", scale:emcYS, format:"%"}
	]

	var groups = sel.selectAll("g").data(aData)
		.enter().append("g")
		.attr("transform", function (d,i) {
			return "translate("+ (xS(i)) +",0)"
		})
		.each(function (d,i){
			//d3.select(this).call(d.axis)
		})
	groups = sel.selectAll("g")

	//Selected
	groups.append("path")
		.attr({
			d: function(d){
				return "M"+(xS.rangeBand()/2-2)+" "+d.scale(d.limits1[0])+" "+
				"L"+(xS.rangeBand()/2-2)+" "+d.scale(d.limits1[1])+" "
			},
			stroke: function(d){return d.color},
			"stroke-width": 2, "shape-rendering": "crispEdges",
			fill: "none", opacity:0,
			"class":function(d,i){return "oldPath1"} 
		})

	groups.append("path")
		.attr({
			d: function(d){
				return "M"+(xS.rangeBand()/2+2)+" "+d.scale(d.limits2[0])+" "+
				"L"+(xS.rangeBand()/2+2)+" "+d.scale(d.limits2[1])+" "
			},
			stroke: function(d){return d.color},
			"stroke-width": 2, "shape-rendering": "crispEdges",
			fill: "none", opacity:0,
			"class":function(d,i){return "oldPath2"} 
		}).transition()
	
	//Limit1
	d3.range(2).forEach(function(e,i){
		groups.append("text")
			.attr({
				x:xS.rangeBand()/2-tickSize-lDist, y:function(d){
					return d.scale(d.limits1[i])
				},
				fill:function(d){return d.color},
				"font-size": fSize, "font-weight": "bold",
				"text-anchor": "end", "dy": ".35em",
				"class":function(d){return "txtLimit1"+i} 
			})
			.text(function(d){
				return Math.round(d.limits1[i]) + d.format
			})
	})
	// groups.append("text")
	// 	.attr({
	// 		x:xS.rangeBand()/2-tickSize-lDist, y:function(d){
	// 			return (d.scale(d.limits1[1])+d.scale(d.limits1[0]))/2
	// 		},
	// 		fill:function(d){return d.color},
	// 		"font-size": fSize,
	// 		"text-anchor": "end", "dy": ".35em",
	// 		"class":function(d,i){return "txtMax"} 
	// 		})
	// 	.text("max")
	groups.append("path")
		.attr({
			d: function(d){
				return "M"+(xS.rangeBand()/2-tickSize-2)+" "+d.scale(d.limits1[0])+" "+
				"L"+(xS.rangeBand()/2-2)+" "+d.scale(d.limits1[0])+" "+
				"L"+(xS.rangeBand()/2-2)+" "+d.scale(d.limits1[1])+" "+
				"L"+(xS.rangeBand()/2-tickSize-2)+" "+d.scale(d.limits1[1])+" "
			},
			stroke: function(d){return d.color},
			"stroke-width": 1, "shape-rendering": "crispEdges",
			fill: "none",
			"class":function(d,i){return "txtLimit1Path"} 
		})
	//Limit2
	d3.range(2).forEach(function(e,i){
		groups.append("text")
			.attr({
				x:xS.rangeBand()/2+tickSize+lDist+1, y:function(d){
					return d.scale(d.limits2[i])
				},
				fill:function(d){return d.color},
				"font-size": fSize, "font-weight": "bold",
				"text-anchor": "start", "dy": ".35em",
				"class":function(d){return "txtLimit2"+i} 
			})
			.text(function(d){
				return Math.round(d.limits2[i]) + d.format
			})
	})
	// groups.append("text")
	// 	.attr({
	// 		x:xS.rangeBand()/2+tickSize+lDist, y:function(d){
	// 			return (d.scale(d.limits2[1])+d.scale(d.limits2[0]))/2
	// 		},
	// 		fill:function(d){return d.color},
	// 		"font-size": fSize,
	// 		"text-anchor": "start", "dy": ".35em",
	// 		"class":function(d,i){return "txtMin"} 
	// 		})
	// 		.text("min")
	groups.append("path")
		.attr({
			d: function(d){
				return "M"+(xS.rangeBand()/2+tickSize+2)+" "+d.scale(d.limits2[0])+" "+
				"L"+(xS.rangeBand()/2+2)+" "+d.scale(d.limits2[0])+" "+
				"L"+(xS.rangeBand()/2+2)+" "+d.scale(d.limits2[1])+" "+
				"L"+(xS.rangeBand()/2+tickSize+2)+" "+d.scale(d.limits2[1])+" "
			},
			stroke: function(d){return d.color},
			"stroke-width": 1, "shape-rendering": "crispEdges",
			fill: "none",
			"class":function(d,i){return "txtLimit2Path"} 
		})

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
chart2.labelMainView.cityHover = function (selCityString) {

	rawSelection = chart2.labelMainView.rawSelection;

	var cityHover = dataTransform.filterCity(selCityString)

	var lDist2 = lDist + 4
	var hDist = 8

	// sel.selectAll("path").remove()
	// sel.selectAll("text").remove()

	var aDataHover = [
		{limits1: cityHover.t1Label, limits2: cityHover.t2Label, color: "red", scale:tempYS, format:"º"},
		{limits1: cityHover.h1Label, limits2: cityHover.h2Label, color: "blue", scale:humYS, format:"%"},
		{limits1: cityHover.emc1Label, limits2: cityHover.emc2Label, color: "gray", scale:emcYS, format:"%"}
	]

	//Selected
	groups.select(".oldPath1")
		.attr({
			d: function(d){
				return "M"+(xS.rangeBand()/2-2)+" "+d.scale(d.limits1[0])+" "+
				"L"+(xS.rangeBand()/2-2)+" "+d.scale(d.limits1[1])+" "
			},
			stroke: function(d){return d.color},
			"stroke-width": 2, "shape-rendering": "crispEdges",
			fill: "none", opacity:1,
			"class":function(d,i){return "oldPath1"} 
		}).transition()

	groups.select(".oldPath2")
		.attr({
			d: function(d){
				return "M"+(xS.rangeBand()/2+2)+" "+d.scale(d.limits2[0])+" "+
				"L"+(xS.rangeBand()/2+2)+" "+d.scale(d.limits2[1])+" "
			},
			stroke: function(d){return d.color},
			"stroke-width": 2, "shape-rendering": "crispEdges",
			fill: "none", opacity:1,
			"class":function(d,i){return "oldPath2"} 
		}).transition()

	//Hover
	groups.data(aDataHover)

	//Limit1
	d3.range(2).forEach(function(e,i){
		groups.each(function(d){
			d3.select(this).select(".txtLimit1"+i)
			.attr({
				x:xS.rangeBand()/2-tickSize-lDist2, y:function(d){
					return d.scale(d.limits1[i])
				}
			})
			.text(function(d){
				return Math.round(d.limits1[i]) + d.format
			}).transition()
		})
	})
	// groups.select(".txtMax")
	// 	.attr({
	// 		x:xS.rangeBand()/2-tickSize-lDist2, y:function(d){
	// 			return (d.scale(d.limits1[1])+d.scale(d.limits1[0]))/2
	// 		}
	// 	}).transition()
	groups.select(".txtLimit1Path")
		.attr({
			d: function(d){
				return "M"+(xS.rangeBand()/2-tickSize-hDist)+" "+d.scale(d.limits1[0])+" "+
				"L"+(xS.rangeBand()/2-hDist)+" "+d.scale(d.limits1[0])+" "+
				"L"+(xS.rangeBand()/2-hDist)+" "+d.scale(d.limits1[1])+" "+
				"L"+(xS.rangeBand()/2-tickSize-hDist)+" "+d.scale(d.limits1[1])+" "
			}
		}).transition()
	//Limit2
	d3.range(2).forEach(function(e,i){
		groups.each(function(d){
			d3.select(this).select(".txtLimit2"+i)
				.attr({
					x:xS.rangeBand()/2+tickSize+lDist2+1, y:function(d){
						return d.scale(d.limits2[i])
					}
				})
				.text(function(d){
					return Math.round(d.limits2[i]) + d.format
				}).transition()
			})
	})
	// groups.select(".txtMin")
	// 	.attr({
	// 		x:xS.rangeBand()/2+tickSize+lDist2, y:function(d){
	// 			return (d.scale(d.limits2[1])+d.scale(d.limits2[0]))/2
	// 		}
	// 	}).transition()
	groups.select(".txtLimit2Path")
		.attr({
			d: function(d){
				return "M"+(xS.rangeBand()/2+tickSize+hDist)+" "+d.scale(d.limits2[0])+" "+
				"L"+(xS.rangeBand()/2+hDist)+" "+d.scale(d.limits2[0])+" "+
				"L"+(xS.rangeBand()/2+hDist)+" "+d.scale(d.limits2[1])+" "+
				"L"+(xS.rangeBand()/2+tickSize+hDist)+" "+d.scale(d.limits2[1])+" "
			}
		}).transition()

}
chart2.labelMainView.removeCityHover = function () {

	city = dataTransform.filterCity(selectedCity)
	aData = [
		{limits1: city.t1Label, limits2: city.t2Label, color: "red", scale:tempYS, format:"º"},
		{limits1: city.h1Label, limits2: city.h2Label, color: "blue", scale:humYS, format:"%"},
		{limits1: city.emc1Label, limits2: city.emc2Label, color: "gray", scale:emcYS, format:"%"}
	]
	groups.data(aData)

	groups.select(".oldPath1")
		.transition()
		.attr({
			stroke: "white"
		})
	groups.select(".oldPath2")
		.transition()
		.attr({
			stroke: "white"
		})

	//Limit1
	d3.range(2).forEach(function(e,i){
		groups.each(function(d){
			d3.select(this).select(".txtLimit1"+i)
			.transition()
			.attr({
				x:xS.rangeBand()/2-tickSize-lDist, y:function(d){
					return d.scale(d.limits1[i])
				}
			})
			.text(function(d){
				return Math.round(d.limits1[i]) + d.format
			})
		})
	})
	// groups.select(".txtMax")
	// 	.transition()
	// 	.attr({
	// 		x:xS.rangeBand()/2-tickSize-lDist, y:function(d){
	// 			return (d.scale(d.limits1[1])+d.scale(d.limits1[0]))/2
	// 		}
	// 	})
	groups.select(".txtLimit1Path")
		.transition().attr({
			d: function(d){
				return "M"+(xS.rangeBand()/2-tickSize-2)+" "+d.scale(d.limits1[0])+" "+
				"L"+(xS.rangeBand()/2-2)+" "+d.scale(d.limits1[0])+" "+
				"L"+(xS.rangeBand()/2-2)+" "+d.scale(d.limits1[1])+" "+
				"L"+(xS.rangeBand()/2-tickSize-2)+" "+d.scale(d.limits1[1])+" "
			}
		})
	//Limit2
	d3.range(2).forEach(function(e,i){
		groups.each(function(d){
			d3.select(this).select(".txtLimit2"+i)
				.transition()
				.attr({
					x:xS.rangeBand()/2+tickSize+lDist+1, y:function(d){
						return d.scale(d.limits2[i])
					}
				})
				.text(function(d){
					return Math.round(d.limits2[i]) + d.format
				})
			})
	})
	// groups.select(".txtMin")
	// 	.transition()
	// 	.attr({
	// 		x:xS.rangeBand()/2+tickSize+lDist, y:function(d){
	// 			return (d.scale(d.limits2[1])+d.scale(d.limits2[0]))/2
	// 		}
	// 	})
	groups.select(".txtLimit2Path")
		.transition()
		.attr({
			d: function(d){
				return "M"+(xS.rangeBand()/2+tickSize+2)+" "+d.scale(d.limits2[0])+" "+
				"L"+(xS.rangeBand()/2+2)+" "+d.scale(d.limits2[0])+" "+
				"L"+(xS.rangeBand()/2+2)+" "+d.scale(d.limits2[1])+" "+
				"L"+(xS.rangeBand()/2+tickSize+2)+" "+d.scale(d.limits2[1])+" "
			}
		})
}

}












