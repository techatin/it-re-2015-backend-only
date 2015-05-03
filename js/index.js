$(document).ready(function() {
	//functions and variables
	var subjects = [
		{
			"subject":"Mathematics I",
			"gpa":"4.0",
			"goal":"4.0",
			"chartdata":[
				{
					"exam":"Math Test 1",
					"percentage":73	
				},{
					"exam":"Math Test 2",
					"percentage":97
				}
			]
		},{
			"subject":"Mathematics II",
			"gpa":"4.0",
			"goal":"4.0",
			"chartdata":[
				{
					"exam":"Math Test 1",
					"percentage":73	
				},{
					"exam":"Math Test 2",
					"percentage":97
				}
			]
		},{
			"subject":"Physics",
			"gpa":"4.0",
			"goal":"4.0",
			"chartdata":[
				{
					"exam":"Math Test 1",
					"percentage":73	
				},{
					"exam":"Math Test 2",
					"percentage":97
				}
			]
		}
	];

	function chartDraw(framediv,title,chartData,chartdiv) {
		var chart;
		$(framediv).append("<p class='emphasis'>"+title+"</p>");
		$(framediv).append("<div class='graph' id='"+chartdiv+"'></div>");
		AmCharts.ready(function () {
			// SERIAL CHART
			chart = new AmCharts.AmSerialChart();
			chart.dataProvider = chartData;
			chart.categoryField = "exam";
			chart.startDuration = 1;
	
			// AXES
			// category
			var categoryAxis = chart.categoryAxis;
			categoryAxis.color = "white";
			categoryAxis.axisColor = "white";
			categoryAxis.gridColor = "white";
			categoryAxis.labelRotation = 90;
			categoryAxis.gridPosition = "start";
	
			// value
			// in case you don't want to change default settings of value axis,
			// you don't need to create it, as one value axis is created automatically.
	
			// GRAPH
			var graph = new AmCharts.AmGraph();
			graph.fillColors = "white";
			graph.valueField = "percentage";
			graph.balloonText = "[[category]]: <b>[[value]]</b>";
			graph.type = "column";
			graph.lineAlpha = 0;
			graph.fillAlphas = 0.8;
			chart.addGraph(graph);
	
			// CURSOR
			var chartCursor = new AmCharts.ChartCursor();
			chartCursor.cursorAlpha = 0;
			chartCursor.zoomable = false;
			chartCursor.categoryBalloonEnabled = false;
			chart.addChartCursor(chartCursor);
	
			chart.creditsPosition = "top-right";
	
			chart.write(chartdiv);
		});
	}
	
	function subjectRead (subjects){
		for (var i = 0;i<subjects.length;i++)
		{
			$("#main").append("<p class='emphasis'>"+subjects[i]["subject"]+": </p><p><b>Current: </b>"+subjects[i]["gpa"]+",<b> Goal: </b>"+subjects[i]["goal"]+"</p>");
			chartDraw("#scr2",subjects[i]["subject"],subjects[i]["chartdata"],subjects[i]["subject"]);	
		}
	};
	//main start up
	/*var xmlhttp = new XMLHttpRequest();
	var url = "dashboard/overview";
	
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var subjects = JSON.parse(xmlhttp.responseText);
			subjectRead(subjects);
		}
	}
	xmlhttp.open("POST", url, true);
	xmlhttp.send();*/
	subjectRead(subjects);
	$("#main").css("z-index","1");
	$("#main").css("opacity","1");
	iA = ["#scr1","#scr2","#scr3","#scr4","#main"];
	iL = ["#hl1","#hl2","#hl3","#hl4","#ml"];
	
	$("#ml").click(function () {
		$("#main").css("z-index","1");
		$("#main").css("opacity","1");
		$("#ml").css("color","white");
		for (var i = 3;i>=0;i--) {
			$(iA[i]).css("z-index","0");
			$(iA[i]).css("opacity","0");
			$(iL[i]).css("color","#626A72");
		}
	});
	
	$("#hl1").click(function () {
		$("#scr1").css("z-index","1");
		$("#scr1").css("opacity","1");
		$("#hl1").css("color","white");
		for (var i = 1;i<5;i++) {
			$(iA[i]).css("z-index","0");
			$(iA[i]).css("opacity","0");
			$(iL[i]).css("color","#626A72");
		}
	});
	
	$("#hl2").click(function () {
		$("#scr2").css("z-index","1");
		$("#scr2").css("opacity","1");
		$("#hl2").css("color","white");
		for (var i = 2;i<5;i++) {
			$(iA[i]).css("z-index","0");
			$(iA[i]).css("opacity","0");
			$(iL[i]).css("color","#626A72");
		}
		$("#scr1").css("z-index","0");
		$("#scr1").css("opacity","0");
		$("#hl1").css("color","#626A72");
	});
	
	$("#hl3").click(function () {
		$("#scr3").css("z-index","1");
		$("#scr3").css("opacity","1");
		$("#hl3").css("color","white");
		for (var i = 1;i>0;i--) {
			$(iA[i]).css("z-index","0");
			$(iA[i]).css("opacity","0");
			$(iL[i]).css("color","#626A72");
		}
		$("#scr4").css("z-index","0");
		$("#scr4").css("opacity","0");
		$("#hl4").css("color","#626A72");
		$("#main").css("z-index","0");
		$("#main").css("opacity","0");
		$("#ml").css("color","#626A72");
	});
	
	$("#hl4").click(function () {
		$("#scr4").css("z-index","1");
		$("#scr4").css("opacity","1");
		$("#hl4").css("color","white");
		for (var i = 2;i>0;i--) {
			$(iA[i]).css("z-index","0");
			$(iA[i]).css("opacity","0");
			$(iL[i]).css("color","#626A72");
		}
		$("#main").css("z-index","0");
		$("#main").css("opacity","0");
		$("#ml").css("color","#626A72");
	});
	
	$("#scr3Submit").click(function () {
		var exam = {"subject":$("#examSubject").val(),"exam":$("#examName").val(),"percentage":$("#examPercent").val()};
		alert("Response recorded: For subject "+exam["subject"]+", examination name is "+exam["exam"]+" with a percentage of the final grade of "+exam["percentage"]+"%");
		$("#examSubject").val('');
		$("#examName").val('');
		$("#examPercent").val('');
	});
	
	$("#scr4Submit").click(function () {
		var goal = {"subject":$("#goalSubject").val(),"goal":$("#goalGpa").val()};
		alert("Response recorded: For subject "+goal["subject"]+", goal GPA is "+goal["goal"]);
		$("#goalSubject").val('');
		$("#goalGpa").val('');
	});
});