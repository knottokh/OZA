var $pageMatch = {
	  tablename:'matches',
	  $giid :null,
	  $taskDialog:null,
	  $formValid:null,
	  defaultimg:"",
	 objdata : function(){
	 	 return $pageEntity.getColumns($pageMatch.tablename);
	},
	 init : function(){
	 	 $pageMatch.defaultimg =  $globalKudo.rootpath+"images/defaults/no-image.jpg";	
	 },
	 latestMatch:function(){
	 	       var dataatt =  $pageMatch.objdata();
	 	       dataatt.pageIndex = 0;
	 	       dataatt.pageSize  = 1;
	 			var objgetdata = {	table: $pageMatch.tablename, 
								    	objdata : dataatt,
								    	where :"LEFT JOIN teams as t1 on matches.TeamA = t1.Id "+
								    				 "LEFT JOIN teams as t2 on matches.TeamB = t2.Id "+
								    					"where matches.Active = 'Y' and matches.StartMatch <= '"+ $pageEntity.dateFormate(new Date())+"' order by matches.StartMatch desc",
								    	colselect :"matches.Id,matches.ScoreA,matches.ScoreB,matches.StartMatch"	+
								    							",t1.Name as TeamAName,t1.Picture as TeamAPicture"	+	
								    							",t2.Name as TeamBName,t2.Picture as TeamBPicture"
					  };
	 		$pageEntity.GetData($globalKudo.apipath,objgetdata,function(data){
				 		var jsonobj = JSON.parse(data.data);
				 		if(jsonobj.length > 0){
				 			var sdata = jsonobj[0];
				 			var scorematch = "<h1>"+sdata.ScoreA+":"+sdata.ScoreB+"</h1>"
				 			var devinside = $(".hommatchtmp").clone().html().format(
				 				"RESULT",
				 				sdata.StartMatch,
				 				$globalKudo.rootpath+sdata.TeamAPicture,
				 				sdata.TeamAName,
				 				scorematch,
				 				$globalKudo.rootpath+sdata.TeamBPicture,
				 				sdata.TeamBName
				 			);
				 			$(".right-latestmatch").append(devinside);
				 			$( window ).resize();
				 		}
				 	
				 									
			});
	 },
	 nextMatch:function(){
	 	       var dataatt =  $pageMatch.objdata();
	 	       dataatt.pageIndex = 0;
	 	       dataatt.pageSize  = 1;
	 			var objgetdata = {	table: $pageMatch.tablename, 
								    	objdata : dataatt,
								    	where :"LEFT JOIN teams as t1 on matches.TeamA = t1.Id "+
								    				 "LEFT JOIN teams as t2 on matches.TeamB = t2.Id "+
								    					"where matches.Active = 'Y' and matches.StartMatch > '"+ $pageEntity.dateFormate(new Date())+"' order by matches.StartMatch desc",
								    	colselect :"matches.Id,matches.ScoreA,matches.ScoreB,matches.StartMatch"	+
								    							",t1.Name as TeamAName,t1.Picture as TeamAPicture"	+	
								    							",t2.Name as TeamBName,t2.Picture as TeamBPicture"
					  };
	 		$pageEntity.GetData($globalKudo.apipath,objgetdata,function(data){
				 		var jsonobj = JSON.parse(data.data);
				 		if(jsonobj.length > 0){
				 			var sdata = jsonobj[0];
				 			var scorematch = "<h1>VS</h1>"
				 			var devinside = $(".hommatchtmp").clone().html().format(
				 				"NEXT MATCH",
				 				sdata.StartMatch,
				 				$globalKudo.rootpath+sdata.TeamAPicture,
				 				sdata.TeamAName,
				 				scorematch,
				 				$globalKudo.rootpath+sdata.TeamBPicture,
				 				sdata.TeamBName
				 			);
				 			$(".right-nextmatch").append(devinside);
				 			$( window ).resize();
				 		}
				 	
				 									
			});
	 }
	
};