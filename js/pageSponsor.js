var $pageSponsor = {
	 tablename:'sponsor',
	 objdata : function(){
	 	 return $pageEntity.getColumns($pageSponsor.tablename);
	},
	 init : function(){
	 			
	 			  var data = {	table: $pageSponsor.tablename, 
								    	objdata : $pageSponsor.objdata(),
								    	where :"where Active = 'Y'"
					    			};
					$pageEntity.GetData($globalKudo.apipath,data,function(data){
									$(".home-sponsor").empty();
									var jsonobj = JSON.parse(data.data);
									var spon= "";
									for(var i=0;i<jsonobj.length;i++){
										var d=jsonobj[i];
										spon+= $(".sponsortmp").clone().html().format(
													d.Name,
													d.Picture
											);
									}
									$(".home-sponsor").append(spon);
					});			

	}
	
};