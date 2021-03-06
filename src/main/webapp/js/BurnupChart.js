var planColor = configuration.planColor;
var traceColor = configuration.traceColor;
var forecastColor = configuration.forecastColor;
var warnColor = configuration.warnColor;
var coordinateColor = configuration.coordinateColor;
var gridLineColor = configuration.gridLineColor;
var scaleLine = configuration.scaleLine;
var hotRegion = configuration.hotRegionColor;
var getBurnupChart = function(canvas){
	var ctx = canvas.getContext("2d");
	var bigLength = ctx.measureText("2013-07-19").width;
	var midLength = ctx.measureText("13-07-19").width;
	var smallLength = ctx.measureText("07-19").width;
	var leftx = 35;
	var topy = 15;
	var rightx = canvas.width-35;
	var bottomy = canvas.height-25;
	
	var offsetx = 0;
	var zoom = 1;
	
	ctx.font = configuration.scaleFont;
	var getZoomLeftx = function(){
		return leftx-offsetx;
	};
	var getZoomRightx = function(){
		return (rightx-leftx)*zoom+getZoomLeftx();
	};
	
	var drawCoordinate = function(){
		ctx.lineWidth = 2;
		ctx.strokeStyle = coordinateColor;
		ctx.beginPath();
		ctx.moveTo(leftx,bottomy);
		ctx.lineTo(rightx,bottomy);
		ctx.moveTo(rightx-8,bottomy-4);
		ctx.lineTo(rightx,bottomy);
		ctx.lineTo(rightx-8,bottomy+4);
		
		ctx.moveTo(leftx,bottomy);
		ctx.lineTo(leftx,topy);
		ctx.moveTo(leftx-4,topy+8);
		ctx.lineTo(leftx,topy);
		ctx.lineTo(leftx+4,topy+8);
		ctx.stroke();
		ctx.closePath();
		
	};	
	
	var drawScale = function(data){
		var rate = (bottomy-topy)/data.getTotalPoints();
		var scaleLen = (getZoomRightx()-getZoomLeftx()-20)/data.countTraceNumber();
		var step = getZoomLeftx()+scaleLen;
		var allTrace =data.getAllTrace(); 
		
		for(var i=0;i<allTrace.length; i++){
			allTrace[i].position = step;
			step=step+scaleLen;
			if(allTrace[i].position<leftx||allTrace[i].position>(rightx-10)) continue;
			ctx.strokeStyle = coordinateColor;
			ctx.beginPath();
			ctx.moveTo(allTrace[i].position,bottomy-7);
			ctx.lineTo(allTrace[i].position,bottomy);
			ctx.stroke();
			ctx.closePath();
			
			ctx.strokeStyle = gridLineColor;
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.moveTo(allTrace[i].position,bottomy-8);
			ctx.lineTo(allTrace[i].position,topy);
			ctx.stroke();
			ctx.closePath();
			
			if(allTrace[i].begin==true||smallLength>(scaleLen-10) || allTrace[i].end==true) continue;
			var date = formatDisplayScaleDate(allTrace[i].date,smallLength,midLength,bigLength,scaleLen);
			ctx.fillStyle = configuration.planColor;
			ctx.fillText(date, allTrace[i].position-ctx.measureText(date).width/2, bottomy+15);
			
    	ctx.beginPath();
			ctx.closePath();
		}
	}
	var dataGap = 0;
	var formatDisplayScaleDate = function(date,smallSize,midSize,bigSize,scaleSize){
		if(bigSize<scaleSize-dataGap) {
			return date;
		}
		if(midSize<scaleSize-dataGap) return date.substr(2,midSize);
		if(smallSize<scaleSize-dataGap) return date.substr(5,smallSize);
	}
	
	var drawPlanLine = function(data){
		var rate = (bottomy-topy)/data.getTotalPoints();
		var totalPoints=data.versions[0].remainPoints;
			for(var i=0; i<data.versions.length; i++){
				ctx.strokeStyle = planColor;
				ctx.lineWidth = 2;
				ctx.beginPath();
				if(i==0){
					 ctx.moveTo(getZoomLeftx(),bottomy)
				}
				else{
					ctx.moveTo(data.versions[i-1].trace[data.versions[i-1].trace.length-1].position,bottomy-totalPoints*rate);
				}
				totalPoints = totalPoints+data.versions[i].planPoints;
				var endX = data.versions[i].trace[data.versions[i].trace.length-1].position;
				var endY = bottomy-totalPoints*rate;
				ctx.lineTo(endX,endY);
				ctx.stroke();
				ctx.closePath();
			}
	};
	var formateDiplayVersionName = function(versionName,versionNumber,index){
		var result = versionName;
		if(index<(versionNumber/9) && versionNumber>20 && result.length>10) result=result.substr(0,8)+"...";
		if(index<parseInt(versionNumber/16) && versionNumber>20) result = "";
		return result;
	};
	var formateDisplayDate = function(date,displayNumber,index,isBeginDate){
  		var result = date;
  		if(index==0&&isBeginDate) return result;
  		if((index==displayNumber-1)&&(!isBeginDate)) return result;
  		if(displayNumber>8) {
  			result = result.substring(2,result.length);
   		}
  		if(displayNumber>16){
  			result = result.substring(3,result.length);
  		}
  		if(displayNumber>24&&index>0&&index<(displayNumber-1)) result = "";
  		if(index==0&&(!isBeginDate)) result = "";
  		if(index==(displayNumber-1) && isBeginDate) result = "";
  		return result;
	};
	var drawJointPoints = function(data){
		var rate = (bottomy-topy)/data.getTotalPoints();
		var totalPoints=data.versions[0].remainPoints;
		var versionNumber = data.versions.length;
		for(var i=0; i<data.versions.length; i++){
			var totalPoints = totalPoints+data.versions[i].planPoints;
			var beginX = data.versions[i].trace[0].position;
			var endX = data.versions[i].trace[data.versions[i].trace.length-1].position;
			var endY = bottomy-totalPoints*rate;
			ctx.lineWidth = 1;
			ctx.fillStyle = planColor;
			ctx.strokeStyle = scaleLine;
			ctx.beginPath();
			ctx.moveTo(leftx+3,endY);
			ctx.lineTo(endX,endY);
			ctx.lineTo(endX,bottomy);
			ctx.stroke();
			ctx.closePath();
			
  		ctx.beginPath();
  		ctx.arc(endX, endY, versionNumber<8?6:4, 0, Math.PI*2, false);
  		ctx.fill();
  		ctx.closePath();
  		
  		var beginDate =formateDisplayDate(data.versions[i].trace[0].date,versionNumber,i,true);
  		var endDate = formateDisplayDate(data.versions[i].trace[data.versions[i].trace.length-1].date,versionNumber,i,false);
  	 	ctx.fillText(beginDate, beginX-ctx.measureText(beginDate).width/2, bottomy+15);
    	ctx.fillText(endDate, endX-ctx.measureText(beginDate).width-2, bottomy-8);
    	ctx.fillText(totalPoints,leftx-ctx.measureText(totalPoints).width-5,endY-2);
    	var versionName = formateDiplayVersionName(data.versions[i].versionName,versionNumber,i);
    	ctx.fillText(versionName,endX-ctx.measureText(versionName).width-10,endY-2);
		}
	};
	var drawTrend = function(data){
		
		ctx.lineWidth = 1;
		var rate = (bottomy-topy)/data.getTotalPoints();
		var forecastPoints = data.getTotalDonePoints()*(data.countTraceNumber()/data.countValidTraceNumber());
		if(forecastPoints>=data.getTotalPoints()){
			ctx.strokeStyle = forecastColor;
			ctx.fillStyle=forecastColor;
		}
		else{
			ctx.strokeStyle = warnColor;
			ctx.fillStyle=warnColor;
		}
		ctx.beginPath();
		ctx.moveTo(getZoomLeftx(),bottomy);
		var lastVersion = data.versions[data.versions.length-1];
		var lastX =lastVersion.trace[lastVersion.trace.length-1].position;
		var lastY = bottomy-rate*forecastPoints; 
		ctx.lineTo(lastX,lastY);
		ctx.stroke();
		if(forecastPoints>=data.getTotalPoints()){
			ctx.fillText(parseInt(forecastPoints),rightx-17,topy-5);
		}else{
			ctx.fillText(parseInt(forecastPoints),lastX+5,lastY);
		}
		ctx.closePath();
	};
	var formateTracePointInfo = function(pointInfo,versionNumber,y){
		var result = pointInfo;
		if(versionNumber>=30) result = result.split("(")[0];
		if(y>(bottomy-15)) result = "";
		return result;
	};
	var drawVersionSummary = function(version,x,y){
		var width = 230;
		var height = 150;
		var startY = y;
		var startX = x;
		if(startX>rightx-width-10) startX = x-width;
		if(startY>bottomy-height-10) startY = y-height;
		ctx.strokeStyle = gridLineColor;
		ctx.lineWidth = 1;
		ctx.fillStyle = configuration.backColor;
		ctx.beginPath();
		ctx.rect(startX,startY,width,height);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
		ctx.fillStyle = planColor;
		ctx.font = configuration.versionTipFont;
		ctx.fillText(globalization.version+version.versionName,startX+10,startY+15);
		ctx.fillText(globalization.planPoints+version.planPoints,startX+10,startY+35);
		ctx.fillText(globalization.remainPoints+version.remainPoints,startX+10,startY+55);
		ctx.fillText(globalization.totalPoints+(parseInt(version.remainPoints)+parseInt(version.planPoints)),startX+10,startY+75);
		ctx.fillText(globalization.finishedPoints+version.finishedPoints,startX+10,startY+95);
		ctx.fillText(globalization.beginDate+version.trace[0].date,startX+10,startY+115);
		ctx.fillText(globalization.endDate+version.trace[version.trace.length-1].date,startX+10,startY+135);
		ctx.font = "9pt Arial Narrow";
	};
	var selectedVersion = null;
	var drawVersionHotRegion = function(data,x,y){
		var scaleLen = (rightx-leftx-20)/data.countTraceNumber();
		var cursor = leftx;
		if(data.versions.length==1){
			drawVersionSummary(data.versions[0],65,150);
			selectedVersion = null;
			return;
		}
		for(var i=0; i<data.versions.length; i++){
			var nextCursor = cursor+scaleLen*data.versions[i].trace.length;
			if(x<cursor || x>nextCursor ||y<topy||y>bottomy){
				cursor = nextCursor;
				continue;
			}
			selectedVersion = data.versions[i];
			ctx.globalAlpha = 0.2;
			ctx.fillStyle = hotRegion;
			ctx.strokeStyle = hotRegion;
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.rect(cursor+2,topy+2,scaleLen*data.versions[i].trace.length-2,bottomy-topy-4);
			ctx.fill();
			ctx.globalAlpha = 1;
			ctx.stroke();
			ctx.closePath();
			drawVersionSummary(data.versions[i],65,150);
			break;
		}
	};
	var drawTrace = function(data){
		ctx.strokeStyle = traceColor;
		ctx.lineWidth = 2;
		ctx.fillStyle = traceColor;
		ctx.beginPath();
		ctx.moveTo(leftx,bottomy);
		var allTrace =data.getAllTrace(); 
		var rate = (bottomy-topy)/data.getTotalPoints();
		var totalPoints = 0;
		var lastTotal = 0;
		var lastPosition = 0;
		var versionNumber = data.versions.length;
		for(var i=0; i<allTrace.length; i++){
			var trace = allTrace[i];
			if(trace.points==-1) {
					continue;
			}
			totalPoints = totalPoints+trace.points;
			ctx.lineTo(trace.position,bottomy-totalPoints*rate);
			if(smallLength<allTrace[1].position-allTrace[0].position-dataGap){
				ctx.fillText(trace.points,trace.position-10,bottomy-totalPoints*rate-10);
			}
			lastPosition = trace.position;
			if(trace.end==true){
				var y = bottomy-totalPoints*rate+15;
				var pointInfo = formateTracePointInfo(totalPoints+" ("+(totalPoints-lastTotal)+")",versionNumber,y);
				ctx.fillText(pointInfo,trace.position,y);
				lastTotal = totalPoints;
				ctx.fillRect(trace.position-3,bottomy-totalPoints*rate-3,6,6);
			}
		}
		ctx.stroke();
		ctx.closePath();
	};
	var drawTip = function(){
		var x = leftx+30;
		var y = topy+30;
		var width = 200;
		var height = 100;
		
		ctx.strokeStyle = gridLineColor;
		ctx.lineWidth = 1;
		ctx.fillStyle="white";
		ctx.beginPath();
		//ctx.fillRect(x,y,width,height);
		ctx.rect(x,y,width,height);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
		
		ctx.strokeStyle = planColor;
		ctx.fillStyle = planColor;
		ctx.beginPath();
		ctx.moveTo(x+10,y+10);
		ctx.lineTo(x+60,y+10);
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.fillText("Plan",x+65,y+15);
		ctx.closePath();

		ctx.strokeStyle = traceColor;
		ctx.fillStyle = traceColor;
		ctx.beginPath();
		ctx.moveTo(x+10,y+30);
		ctx.lineTo(x+60,y+30);
		ctx.stroke();
		ctx.fillText("Actual Progress",x+65,y+35);
		ctx.closePath();		
		
		ctx.strokeStyle = forecastColor;
		ctx.fillStyle = forecastColor;
		ctx.beginPath();
		ctx.moveTo(x+10,y+50);
		ctx.lineTo(x+60,y+50);
		ctx.stroke();
		ctx.fillText("Forecast +",x+65,y+55);
		ctx.closePath();		
		
		ctx.strokeStyle = warnColor;
		ctx.fillStyle = warnColor;
		ctx.beginPath();
		ctx.moveTo(x+10,y+70);
		ctx.lineTo(x+60,y+70);
		ctx.stroke();
		ctx.fillText("Forecast -",x+65,y+75);
		ctx.closePath();		
	};
	return {
		draw: function(data,x,y){
			x=x-6;
			ctx.clearRect(0,0,canvas.width,canvas.height);
			drawScale(data);
			drawPlanLine(data);
			drawJointPoints(data);
			drawTrend(data);
			drawTrace(data);
			drawCoordinate();
			drawVersionHotRegion(data,x,y);
			drawTip();
		},
		getZoom:function(){return zoom;},
		zoom: function(data,x,y){
			if(data.versions.length!=1) return;
			if(zoom==1){
				zoom = 2;
				offsetx = offsetx+x;
			}else{
				zoom=1;
				offsetx=0;
			}
			this.draw(data,x,y);
		},
		move:function(data,offset,x,y){
			if(data.versions.length!=1 || zoom==1) return;
			offsetx = offsetx+offset;
			if(getZoomLeftx()>leftx) offsetx=0;
			if(getZoomRightx()<rightx) offsetx = getZoomRightx()-getZoomLeftx()-(rightx-leftx);
			this.draw(data,x,y);
		},
		getMouseOnVersion:function(){return selectedVersion;}
	};
};