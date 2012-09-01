
var data 

var containerW = 1000
var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]


var selectedWood = "Pouteria pachycarpa"
var selectedCity = "Curitiba"
var selectedVariation = "varTangencial"
var chart1Amplitude = [5.7,-5.7] //[-1,10] //
var chart3Amplitude = [101,89] 
var tempAmpl = [35,-14]
var humAmpl = [100,0]
var emcAmpl = [30,3]

var focusOn = "emc"

var layoutData = [
	{section: "chart1",
	child: [
		{class: "v-row", padding: [0,14,0,14], 
		rect: [0,0,containerW,200],
		child:[
			{class: "v-cell", flex:1, padding: [0,0,0,0]},
			{class: "v-cell", flex:.8, padding: [0,5,0,0]},
			{class: "v-cell", flex:3.2, padding: [20,30,0,5],
			funCall: chart1.title},
			{class: "v-cell", flex:1, padding: [30,0,0,0],
			funCall: "chart1.titleDescription"}
		]},
		{class: "v-row", padding: [0,14,0,14], 
		rect: [0,0,containerW,25],
		child:[
			{class: "v-cell", flex:1, padding: [0,0,0,0],
			funCall: chart1.cityNameLabel},
			{class: "v-cell", flex:.8, padding: [0,5,0,0]},
			{class: "v-cell", flex:3.2, padding: [0,30,0,5],
			funCall: chart1.selectWoodVarTypeView},
			{class: "v-cell", flex:1, padding: [0,0,0,0],
			funCall: chart1.woodNameLabel}
		]},
		{class: "v-row", padding: [0,14,0,14], 
		rect: [0,0,containerW,400],
		child:[
			{class: "v-cell", flex:1, padding: [0,0,0,0],
			funCall: chart1.cityView},
			{class: "v-cell", flex:.8, padding: [0,5,0,0],
			funCall: chart1.labelVarView},
			{class: "v-cell", flex:3.2, padding: [0,30,0,0],
			funCall: chart1.varView},
			{class: "v-cell", flex:1, padding: [0,0,0,0],
			funCall: chart1.woodView}
		]},
		{class: "v-row", padding: [0,14,0,14], 
		rect: [0,0,containerW,150],
		child:[
			{class: "v-cell", flex:1, padding: [20,0,0,0],
			funCall: chart1.condensedView}
		]}
	]},

	{section: "chart2",
	child: [
		{class: "v-row", padding: [0,14,0,14], 
		rect: [0,0,containerW,240],
		child:[
			{class: "v-cell", flex:1, padding: [0,0,0,0]},
			{class: "v-cell", flex:1.8, padding: [0,5,0,0]},
			{class: "v-cell", flex:3.2, padding: [20,30,10,5],
			funCall: chart2.title}
		]},
		{class: "v-row", padding: [0,14,20,14], 
		rect: [0,0,containerW,25],
		child:[
			{class: "v-cell", flex:1, padding: [5,0,0,0],
			funCall: chart1.cityNameLabel},
			{class: "v-cell", flex:1.8, padding: [5,0,0,15],
			funCall: chart2.labelTitle},
			{class: "v-cell", flex:3.2, padding: [0,0,0,0],
			funCall: chart2.selectFocusOn}
		]},
		{class: "v-row", padding: [0,14,0,14], 
		rect: [0,0,containerW,400],
		child:[
			{class: "v-cell", flex:1, padding: [0,0,0,0],
			funCall: chart2.cityView},
			{class: "v-cell", flex:1.8, padding: [0,0,0,0],
			funCall: chart2.labelMainView},
			{class: "v-cell", flex:3.2, padding: [0,0,0,0],
			funCall: chart2.mainView}
		]},
		{class: "v-row", padding: [0,14,0,14], 
		rect: [0,0,containerW,150],
		child:[
			{class: "v-cell", flex:1, padding: [20,0,0,0],
			funCall: chart2.condensedView}
		]}
	]},

	{section: "chart3",
	child: [
		{class: "v-row", padding: [0,14,0,14], 
		rect: [0,0,containerW,200],
		child:[
			{class: "v-cell", flex:1, padding: [0,0,0,0]},
			{class: "v-cell", flex:.8, padding: [0,5,0,0]},
			{class: "v-cell", flex:3.2, padding: [20,30,0,5],
			funCall: chart3.title},
			{class: "v-cell", flex:1, padding: [30,0,0,0],
			funCall: "chart1.titleDescription"}
		]},
		{class: "v-row", padding: [0,14,0,14], 
		rect: [0,0,containerW,25],
		child:[
			{class: "v-cell", flex:1, padding: [0,0,0,0],
			funCall: chart3.cityNameLabel},
			{class: "v-cell", flex:.8, padding: [0,5,0,0]},
			{class: "v-cell", flex:3.2, padding: [0,30,0,5],
			funCall: chart3.selectWoodVarTypeView},
			{class: "v-cell", flex:1, padding: [0,0,0,0],
			funCall: chart3.woodNameLabel}
		]},
		{class: "v-row", padding: [0,14,0,14], 
		rect: [0,0,containerW,400],
		child:[
			{class: "v-cell", flex:1, padding: [0,0,0,0],
			funCall: chart3.cityView},
			{class: "v-cell", flex:.8, padding: [0,5,0,0],
			funCall: chart3.labelMainView},
			{class: "v-cell", flex:3.2, padding: [0,30,0,0],
			funCall: chart3.mainView},
			{class: "v-cell", flex:1, padding: [0,0,0,0],
			funCall: chart3.woodView}
		]},
		{class: "v-row", padding: [0,14,0,14], 
		rect: [0,0,containerW,150],
		child:[
			{class: "v-cell", flex:1, padding: [20,0,0,0],
			funCall: chart3.condensedView}
		]}
	]},
]

function layout (layoutData) {
	layoutData.forEach(function (d, i) {
		d3.select("#"+d.section).datum(d).each(parser)
	})

	function parser (d,i) {
		var selection = d3.select(this)
		if (d.hasOwnProperty("child") && d.child.length>0) {
			var flexTotal = d3.sum(d.child, function (e){return e.flex})
			var widthS = d3.scale.linear().domain([0,flexTotal])
					.range([0,parseFloat(selection.style("width"))])
			
			var divs = selection.selectAll("div").data(d.child)
				.enter().append("div")
			if (flexTotal==0) {
				divs.attr("class", function (d){return d.class})
					.style({
						width: function (d){return d.rect[2]-d.padding[1]-d.padding[3]+"px"},
						height: function (d){return d.rect[3]-d.padding[0]-d.padding[2]+"px"},
						padding: function (d) {
							return d.padding[0]+"px "+d.padding[1]+"px "+d.padding[2]+"px "+d.padding[3]+"px"
						},
						margin: "0 auto 0"
					})
					.each(parser)
			} else {
				divs.attr("class", function (d){return d.class})
					.style({
						width: function (d){return widthS(d.flex)-d.padding[1]-d.padding[3]+"px"},
						"height": function (d){return parseFloat(selection.style("height"))-d.padding[0]-d.padding[2]+"px"},
						padding: function (d) {
							return d.padding[0]+"px "+d.padding[1]+"px "+d.padding[2]+"px "+d.padding[3]+"px"
						},
						float: "left"
					})
					.each(function (d,i){
						if (d.hasOwnProperty("funCall") && typeof d.funCall === "function") {
							d.funCall(this)
						}
					})
					.each(parser)
			}; //END else
		} //END if child
	} //END parser function
} //END layout function
