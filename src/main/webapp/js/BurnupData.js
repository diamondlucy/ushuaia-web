var getBurnupData = function(dataProvider){
	var data = {};
	data.versions=[];
	
	data.countTraceNumber = function(){
		var counter = 0;
		for(var i=0;i<data.versions.length; i++){
			counter = counter+data.versions[i].trace.length;
		}
		return counter;
	};
	data.getAllTrace = function(){
		var all =[];
		for(var i=0;i<data.versions.length; i++){
			all=all.concat(data.versions[i].trace);
		}
		return all;
	};
	data.countValidTraceNumber = function(){
		var counter = 0;
		var allTrace = this.getAllTrace();
		for(var i=0;i<allTrace.length; i++){
			if(allTrace[i].points==-1)continue;
			counter = counter+1;
		}
		return counter;
	}
	data.getTotalDonePoints = function(){
		var total =0;
		var allTrace = this.getAllTrace();
		for(var i=0;i<allTrace.length; i++){
			if(allTrace[i].points==-1) continue;
			total = total+allTrace[i].points;
		}
		return total;
	};
	data.getTotalPoints = function(){
		var total =0;
		for(var i=0;i<data.versions.length; i++){
			total = total+data.versions[i].planPoints;
		}
		return total+data.versions[0].remainPoints;
	}
	var moreBurnupData = function(){
		var release = dataProvider.get(data.versions.length);
		if(release!=null){
			var endIndex = release.trace.length-1;
			var points = 0;
			while(release.trace[endIndex].points==-1 && endIndex>=0){
				endIndex = endIndex-1;
			}
			release.trace[endIndex].end = true;
			release.trace[0].begin = true;
			
			for(var i=0; i<release.trace.length; i++){
				if(release.trace[i].points==-1) break;
				points = points+release.trace[i].points;
			}
			release.finishedPoints = points;
			
			data.versions.unshift(release);
		}
		return data;
	};
	var lessBurnupData = function(){
		if(data.versions.length>1){
			data.versions.shift();
		}
		return data;
	};
	
	
	return {
		more: moreBurnupData,
		less: lessBurnupData,
		getData:function(){return data;}
	}
};