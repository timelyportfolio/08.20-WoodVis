chart3 = {}

chart3.title = function (rawSelection) {
	var sel = d3.select(rawSelection)
	sel.style({
		height: "auto"
	})
	sel.append("p")
		.html("Wood <span style=\"color:green\">Absolute</span> Dimensional Change")
		.style({
			"text-align": "left",
			padding: "0 0 20px",
			"margin": "0px",
			"font-size": "40px"
			// "font-weight": "bold"
		})
}

chart3.cityNameLabel = function (rawSelection) {
	var sel = d3.select(rawSelection)
	sel.text("Cities")
		.classed("v-topRowNameLabel", true)
}
chart3.selectWoodVarTypeView = function (rawSelection) {
	var sel = d3.select(rawSelection)
	sel.append("div")
		.text("Wood Direction")
		.style({
			"float": "left",
			"margin-right": "10px",
			"pointer-events": "none"
		})
		.classed("v-topRowNameLabel", true)
	var woodTypeData = [{name: "Tangential", type: "varTangencial"},
		{name: "Radial", type: "varRadial"}
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
			var sel = d3.select(this)
			if (d.type != selectedVariation) {
				sel.style({
					background: "green",
					color: "white"
				})
			};
			chart3.mainView.hoverInfoOn(false, false, d.type)
			chart3.labelMainView.hoverOn(false, false, d.type)
			chart3.condensedView.adjust(false, d.type)
			// chart1.condensedView.update(selectedWood, d.type)
			// chart1.varView.removeLabel()
			// chart1.labelVarView.d = undefined
			// chart1.labelVarView(false, false, false, d.type, red)
			// chart1.varView.addRed(undefined, undefined, d.type)
			// if (d.type == selectedVariation) {chart1.varView.removeRed()};
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
			chart3.mainView.hoverInfoOff()
			chart3.labelMainView.hoverOff() 
			chart3.condensedView.adjust()
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

	chart3.selectWoodVarTypeView.setSelection = function () {

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
chart3.woodNameLabel = function (rawSelection) {
	var sel = d3.select(rawSelection)
	sel.text("Wood Species")
		.classed("v-topRowNameLabel", true)
}
chart3.woodView = function (rawSelection) {
	if (rawSelection) {chart3.woodView.rawSelection = rawSelection}
		else {rawSelection = chart3.woodView.rawSelection};

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
			sel.style("background", "green")
			sel.select("p").style("color", "white")
				.style("font-style", "italic")
				.text(function (d) {
					return d.nomeCientifico
				})
			// chart1.varView.addRed(d, false)
			sel.each(function (d,i){
				var sel = d3.select(this)
				if (d.nomeCientifico == selectedWood) {
					sel.style("background", "black")
					// chart1.varView.removeRed()
				}
				
			})
			chart3.mainView.hoverInfoOn(false, d.nomeCientifico, false)
			chart3.labelMainView.hoverOn(false, d.nomeCientifico, false)
			chart3.condensedView.adjust(d.nomeCientifico, false)

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
			chart3.mainView.hoverInfoOff()
			chart3.labelMainView.hoverOff() 
			chart3.condensedView.adjust()

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

		chart3.woodView.setSelection = function (cityString) {

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






