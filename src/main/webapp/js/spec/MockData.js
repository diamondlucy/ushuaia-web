var trace4 = [
	{
		date: "2013-07-01",
		points: 4
	},
	{
		date: "2013-07-02",
		points: 3
	},
	{
		date: "2013-07-03",
		points: 5
	},
	{
		date: "2013-07-04",
		points: 2
	},
	{
		date: "2013-07-05",
		points: 4
	}
];
var trace3 = [
	{
		date: "2013-07-08",
		points: 4
	},
	{
		date: "2013-07-09",
		points: 3
	},
	{
		date: "2013-07-10",
		points: 4
	},
	{
		date: "2013-07-11",
		points: 5
	},
	{
		date: "2013-07-12",
		points: 6
	}
];
var trace2 = [
	{
		date: "2013-07-15",
		points: 5
	},
	{
		date: "2013-07-16",
		points: 8
	},
	{
		date: "2013-07-17",
		points: 6
	},
	{
		date: "2013-07-18",
		points: -1
	},
	{
		date: "2013-07-19",
		points: -1
	}
];
var createVersionData = function(versionName,trace,planPoints,remainPoints){
		return {
			versionName:versionName,
			planPoints:planPoints,
			remainPoints:remainPoints,
			trace:trace
		}
	};
var data = [];
function addDays(date,days){ 
	var nd = new Date(date); 
	   nd = nd.valueOf(); 
	   nd = nd + days * 24 * 60 * 60 * 1000; 
	   nd = new Date(nd); 
	   //alert(nd.getFullYear() + "Äê" + (nd.getMonth() + 1) + "ÔÂ" + nd.getDate() + "ÈÕ"); 
	var y = nd.getFullYear(); 
	var m = nd.getMonth()+1; 
	var d = nd.getDate(); 
	if(m <= 9) m = "0"+m; 
	if(d <= 9) d = "0"+d; 
	var cdate = y+"-"+m+"-"+d; 
	return cdate; 
} 
var getRandomTrace = function(date,velocity){
	var result = [];
	for(var i=0; i<100; i++){
		result.push({
			date: addDays(date,i),
			points: parseInt(Math.random()*velocity)
		});
	}
	return result;
};
var getStableTrace = function(date,velocity){
	var result = [];
	for(var i=0; i<100; i++){
		result.push({
			date: addDays(date,i),
			points: velocity
		});
	}
	return result;
}
data.push(createVersionData("now",getRandomTrace("2013-09-20",6),240,10));
data.push(createVersionData("stable1",getRandomTrace("2013-09-20",4.9),230,10));
data.push(createVersionData("stable2",getRandomTrace("2013-09-20",4.5),200,10));
data.push(createVersionData("v1",trace3,20,0));
data.push(createVersionData("v2",getRandomTrace("2012-08-06",3.5),160,20));
data.push(createVersionData("v3",getRandomTrace("2012-01-01",4),150,0));
data.push(createVersionData("v4",getRandomTrace("2011-06-01",3),110,0));
data.push(createVersionData("v5",getRandomTrace("2011-06-01",2.8),90,0));
data.push(createVersionData("v6",getRandomTrace("2011-06-01",2.3),80,0));
data.push(createVersionData("v7",getRandomTrace("2011-06-01",2.6),70,0));
data.push(createVersionData("v8",getRandomTrace("2011-06-01",2.3),60,0));
data.push(createVersionData("v9",getRandomTrace("2011-06-01",2),60,0));
data.push(createVersionData("v10",getRandomTrace("2011-06-01",2.2),55,0));
data.push(createVersionData("v11",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v12",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v13",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v14",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v16",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v17",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v18",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v19",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v20",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v21: long version name",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v22: long version name",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v23: long version name",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v24: long version name",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v25: long version name",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v26: long version name",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v27: long version name",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v28: long version name",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v29: long version name",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v30: long version name",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v31: long version name",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v32: long version name",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v33: long version name",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v34: long version name",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v35: long version name",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v36: long version name",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v37: long version name",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v38: long version name",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v39: long version name",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v40: long version name",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v41: long version name",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v42: long version name",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v43: long version name",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v44: long version name",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v45: long version name",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v46: long version name",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v47: long version name",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v48: long version name",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v49: long version name",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v50: long version name",getRandomTrace("2011-06-01",1.8),50,0));
data.push(createVersionData("v51: long version name",getRandomTrace("2011-06-01",1.8),50,0));
var dataProvider = function(){
	return {
		get: function(index){
					return data[index];
				}
	}
}();
var testCorrectProvider = function(){
	var testData = [];
	testData.push(createVersionData("Current Version",trace2,26,6));
	testData.push(createVersionData("previous 1 version", trace3,24,4));
	testData.push(createVersionData("previous 2 version", trace4,22,0));
	return {
		get: function(index){
			return testData[index];
		}
	}
}();
var testWrongProvider = function(){
	var testData = [];
	testData.push(createVersionData("Current Version",trace2,26,10));
	testData.push(createVersionData("previous 1 version", trace3,24,5));
	testData.push(createVersionData("previous 2 version", trace4,22,0));
	return {
		get: function(index){
			return testData[index];
		}
	}
}();