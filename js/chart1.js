var chart1 = {}
chart1.title = function (rawSelection) {
	var sel = d3.select(rawSelection)
	sel.style({
		height: "auto"
	})
	sel.append("p")
		.text("Wood Size Variation")
		.style({
			"text-align": "left",
			padding: "0 0 20px",
			"margin": "0px",
			"font-size": "40px",
			"font-weight": "bold"
		})
}
chart1.titleDescription = function (rawSelection) {
	var sel = d3.select(rawSelection)
	sel.style({
		height: "auto"
	})
	sel.append("p")
		.html("A <strong>month collumn</strong> shows the size variation during the month and on the rest of the year from the month")
		.style({
			padding: "0 0px 0 0px",
			"margin": "0px",
			"font-size": "12px",
			"font-style": "italic"
		})
}
chart1.cityNameLabel = function (rawSelection) {
	var sel = d3.select(rawSelection)
	sel.text("Cities")
		.classed("v-topRowNameLabel", true)
}
chart1.selectWoodVarTypeView = function (rawSelection) {
	var sel = d3.select(rawSelection)
	sel.append("div")
		.text("Variation Type")
		.style({
			"float": "left",
			"margin-right": "10px",
			"pointer-events": "none"
		})
		.classed("v-topRowNameLabel", true)
	var woodTypeData = [
		{name: "Tangential", type: "varTangencial"},
		{name: "Radial", type: "varRadial"},
		// {name: "Volumetric", type: "varVolumetrica"}
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
			if (d.type != selectedVariation) {
				sel.style({
					background: "red",
					color: "white"
				})
				red = true
			};
			chart1.condensedView.update(selectedWood, d.type)
			chart1.varView.removeLabel()
			chart1.labelVarView.d = undefined
			chart1.labelVarView(false, false, false, d.type, red)
			chart1.varView.addRed(undefined, undefined, d.type)
			if (d.type == selectedVariation) {chart1.varView.removeRed()};
		})
		.on("mouseout", function (d){
			var sel = d3.select(this)
			if (d.type == selectedVariation) {
				sel.style({
					background: "black",
					color: "white"
				})
			} else {
				sel.style({
					background: "white",
					color: "black"
				})
			}
			chart1.condensedView.update()
			chart1.varView.removeRed()
			chart1.labelVarView.d = undefined
			chart1.labelVarView()
		})
		.each(function (d,i){
			if (d.type == selectedVariation) {
				var sel = d3.select(this)
					.style({
						background: "black",
						color: "white"
					})
					.classed("v-e-selected", true)
			};
		})
		.on("click", function (d) {
			selectedVariation = d.type
			chart1.labelVarView.clickTransition()
			chart1.varView.update()
			chart1.condensedView.update()
			buttons
				.classed("v-e-selected", false)
				.style({
					background: "white",
					color: "black"
				})
			d3.select(this).classed("v-e-selected", true)
				.style({
					background: "black",
					color: "white"
				})
			data.wood.sort(function (a,b) {
				return +b[selectedVariation] - a[selectedVariation]
			})
			d3.select(chart1.woodView.rawSelection)
				.select("div").remove()
			chart1.woodView()
		})
}
chart1.woodNameLabel = function (rawSelection) {
	var sel = d3.select(rawSelection)
	sel.text("Wood Types")
		.classed("v-topRowNameLabel", true)
}
chart1.woodView = function (rawSelection) {
	if (rawSelection) {chart1.woodView.rawSelection = rawSelection}
		else {rawSelection = chart1.woodView.rawSelection};

	var sel = d3.select(rawSelection)

	var woods = sel.append("div")
		.style({
			width:"100%", height:"100%",
			// "margin": "0px 0px 0 30px",
			"padding": "0px 0px 0 0px",
			// overflow: "auto"
		})
		.on("mouseout", function () {
			chart1.condensedView.update(selectedWood)
		})

		.selectAll("div").data(data.wood)
	  .enter().append("div")
		.style({
			"border-bottom-style": "solid",
			"border-width": "1px",
			"cursor": "pointer"
		}).each(function (d,i){
			var sel = d3.select(this)
			if (d.nomeCientifico == selectedWood) {
				sel.classed("v-e-wSelected", true)
					.style("background", "black")
			}
		})
		.on("mouseover", function (d,i) {
			var red = true
			var sel = d3.select(this)
			sel.style("background", "red")
			sel.select("p").style("color", "white")
				.style("font-style", "italic")
				.text(function (d) {
					return d.nomeCientifico
				})
			chart1.varView.addRed(d, false)
			sel.each(function (d,i){
				var sel = d3.select(this)
				if (d.nomeCientifico == selectedWood) {
					sel.style("background", "black")
					chart1.varView.removeRed()
					red = false
				}
				
			})
			chart1.varView.removeLabel()
			chart1.labelVarView.d = undefined
			chart1.labelVarView(false, d.nomeCientifico, false, false, red)

			chart1.condensedView.update(d.nomeCientifico)
		})
		.on("mouseout", function (d,i) {
			var sel = d3.select(this)
			sel.style("background", "white")
			sel.select("p").style("color", "black")
				.style("font-style", "normal")
				.text(function (d) {
					return d.nomePopular
				})
			sel.each(function (d,i){
				var sel = d3.select(this)
				if (d.nomeCientifico == selectedWood) {
					sel.style("background", "black")
						.select("p").style("color", "white")
				}
			})
			chart1.varView.removeRed()
			chart1.labelVarView.d = undefined
			chart1.labelVarView()
		})
		.on("click", function (d,i){
			selectedWood = d.nomeCientifico
			chart1.varView.removeLabel()
			chart1.varView.update()

			chart1.labelVarView.clickTransition()

			d3.select(".v-e-wSelected")
				.classed("v-e-wSelected", false)
				.style("background", "white")
				.select("p").style("color", "black")

			d3.select(this).classed("v-e-wSelected", true)
				.style("background", "black")
				.select("p").style("color", "white")
		})

	woods.append("p")
		.style({
			margin: "0px",
			padding: "3px 4px",
			"pointer-events": "none"
		})
		.text(function (d) {
			return d.nomePopular
		})
		.each(function (d,i){
			var sel = d3.select(this)
			if (d.nomeCientifico == selectedWood) {
				sel.style("color", "white")
			}
		})
}