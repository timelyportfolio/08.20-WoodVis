chart3.labelMainView = function (rawSelection) {

	if (rawSelection) {chart3.labelMainView.rawSelection = rawSelection}
		else {rawSelection = chart3.labelMainView.rawSelection};

	var city = dataTransform.filterCity(selectedCity)

	var tickSize = 4
	var lDist = 6
	var fSize = 10
	var minDist = 10

	var sel = d3.select(rawSelection)
	var w = parseFloat(sel.style("width"))
	var h = parseFloat(sel.style("height"))

	var sel = d3.select(rawSelection)
	var w = parseFloat(sel.style("width"))
	var h = parseFloat(sel.style("height"))
	var yS = d3.scale.linear().domain(chart3Amplitude).range([0,h])
	sel = sel.append("svg")
		.attr("width", w)
		.attr("height", h)


	//Top green wood
	sel.append("text")
		.text("Green Wood")
		.attr({
			x: w/2, y: yS(100), 
			"text-anchor": "middle", dy: "-.3em",
			fill: "green", "font-weight": "bold",
			"font-size": 12,
			"class": "green"
		})

	sel.append("text")
		.text("100%")
		.attr({
			x: w/2, y: yS(100), 
			"text-anchor": "middle", dy: "+1em",
			fill: "green", "font-weight": "bold",
			"font-size": 12,
			"class": "green"
		})

	//Limit1
	//".higher"
	sel.append("text")
		.attr({
			x:w/2-tickSize-lDist-2, 
			y: (yS(city.absLabel1[1])+yS(city.absLabel1[0]))/2,
			fill:function(){
				var compare = yS(city.absLabel1[1])-yS(city.absLabel1[0])
				if (compare>30) {return "gray"} 
					else{return "white"};
			},
			"font-size": fSize, "font-weight": "bold",
			"text-anchor": "end", "dy": ".35em",
			"font-size": fSize,
			"class": "higher"
		})
		.text("higher")
	//".l1-text1"
	sel.append("text")
		.attr({
			x:w/2-tickSize-lDist, 
			y: function(){
				var aDist = yS(city.absLabel1[1])-yS(city.absLabel1[0])
				var offset = (minDist - aDist)/2
				if (aDist<minDist) {
					return yS(city.absLabel1[0])-offset
				} else {
					return yS(city.absLabel1[0])
				}
			},
			fill:"gray",
			"font-size": fSize, "font-weight": "bold",
			"text-anchor": "end", "dy": ".35em",
			"font-size": fSize,
			"class": "l1-text1"
		})
		.text(function(d){
			return d3.round(city.absLabel1[0], 1) + "%"
		})
	//".l1-text2"
	sel.append("text")
		.attr({
			x:w/2-tickSize-lDist, 
			y: function(){
				var aDist = yS(city.absLabel1[1])-yS(city.absLabel1[0])
				var offset = (minDist - aDist)/2
				if (aDist<minDist) {
					return yS(city.absLabel1[1])+offset
				} else {
					return yS(city.absLabel1[1])
				}
			},
			fill:"gray",
			"font-size": fSize, "font-weight": "bold",
			"text-anchor": "end", "dy": ".35em",
			"font-size": fSize,
			"class": "l1-text2"
		})
		.text(function(d){
			return d3.round(city.absLabel1[1], 1) + "%"
		})
	//".l1-line"
	sel.append("path")
		.attr({
			d: function(d){
				return "M"+(w/2-2)+" "+yS(city.absLabel1[0])+" "+
				"L"+(w/2-2)+" "+yS(city.absLabel1[1])+" "
			},
			stroke: "gray",
			"stroke-width": 2, "shape-rendering": "crispEdges",
			fill: "none",
			"class":"l1-line"
		})
	//".l1-path"
	sel.append("path")
		.attr({
			d: function(d){
				return "M"+(w/2-tickSize-2)+" "+yS(city.absLabel1[0])+" "+
				"L"+(w/2-2)+" "+yS(city.absLabel1[0])+" "+
				"L"+(w/2-2)+" "+yS(city.absLabel1[1])+" "+
				"L"+(w/2-tickSize-2)+" "+yS(city.absLabel1[1])+" "
			},
			stroke: "gray",
			"stroke-width": 1, "shape-rendering": "crispEdges",
			fill: "none",
			"class":"l1-path"
		})

	//Limit2
	//".lower"
	sel.append("text")
		.attr({
			x:w/2+tickSize+lDist+1, 
			y: (yS(city.absLabel2[1])+yS(city.absLabel2[0]))/2,
			fill:function(){
				var compare = yS(city.absLabel2[1])-yS(city.absLabel2[0])
				if (compare>30) {return "gray"} 
					else{return "white"};
			},
			"font-size": fSize, "font-weight": "bold",
			"text-anchor": "start", "dy": ".35em",
			"font-size": fSize,
			"class":"lower"
		})
		.text("lower")
	//".l2-txt1"
	sel.append("text")
		.attr({
			x:w/2+tickSize+lDist+1, 
			y: function(){
				var aDist = yS(city.absLabel2[1])-yS(city.absLabel2[0])
				var offset = (minDist - aDist)/2
				if (aDist<minDist) {
					return yS(city.absLabel2[0])-offset
				} else {
					return yS(city.absLabel2[0])
				}
			},
			fill:"gray",
			"font-size": fSize, "font-weight": "bold",
			"text-anchor": "start", "dy": ".35em",
			"font-size": fSize,
			"class":"l2-txt1"
		})
		.text(function(d){
			return d3.round(city.absLabel2[0], 1) + "%"
		})
	//".l2-txt2"
	sel.append("text")
		.attr({
			x:w/2+tickSize+lDist+1, 
			y: function(){
				var aDist = yS(city.absLabel2[1])-yS(city.absLabel2[0])
				var offset = (minDist - aDist)/2
				if (aDist<minDist) {
					return yS(city.absLabel2[1])+offset
				} else {
					return yS(city.absLabel2[1])
				}
			},
			fill:"gray",
			"font-size": fSize, "font-weight": "bold",
			"text-anchor": "start", "dy": ".35em",
			"font-size": fSize,
			"class":"l2-txt2"
		})
		.text(function(d){
			return d3.round(city.absLabel2[1], 1) + "%"
		})
	//".l2-line"
	sel.append("path")
		.attr({
			d: function(d){
				return "M"+(w/2+2)+" "+yS(city.absLabel2[0])+" "+
				"L"+(w/2+2)+" "+yS(city.absLabel2[1])+" "
			},
			stroke: "gray",
			"stroke-width": 2, "shape-rendering": "crispEdges",
			fill: "none",
			"class":"l2-line"
		})
	//".l2-path"
	sel.append("path")
		.attr({
			d: function(d){
				return "M"+(w/2+tickSize+2)+" "+yS(city.absLabel2[0])+" "+
				"L"+(w/2+2)+" "+yS(city.absLabel2[0])+" "+
				"L"+(w/2+2)+" "+yS(city.absLabel2[1])+" "+
				"L"+(w/2+tickSize+2)+" "+yS(city.absLabel2[1])+" "
			},
			stroke: "gray",
			"stroke-width": 1, "shape-rendering": "crispEdges",
			fill: "none",
			"class":"l2-path"
		})

	chart3.labelMainView.hoverOn = function (cityString, woodString, varString) {

		if (!cityString) {cityString = selectedCity};
		if (!woodString) {woodString = selectedWood};
		if (!varString) {varString = selectedVariation};

		var city = dataTransform.filterCity(cityString)
		dataTransform.calculateVar(city, woodString, varString)

		var lDist = 11
		var pDist = 7.5

		sel.selectAll(".green")
			.attr({
				fill: function(){
					var compare = yS(city.absLabel1[0])-yS(100)
					if (compare>16) {return "green"} 
						else{return "white"};
				}
			}).transition()

		//Limit1
		//".l1-text1"
		sel.select(".l1-text1")
			.attr({
				x:w/2-tickSize-lDist, 
				y: function(){
					var aDist = yS(city.absLabel1[1])-yS(city.absLabel1[0])
					var offset = (minDist - aDist)/2
					if (aDist<minDist) {
						return yS(city.absLabel1[0])-offset
					} else {
						return yS(city.absLabel1[0])
					}
				},
				fill:"gray"
			})
			.text(function(d){
				return d3.round(city.absLabel1[0], 1) + "%"
			}).transition()
		//".l1-text2"
		sel.select(".l1-text2")
			.attr({
				x:w/2-tickSize-lDist, 
				y: function(){
					var aDist = yS(city.absLabel1[1])-yS(city.absLabel1[0])
					var offset = (minDist - aDist)/2
					if (aDist<minDist) {
						return yS(city.absLabel1[1])+offset
					} else {
						return yS(city.absLabel1[1])
					}
				}
			})
			.text(function(d){
				return d3.round(city.absLabel1[1], 1) + "%"
			}).transition()
		//".higher"
		sel.select(".higher")
			.attr({
				x:w/2-tickSize-lDist-2, 
				y: (yS(city.absLabel1[1])+yS(city.absLabel1[0]))/2,
				fill:function(){
					var compare = yS(city.absLabel1[1])-yS(city.absLabel1[0])
					if (compare>30) {return "gray"} 
						else{return "white"};
				}
			})
			.text("higher").transition()
		//".l1-line"
		sel.select(".l1-line").transition()
			// .attr({
			// 	d: function(d){
			// 		return "M"+(w/2-2)+" "+yS(city.absLabel1[0])+" "+
			// 		"L"+(w/2-2)+" "+yS(city.absLabel1[1])+" "
			// 	}
			// })
		//".l1-path"
		sel.select(".l1-path")
			.attr({
				d: function(d){
					return "M"+(w/2-tickSize-pDist)+" "+yS(city.absLabel1[0])+" "+
					"L"+(w/2-pDist)+" "+yS(city.absLabel1[0])+" "+
					"L"+(w/2-pDist)+" "+yS(city.absLabel1[1])+" "+
					"L"+(w/2-tickSize-pDist)+" "+yS(city.absLabel1[1])+" "
				}
			}).transition()

		//Limit2
		//".l2-txt1"
		sel.select(".l2-txt1")
			.attr({
				x:w/2+tickSize+lDist+1, 
				y: function(){
					var aDist = yS(city.absLabel2[1])-yS(city.absLabel2[0])
					var offset = (minDist - aDist)/2
					if (aDist<minDist) {
						return yS(city.absLabel2[0])-offset
					} else {
						return yS(city.absLabel2[0])
					}
				}
			})
			.text(function(d){
				return d3.round(city.absLabel2[0], 1) + "%"
			}).transition()
		//".l2-txt2"
		sel.select(".l2-txt2")
			.attr({
				x:w/2+tickSize+lDist+1, 
				y: function(){
					var aDist = yS(city.absLabel2[1])-yS(city.absLabel2[0])
					var offset = (minDist - aDist)/2
					if (aDist<minDist) {
						return yS(city.absLabel2[1])+offset
					} else {
						return yS(city.absLabel2[1])
					}
				}
			})
			.text(function(d){
				return d3.round(city.absLabel2[1], 1) + "%"
			}).transition()
		//".lower"
		sel.select(".lower")
			.attr({
				x:w/2+tickSize+lDist+1, 
				y: (yS(city.absLabel2[1])+yS(city.absLabel2[0]))/2,
				fill:function(){
					var compare = yS(city.absLabel2[1])-yS(city.absLabel2[0])
					if (compare>30) {return "gray"} 
						else{return "white"};
				}
			})
			.text("lower").transition()
		//".l2-line"
		sel.select(".l2-line").transition()
			// .attr({
			// 	d: "M"+(w/2+2)+" "+yS(city.absLabel2[0])+" "+
			// 		"L"+(w/2+2)+" "+yS(city.absLabel2[1])+" "
			// })
		//".l2-path"
		sel.select(".l2-path")
			.attr({
				d: "M"+(w/2+tickSize+pDist)+" "+yS(city.absLabel2[0])+" "+
					"L"+(w/2+pDist)+" "+yS(city.absLabel2[0])+" "+
					"L"+(w/2+pDist)+" "+yS(city.absLabel2[1])+" "+
					"L"+(w/2+tickSize+pDist)+" "+yS(city.absLabel2[1])+" "
			}).transition()

	}

	chart3.labelMainView.hoverOff = function () {

		var city = dataTransform.filterCity(selectedCity)
		dataTransform.calculateVar(city, selectedWood, selectedVariation)

		var pDist = 2

		sel.selectAll(".green")
			.transition()
			.attr({
				fill: function(){
					var compare = yS(city.absLabel1[0])-yS(100)
					if (compare>16) {return "green"} 
						else{return "white"};
				}
			})

		//Limit1
		//".l1-text1"
		sel.select(".l1-text1")
			.transition()
			.attr({
				x:w/2-tickSize-lDist, 
				y: function(){
					var aDist = yS(city.absLabel1[1])-yS(city.absLabel1[0])
					var offset = (minDist - aDist)/2
					if (aDist<minDist) {
						return yS(city.absLabel1[0])-offset
					} else {
						return yS(city.absLabel1[0])
					}
				},
				fill:"gray"
			})
			.text(function(d){
				return d3.round(city.absLabel1[0], 1) + "%"
			})
		//".l1-text2"
		sel.select(".l1-text2")
			.transition()
			.attr({
				x:w/2-tickSize-lDist, 
				y: function(){
					var aDist = yS(city.absLabel1[1])-yS(city.absLabel1[0])
					var offset = (minDist - aDist)/2
					if (aDist<minDist) {
						return yS(city.absLabel1[1])+offset
					} else {
						return yS(city.absLabel1[1])
					}
				}
			})
			.text(function(d){
				return d3.round(city.absLabel1[1], 1) + "%"
			})
		//".higher"
		sel.select(".higher")
			.transition()
			.attr({
				x:w/2-tickSize-lDist-2, 
				y: (yS(city.absLabel1[1])+yS(city.absLabel1[0]))/2,
				fill:function(){
					var compare = yS(city.absLabel1[1])-yS(city.absLabel1[0])
					if (compare>30) {return "gray"} 
						else{return "white"};
				}
			})
			.text("higher")
		//".l1-line"
		sel.select(".l1-line").transition()
			.attr({
				d: function(d){
					return "M"+(w/2-2)+" "+yS(city.absLabel1[0])+" "+
					"L"+(w/2-2)+" "+yS(city.absLabel1[1])+" "
				}
			})
		//".l1-path"
		sel.select(".l1-path")
			.transition()
			.attr({
				d: function(d){
					return "M"+(w/2-tickSize-pDist)+" "+yS(city.absLabel1[0])+" "+
					"L"+(w/2-pDist)+" "+yS(city.absLabel1[0])+" "+
					"L"+(w/2-pDist)+" "+yS(city.absLabel1[1])+" "+
					"L"+(w/2-tickSize-pDist)+" "+yS(city.absLabel1[1])+" "
				}
			})

		//Limit2
		//".l2-txt1"
		sel.select(".l2-txt1")
			.transition()
			.attr({
				x:w/2+tickSize+lDist+1, 
				y: function(){
					var aDist = yS(city.absLabel2[1])-yS(city.absLabel2[0])
					var offset = (minDist - aDist)/2
					if (aDist<minDist) {
						return yS(city.absLabel2[0])-offset
					} else {
						return yS(city.absLabel2[0])
					}
				}
			})
			.text(function(d){
				return d3.round(city.absLabel2[0], 1) + "%"
			})
		//".l2-txt2"
		sel.select(".l2-txt2")
			.transition()
			.attr({
				x:w/2+tickSize+lDist+1, 
				y: function(){
					var aDist = yS(city.absLabel2[1])-yS(city.absLabel2[0])
					var offset = (minDist - aDist)/2
					if (aDist<minDist) {
						return yS(city.absLabel2[1])+offset
					} else {
						return yS(city.absLabel2[1])
					}
				}
			})
			.text(function(d){
				return d3.round(city.absLabel2[1], 1) + "%"
			})
		//".lower"
		sel.select(".lower")
			.transition()
			.attr({
				x:w/2+tickSize+lDist+1, 
				y: (yS(city.absLabel2[1])+yS(city.absLabel2[0]))/2,
				fill:function(){
					var compare = yS(city.absLabel2[1])-yS(city.absLabel2[0])
					if (compare>30) {return "gray"} 
						else{return "white"};
				}
			})
			.text("lower")
		//".l2-line"
		sel.select(".l2-line").transition()
			.attr({
				d: "M"+(w/2+2)+" "+yS(city.absLabel2[0])+" "+
					"L"+(w/2+2)+" "+yS(city.absLabel2[1])+" "
			})
		//".l2-path"
		sel.select(".l2-path")
			.transition()
			.attr({
				d: "M"+(w/2+tickSize+pDist)+" "+yS(city.absLabel2[0])+" "+
					"L"+(w/2+pDist)+" "+yS(city.absLabel2[0])+" "+
					"L"+(w/2+pDist)+" "+yS(city.absLabel2[1])+" "+
					"L"+(w/2+tickSize+pDist)+" "+yS(city.absLabel2[1])+" "
			})

	}
}














