var chart2 = {}

chart2.title = function (rawSelection) {
	var sel = d3.select(rawSelection)
	sel.style({
		height: "auto"
	})
	sel.append("p")
		.html("<span style=\"color:red\">Temperature</span>, <span style=\"color:blue\">Humidity</span> and <span style=\"color:gray\"> Moisture Content (MC)</span>")
		.style({
			"text-align": "left",
			padding: "0 0 20px",
			"margin": "0px",
			"font-size": "40px"
			// "font-weight": "bold"
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
			chart2.labelMainView.cityHover(d.name)
			chart2.mainView.cityHover(d.name)
			chart2.condensedView.setSelection(d.name)

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
			chart2.labelMainView.removeCityHover()
			chart2.mainView.cityRemoveHover()
			chart2.condensedView.setSelection()

		})
		.on("click", function (d,i){
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



			sel.selectAll(".v-e-cSelected")
				.classed("v-e-cSelected", false)
				.style("background", "white")
				.style("color", "black")

			d3.select(this).classed("v-e-cSelected", true)
				.style("background", "black")
				.style("color", "white")
		})

	cities.append("p")
		.style({
			margin: "0px",
			padding: "3px 4px",
			"pointer-events": "none"
		})
		.text(function (d,i) {
			return d.name
			//return d3.format("02d")(i+1)+". \t"+d.name
		})

	chart2.cityView.setSelection = function (cityString) {

		sel.selectAll(".v-e-cSelected, .gray")
			.attr("class", "")
			.style("background", "white")
			.style("color", "black")

		cities.each(function (d,i){
			if (d.name == cityString) {
				d3.select(this)
					.attr("class", "gray")
					.style("background", "gray")
					.style("color", "white")
			}
			if (d.name == selectedCity) {
				d3.select(this)
					.attr("class", "v-e-cSelected")
					.style("background", "black")
					.style("color", "white")
			}
		})


	}
}

chart2.labelTitle = function (rawSelection) {

	var sel = d3.select(rawSelection)
	sel.text("Higher and lower months")
		.classed("v-topRowNameLabel", true)

}

chart2.selectFocusOn = function (rawSelection) {
	var sel = d3.select(rawSelection)
	sel.append("div")
		.text("Focus on")
		.style({
			"float": "left",
			"margin-right": "10px",
			"pointer-events": "none"
		})
		.classed("v-topRowNameLabel", true)
	var woodTypeData = [
		{name: "Temperature", type: "temp", color: "red"},
		{name: "Humidity", type: "hum", color: "blue"},
		{name: "MC", type: "emc", color: "gray"}
	]
	var buttons = sel.selectAll(".v-woodButton").data(woodTypeData)
		.enter().append("div")
		.classed("v-woodButton", true)
		.style({
			cursor: "pointer"
		})
	buttons.append("p").text(function (d){return d.name})
		.style({
			margin: "0px",
			padding: "0",
			"pointer-events": "none"
		})

	buttons
		.on("mouseover", function (d){
			var red = false
			var sel = d3.select(this)
			if (d.type != focusOn) {
				sel.style({
					background: function (d) {return d.color},
					color: "white"
				})
				red = true
			};
			chart2.mainView.focusHover(d.type)
			// chart1.condensedView.update(selectedWood, d.type)
			// chart1.varView.removeLabel()
			// chart1.labelVarView.d = undefined
			// chart1.labelVarView(false, false, false, d.type, red)
			// chart1.varView.addRed(undefined, undefined, d.type)
			// if (d.type == selectedVariation) {chart1.varView.removeRed()};
		})
		.on("mouseout", function (d){
			var sel = d3.select(this)
			if (d.type == focusOn) {
				sel.style({
					background: function (d) {return d.color},
					color: "white"
				})
			} else {
				sel.style({
					background: "white",
					color: "black"
				})
			}
			chart2.mainView.focusOut()
			// chart1.condensedView.update()
			// chart1.varView.removeRed()
			// chart1.labelVarView.d = undefined
			// chart1.labelVarView()
		})
		.each(function (d,i){
			if (d.type == focusOn) {
				var sel = d3.select(this)
					.style({
						background: function (d) {return d.color},
						color: "white"
					})
					.classed("v-e-selected", true)
			};
		})
		.on("click", function (d) {
			focusOn = d.type
			chart2.mainView.cityRemoveHover() 
			// chart1.labelVarView.clickTransition()
			// chart1.varView.update()
			// chart1.condensedView.update()
			buttons
				.classed("v-e-selected", false)
				.style({
					background: "white",
					color: "black"
				})
			d3.select(this).classed("v-e-selected", true)
				.style({
					background: function (d) {return d.color},
					color: "white"
				})
			// data.wood.sort(function (a,b) {
			// 	return +b[selectedVariation] - a[selectedVariation]
			// })
			// d3.select(chart1.woodView.rawSelection)
			// 	.select("div").remove()
			// chart1.woodView()
		})
}




