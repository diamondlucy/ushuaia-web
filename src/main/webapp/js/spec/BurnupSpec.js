
describe("burnhup",function(){
	var burnupData;
	beforeEach(function() {
    	burnupData = getBurnupData(testCorrectProvider);//TODO: change to real provider service
  });
	describe("burnup data behavior check",function(){
		it("should have no versions object when new a burnupdata object",function(){
			expect(burnupData.getData().versions.length).toEqual(0);
		});
		it("should have one version object when request a new version data",function(){
			expect(burnupData.more().versions.length).toEqual(1);
		});
		it("should not load more data when request not exist version",function(){
			for(var i=0; i<10; i++)burnupData.more();
			expect(burnupData.getData().versions.length).toEqual(3);
		});
		it("should remove one version data when request less",function(){
			for(var i=0; i<10; i++)burnupData.more();
			expect(burnupData.less().versions.length).toEqual(2);
		});		
		it("should have correct finished points based on trace",function(){
			for(var i=0; i<=2; i++)burnupData.more();
			expect(burnupData.getData().versions[0].finishedPoints).toEqual(18);
			expect(burnupData.getData().versions[1].finishedPoints).toEqual(22);
			expect(burnupData.getData().versions[2].finishedPoints).toEqual(19);
			
			expect(burnupData.getData().versions[0].planPoints).toEqual(22);
			expect(burnupData.getData().versions[1].planPoints).toEqual(24);
			expect(burnupData.getData().versions[2].planPoints).toEqual(26);

			expect(burnupData.getData().versions[0].remainPoints).toEqual(0);
			expect(burnupData.getData().versions[1].remainPoints).toEqual(4);
			expect(burnupData.getData().versions[2].remainPoints).toEqual(6);
		});
	});
	describe("data validataion for dataProvider",function(){
		beforeEach(function() {
    	burnupData = getBurnupData(testCorrectProvider);//TODO: change to real provider service
  	});
  	it("should have correct remain points from previous release",function(){
  		burnupData.more();
  		while(true){
  			var v2 = burnupData.getData().versions[0];
  			var pData = burnupData.getData();
  			burnupData.more();
  			if(pData.versions.length==burnupData.getData().versions.length) break;
  			var v1 = burnupData.getData().versions[0];
  			var remain = v1.planPoints+v1.remainPoints- v1.finishedPoints;
  			expect(v2.remainPoints).toEqual(remain);
  		}
		});
	});
	describe("burnup data extension check",function(){
		it("extention method countTraceNumber test",function(){
			expect(burnupData.more().countTraceNumber()).toEqual(5);
			expect(burnupData.more().countTraceNumber()).toEqual(10);
			expect(burnupData.more().countTraceNumber()).toEqual(15);
		});
		it("extention method getAllTrace test",function(){
			expect(burnupData.more().getAllTrace().length).toEqual(5);
			expect(burnupData.more().getAllTrace().length).toEqual(10);
			expect(burnupData.more().getAllTrace().length).toEqual(15);
		});
		it("extention method countValidTraceNumber test",function(){
			expect(burnupData.more().countValidTraceNumber()).toEqual(3);
			expect(burnupData.more().countValidTraceNumber()).toEqual(8);
			expect(burnupData.more().countValidTraceNumber()).toEqual(13);
		});
		it("extention method getTotalDonePoints test",function(){
			expect(burnupData.more().getTotalDonePoints()).toEqual(19);
			expect(burnupData.more().getTotalDonePoints()).toEqual(41);
			expect(burnupData.more().getTotalDonePoints()).toEqual(59);
		});
		it("extention method getTotalPoints test",function(){
			expect(burnupData.more().getTotalPoints()).toEqual(32);
			expect(burnupData.more().getTotalPoints()).toEqual(54);
			expect(burnupData.more().getTotalPoints()).toEqual(72);
		});
	});
});