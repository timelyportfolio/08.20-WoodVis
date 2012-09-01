chart3.cityView = function (rawSelection) {
	if (rawSelection) {chart3.cityView.rawSelection = rawSelection}
		else {rawSelection = chart3.cityView.rawSelection};

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
			sel.style("background", "green")
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
			chart3.mainView.hoverInfoOn(d.name, false, false)
			chart3.labelMainView.hoverOn(d.name, false, false)
			chart3.condensedView.setSelection(d.name)

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
			chart3.mainView.hoverInfoOff()
			chart3.labelMainView.hoverOff() 
			chart3.condensedView.setSelection()

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
				.attr("class", "")
				.style("background", "white")
				.style("color", "black")

			d3.select(this)
				.attr("class", "v-e-cSelected")
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

	chart3.cityView.setSelection = function (cityString) {

		sel.selectAll(".v-e-cSelected, .green")
			.attr("class", "")
			.style("background", "white")
			.style("color", "black")

		cities.each(function (d,i){
			if (d.name == cityString) {
				d3.select(this)
					.attr("class", "green")
					.style("background", "green")
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
