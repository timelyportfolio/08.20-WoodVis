chart3.mainView = function (rawSelection) {

	if (rawSelection) {chart3.mainView.rawSelection = rawSelection}
		else {rawSelection = chart3.mainView.rawSelection};

	var city = dataTransform.filterCity(selectedCity)
	dataTransform.calculateVar(city, selectedWood)

	var tickSize = 4
	var lDist = 6
	var fSize = 10
	var minDist = 10

	var sel = d3.select(rawSelection)
	var w = parseFloat(sel.style("width"))
	var h = parseFloat(sel.style("height"))
	var yS = d3.scale.linear().domain(chart3Amplitude).range([0,h])
	var xS = d3.scale.ordinal()
		.rangeRoundBands([0,w], 0.02, 0)
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
	months.each(function(d,i){
			if (i%2 == 0) {
				d3.select(this).append("rect")
					.attr({
						x:0,y:0,width:xS.rangeBand(),height:h,
						fill:"#f4f4f4"
					})
			};
		})

	sel.append("line")
		.attr({
			x1: 0, x2: w,
			y1: yS(100), y2: yS(100),
			stroke: "green", "stroke-width": 3,
			"shape-rendering": "crispEdges"
		})
		
	//Month block
	months.append("text")
		.text(function(d){return d3.round(d.abs[0], 1)+"%"})
		.attr({
			x: xS.rangeBand()-lDist,
			y: function(d){
				var aDist = yS(d.abs[1])-yS(d.abs[0])
				var offset = (minDist - aDist)/2
				if (aDist<minDist) {
					return yS(d.abs[0])-offset
				} else {
					return yS(d.abs[0])
				}
			},
			fill: "black", "font-size": fSize,
			"font-weight": "bold",
			dy: ".35em", "text-anchor": "end",
			"class": "text1"
		})
	months.append("text")
		.text(function(d){return d3.round(d.abs[1], 1)+"%"})
		.attr({
			x: xS.rangeBand()-lDist,
			y: function(d){
				var aDist = yS(d.abs[1])-yS(d.abs[0])
				var offset = (minDist - aDist)/2
				if (aDist<minDist) {
					return yS(d.abs[1])+offset
				} else {
					return yS(d.abs[1])
				}
			},
			fill: "black", "font-size": fSize,
			"font-weight": "bold",
			dy: ".35em", "text-anchor": "end",
			"class": "text2"
		})
	months.append("path")
		.attr({
			d: function(d){
				return "M"+(xS.rangeBand())+" "+yS(d.abs[0])+" "+
				"L"+(xS.rangeBand())+" "+yS(d.abs[1])+" "
			},
			stroke: "black",
			"stroke-width": 1, "shape-rendering": "crispEdges",
			fill: "none",
			"class": "line"
		})
	months.append("path")
		.attr({
			d: function(d){
				return "M"+(xS.rangeBand()-tickSize)+" "+yS(d.abs[0])+" "+
				"L"+(xS.rangeBand())+" "+yS(d.abs[0])+" "+
				"L"+(xS.rangeBand())+" "+yS(d.abs[1])+" "+
				"L"+(xS.rangeBand()-tickSize)+" "+yS(d.abs[1])+" "
			},
			stroke: "black",
			"stroke-width": 1, "shape-rendering": "crispEdges",
			fill: "none",
			"class": "colchete"
		})
	


	//Month label
	months.append("text")
		.attr({
			x: xS.rangeBand()/2,
			y: h-6,
			"text-anchor": "middle",
			"pointer-events": "none",
			fill: "black", "font-size": 12,
			"font-weight": "bold"
		})
		.text(function (d) {return d.month})

	//Mouse Over
	months.on("mouseover", function mouseover (d,i) {
		var sel = d3.select(this)
		var city = dataTransform.filterCity(selectedCity)
		dataTransform.calculateVar(city, selectedWood)
		d = city.months[i]

		// months.selectAll("text").attr("fill", "gray")
		// 	.attr("font-weight", "none")
		// sel.select("text").attr("fill", "green")
		// 	.attr("font-weight", "bold")

		// chart1.labelVarView.d = d
		// chart1.labelVarView(false, false, false, false, "green")

	})
		.on("mouseout", function (d) {
			var sel = d3.select(this)
			// chart1.labelVarView.d = false
			// chart1.labelVarView()
			// months.selectAll("text").attr("fill", "gray")
			// .attr("font-weight", "none")
		})

	chart3.mainView.hoverInfoOn = function (cityString, woodString, varString) {
		if (!cityString) {cityString = selectedCity};
		if (!woodString) {woodString = selectedWood};
		if (!varString) {varString = selectedVariation};

		var city = dataTransform.filterCity(cityString)
		dataTransform.calculateVar(city, woodString, varString)

		var lDist = 8

		months.data(city.months)
			.select(".text1")
			.text(function(d){return d3.round(d.abs[0], 1)+"%"})
			.attr({
				x: xS.rangeBand()-lDist,
				y: function(d){
					var aDist = yS(d.abs[1])-yS(d.abs[0])
					var offset = (minDist - aDist)/2
					if (aDist<minDist) {
						return yS(d.abs[0])-offset
					} else {
						return yS(d.abs[0])
					}
				},
				fill:"green"
			}).transition()
		months.data(city.months)
			.select(".text2")
			.text(function(d){return d3.round(d.abs[1], 1)+"%"})
			.attr({
				x: xS.rangeBand()-lDist,
				y: function(d){
					var aDist = yS(d.abs[1])-yS(d.abs[0])
					var offset = (minDist - aDist)/2
					if (aDist<minDist) {
						return yS(d.abs[1])+offset
					} else {
						return yS(d.abs[1])
					}
				},
				fill:"green"
			}).transition()

		months.select(".line").transition()

		months.select(".colchete")
			.attr({
				d: function(d){
					return "M"+(xS.rangeBand()-tickSize-2.5)+" "+yS(d.abs[0])+" "+
					"L"+(xS.rangeBand()-2.5)+" "+yS(d.abs[0])+" "+
					"L"+(xS.rangeBand()-2.5)+" "+yS(d.abs[1])+" "+
					"L"+(xS.rangeBand()-tickSize-2.5)+" "+yS(d.abs[1])+" "
				},
				stroke:"green"
			}).transition()
	}
	chart3.mainView.hoverInfoOff = function () {

		var city = dataTransform.filterCity(selectedCity)
		dataTransform.calculateVar(city, selectedWood, selectedVariation)

		months.data(city.months)

		months.select(".text1").transition()
			.text(function(d){return d3.round(d.abs[0], 1)+"%"})
			.attr({
				x: xS.rangeBand()-lDist,
				y: function(d){
					var aDist = yS(d.abs[1])-yS(d.abs[0])
					var offset = (minDist - aDist)/2
					if (aDist<minDist) {
						return yS(d.abs[0])-offset
					} else {
						return yS(d.abs[0])
					}
				},
				fill:"black"
			})
		months.select(".text2").transition()
			.text(function(d){return d3.round(d.abs[1], 1)+"%"})
			.attr({
				x: xS.rangeBand()-lDist,
				y: function(d){
					var aDist = yS(d.abs[1])-yS(d.abs[0])
					var offset = (minDist - aDist)/2
					if (aDist<minDist) {
						return yS(d.abs[1])+offset
					} else {
						return yS(d.abs[1])
					}
				},
				fill:"black"
			})

		months.select(".line")
			.transition()
			.attr({
				d: function(d){
					return "M"+(xS.rangeBand())+" "+yS(d.abs[0])+" "+
					"L"+(xS.rangeBand())+" "+yS(d.abs[1])+" "
				}
			})

		months.select(".colchete")
			.transition()
			.attr({
				d: function(d){
					return "M"+(xS.rangeBand()-tickSize)+" "+yS(d.abs[0])+" "+
					"L"+(xS.rangeBand())+" "+yS(d.abs[0])+" "+
					"L"+(xS.rangeBand())+" "+yS(d.abs[1])+" "+
					"L"+(xS.rangeBand()-tickSize)+" "+yS(d.abs[1])+" "
				},
				stroke:"black"
			})
	}
}














