chart1.cityView = function (rawSelection) {
	if (rawSelection) {chart1.cityView.rawSelection = rawSelection}
		else {rawSelection = chart1.cityView.rawSelection};

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
			sel.style("background", "red")
				.style("color", "white")
			
			chart1.varView.addRed(false, d)
			sel.each(function (d,i){
				var sel = d3.select(this)
				if (d.name == selectedCity) {
					sel.style("background", "black")
					chart1.varView.removeRed()
					red = false
				}
			})
			chart1.varView.removeLabel()
			chart1.labelVarView.d = undefined
			chart1.labelVarView(false, false, d.name, false, red)

			chart1.condensedView.setRed(d.name)
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
			chart1.varView.removeRed()
			chart1.condensedView.unsetRed()
			chart1.labelVarView.d = undefined
			chart1.labelVarView()
		})
		.on("click", function (d,i){
			selectedCity = d.name
			chart1.varView.removeLabel()
			chart1.varView.update()

			chart1.labelVarView.clickTransition()

			d3.select(".v-e-cSelected")
				.classed("v-e-cSelected", false)
				.style("background", "white")
				.style("color", "black")

			d3.select(this).classed("v-e-cSelected", true)
				.style("background", "black")
				.style("color", "white")

			chart1.condensedView.setBlack()
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
chart1.cityView.setRed = function (cityName) {
	var sel = d3.select(chart1.cityView.rawSelection)
	var groups = sel.selectAll("div")
	groups.each(function (d,i) {
		var sel = d3.select(this)
		if (d.name == cityName && d.name != selectedCity) {
			sel.classed("v-e-red", true)
				.style({
					background: "red",
					color: "white"
				})
		};
	})
}
chart1.cityView.unsetRed = function () {
	var sel = d3.select(chart1.cityView.rawSelection)
	var red = sel.selectAll(".v-e-red")
		.classed("v-e-red", false)
		.style({
			"background": "white",
			color: "black"
		})
	if (red.classed("v-e-cSelected")) {
		red.style("background", "black")
			.style("color", "white")
	} else {red.style("fill", "white")};	
}
chart1.cityView.setBlack = function () {
	var sel = d3.select(chart1.cityView.rawSelection)
		.select("div")
	d3.select(".v-e-cSelected")
		.classed("v-e-cSelected", false)
		.style("background", "white")
			.style("color", "black")
	sel.selectAll("div").each(function (d) {
		if (d.name == selectedCity) {
			d3.select(this).classed("v-e-cSelected", true)
				.style("background", "black")
				.style("color", "white")
		}
	})
	
}