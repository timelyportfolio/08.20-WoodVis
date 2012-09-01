var chart1 = {}
chart1.title = function (rawSelection) {
	var sel = d3.select(rawSelection)
	sel.style({
		height: "auto"
	})
	sel.append("p")
		.html("Wood <span style=\"color:red\">Relative</span> Dimensional Change")
		.style({
			"text-align": "left",
			padding: "0 0 20px",
			"margin": "0px",
			"font-size": "40px"
			// "font-weight": "bold"
		})
}
chart1.titleDescription = function (rawSelection) {
	var sel = d3.select(rawSelection)
	sel.style({
		height: "auto"
	})
	sel.append("p")
		.html("<strong>How to read</strong>:<br>Each collumn shows the size variation in that month <strong >(black)</strong>, and how much it can grow or shrink during the rest of the year from that month <strong>(gray)</strong>")
		.style({
			padding: "0 0px 0 0px",
			"margin": "0px",
			"font-size": "12px",
			"font-style": "italic",
			color: "red"
		})
	sel.select("p").transition()
		.delay(5000).duration(5000)
		.style({
			color: "black"
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
		.text("Wood Direction")
		.style({
			"float": "left",
			"margin-right": "10px",
			"pointer-events": "none"
		})
		.classed("v-topRowNameLabel", true)
	var woodTypeData = [
		{name: "Tangential", type: "varTangencial"},
		{name: "Radial", type: "varRadial"}
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
			//Chart1
			//CityView
			//LabelView
			chart1.labelVarView.hoverOn(false, false, d.type)
			// chart1.labelVarView(false, false, false, d.type, red)
			//VarView
			chart1.varView.removeLabel()
			chart1.varView.hoverOn(false, false, d.type)
			//CondensedView
			chart1.condensedView.update(selectedWood, d.type)
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
			//Chart1
			//CityView
			//LabelView
			chart1.labelVarView.hoverOff()
			//VarView
			chart1.varView.hoverOff()
			//CondensedView
			chart1.condensedView.update()
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
			
			data.wood.sort(function (a,b) {
				return +b[selectedVariation] - a[selectedVariation]
			})
			//Chart1
			//cityView
			//LabelView
			chart1.labelVarView.hoverOff()
			//VarView
			chart1.varView.removeLabel()
			chart1.varView.hoverOff()
			//WoodView
			d3.select(chart1.woodView.rawSelection)
				.select("div").remove()
			chart1.woodView()
			//CondensedView
			chart1.condensedView.update()
			chart1.selectWoodVarTypeView.setSelection()


			//Chart2
			chart2.labelMainView.removeCityHover()
			chart2.mainView.cityHover(selectedCity)
			chart2.mainView.cityRemoveHover()
			chart2.condensedView.setSelection()

			//Chart3
			d3.select(chart3.woodView.rawSelection)
				.select("div").remove()

			chart3.woodView()
			chart3.mainView.hoverInfoOff()
			chart3.labelMainView.hoverOff() 
			chart3.condensedView.adjust()
			chart3.woodView.setSelection()
			chart3.selectWoodVarTypeView.setSelection()

		})

	chart1.selectWoodVarTypeView.setSelection = function () {

		buttons
			.classed("v-e-selected", false)
				.style({
					background: "white",
					color: "black"
				})
		buttons.each(function (d,i){
			if (d.type == selectedVariation) {
				d3.select(this)
					.style({
						background: "black",
						color: "white"
					})
			}
		})
	}

}
chart1.woodNameLabel = function (rawSelection) {
	var sel = d3.select(rawSelection)
	sel.text("Wood Species")
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
			"padding": "0px 0px 0 0px"
			// overflow: "auto"
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
			var sel = d3.select(this)
			sel.style("background", "red")
			sel.select("p").style("color", "white")
				.style("font-style", "italic")
				.text(function (d) {
					return d.nomeCientifico
				})
			sel.each(function (d,i){
				var sel = d3.select(this)
				if (d.nomeCientifico == selectedWood) {
					sel.style("background", "black")
				}
				
			})
			//Chart1
			//CityView
			//LabelView
			chart1.labelVarView.hoverOn(false, d.nomeCientifico, false)
			//VarView
			chart1.varView.removeLabel()
			chart1.varView.hoverOn(false, d.nomeCientifico, false)
			//CondensedView
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
			//Chart1
			//CityView
			//LabelView
			chart1.labelVarView.hoverOff()
			//VarView
			chart1.varView.hoverOff()
			//CondensedView
			chart1.condensedView.update(selectedWood)

		})
		.on("click", function (d,i){
			selectedWood = d.nomeCientifico

			//Chart1
			//Label
			chart1.labelVarView.hoverOff()
			//Var
			chart1.varView.removeLabel()
			chart1.varView.hoverOff()
			//Condensed
			chart1.condensedView.setSelection()
			chart1.woodView.setSelection()
			chart1.condensedView.update(selectedWood)

			//Chart2
			chart2.labelMainView.removeCityHover()
			chart2.mainView.cityHover(selectedCity)
			chart2.mainView.cityRemoveHover()
			chart2.condensedView.setSelection()

			//Chart3
			chart3.mainView.hoverInfoOff()
			chart3.labelMainView.hoverOff() 
			chart3.condensedView.adjust()
			chart3.woodView.setSelection()

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

	chart1.woodView.setSelection = function (cityString) {

		sel.selectAll(".v-e-wSelected, .red")
			.attr("class", "")
			.style("background", "white")
				.select("p").style("color", "black")

		woods.each(function (d,i){
			if (d.nomeCientifico == selectedWood) {
				d3.select(this)
					.attr("class", "v-e-wSelected")
					.style("background", "black")
						.select("p").style("color", "white")
			}
		})

	}
}






