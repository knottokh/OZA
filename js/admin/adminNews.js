var $adminNews = {
	 tablename:'news',
	 $giid :null,
	 $taskDialog:null,
	 $formValid:null,
	  defaultimg:"",
	 objdata : function(){
	 	 return $pageEntity.getColumns($adminNews.tablename);
	},
	init : function(){
				  $(document).on('click.bs.modal.data-api', '.btn-dlg-news', function (event) {
				  		$adminNews.dialogShow();
            return false;
        });
			$adminNews.defaultimg =  $globalKudo.rootpath+"images/defaults/no-image.jpg";
	 },
	 loadData:function(){
	 		        var data = {	table: $adminNews.tablename, 
								    	objdata : $adminNews.objdata(),
								    	where :"where Active = 'Y'"
					    			};
				  data.method = "get";	    			

 			var authorize = true;
			 $adminNews.$grid = new Grid({
           // TableId: "tblRoleListTask",
            // TableDataId: "tblRoleListDataTask",
            DivSelector: "#gridMainNews",
            DivDataSelector: "#gridMainTempNews",
            SourceUrl: $globalKudo.apipath,
            Data : data,
            Sorting: { sort: false, excepts: ["records_no", "action"] },
            Searching: false,
            PerPage:5,
            fnRowDisplayFormat: function (html, data) {
                return html.format(
                		data.Id,
                		data.RecordNo,
                    data.Title,
                    data.Created
                    );
            },
            fnRowElementsAction: [{
                name: ".btn-delete",
                callback: $adminNews.deleteTeams,
                authorize:authorize
            },
            {
                name: ".btn-assign",
                callback: $adminNews.dialogShow,
                authorize: authorize
            },
            {
                name: ".btn-view",
                callback: $adminNews.dialogShow,
                authorize: authorize
            }],
            fnRowCreated: function ($html, data) {
               /* if (data.Id == 1) {
                    $html.find('.btn').remove();
                }*/

                return $html;
            },
        });
				$adminNews.$grid.Bind();
	 },
	 dialogShow:function ($row, id){

	 			   	
            $adminNews.$taskDialog = $dialogFirst.init('#newNewsTmp');
            $adminNews.$formValid = $adminNews.$taskDialog.find("#newNewsForms");
            $adminNews.$formValid.validate({
		            rules: {
		                NewsTitle: {
		                    required: true
		                },
		                newsBody:{
		                	required:true	
		                },
		                newsRollup:{
		                	required:true	
		                },
		            },
		            messages: {
		                NewsTitle: {
		                    required: "required",
		                },
		                newsBody: {
		                    required: "required",
		                },
		                newsRollup: {
		                    required: "required",
		                },
		            }
		        });
            $adminNews.$taskDialog.find('#files').on('change',function(evt){

			 								$fnglobal.handleFileSelect(evt,$adminNews.$taskDialog.find('#list'),false,function(){
			 									$adminNews.$taskDialog.find('input[name=newsRollup]').val("have");
			 									$adminNews.$taskDialog.find('.error[for=newsRollup]').hide();
			 									// $adminNews.$taskDialog.find(".btn-save").click();
			 								});
			 					return false;
			 					});
            $adminNews.$taskDialog.find(".btn-close").hide();
              $spinner.show();	
            if(id){


            	var tracking = $(this.name).attr("tracking");
            	if(tracking == "V"){
            			$adminNews.$taskDialog.find("#files").hide(); 
            			$adminNews.$taskDialog.find(".btn-save").hide();
            			$adminNews.$taskDialog.find(".btn-cancel").hide();
            			$adminNews.$taskDialog.find(".btn-close").show();
            			$adminNews.$taskDialog.find('input[name=NewsTitle]').prop('readonly', true);	
				 												 $adminNews.$taskDialog.find('textarea[name=newsBody]').prop('readonly', true);
            	}else{
            		 $adminNews.$taskDialog.find(".btn-save").click(function(){
            		 				$adminNews.onSubmitUpdateTeams(id);
            		 });
            	}
            		var attno = $adminNews.objdata();
	 									attno.value = id;
				 					var objgetdata = {	table: $adminNews.tablename, 
											    					objdata: attno
											    				};
				 					$pageEntity.GetData($globalKudo.apipath,objgetdata,function(data){
				 									
				 												var jsonobj = JSON.parse(data.data);
				 												//alert(jsonobj[0].Name);
				 												 $adminNews.$taskDialog.find('input[name=NewsTitle]').val(jsonobj[0].Title);	
				 												 $adminNews.$taskDialog.find('textarea[name=newsBody]').html(jsonobj[0].Body);	
           			 								var span = document.createElement('span');
           			 								if(jsonobj[0].Image){
												          span.innerHTML = ['<img class="kudo-thumb" src="',jsonobj[0].Image,
												                            '"', '"/>'].join('');
												          $adminNews.$taskDialog.find('#list').append(span);
												        }
				 												//$("input[name = ACCTNAME]").val(jsonobj[0].acct_name);
				 											  // $("input[name = ACCTLEVEL]").val(jsonobj[0].acct_level);	

				 											  $spinner.hide();		
           			 								$adminNews.$taskDialog.show();
				 					});
            }	else{


	             	$adminNews.$taskDialog.find(".btn-save").click($adminNews.onSubmitNewTeams);
            		 $spinner.hide();		
           			 $adminNews.$taskDialog.show();
            }



	 },
	deleteTeams: function ($row, id) {
        var params = { id: id };
        $alert.confirmDelete($adminNews.onSubmitDeleteTeams, params);
   },
   onSubmitDeleteTeams:function(params){
   		if(params.id){
   			 			var attno = $adminNews.objdata();
	 								attno.value = params.id;
		 						var savedata = {	table: $adminNews.tablename, 
									    						objdata: attno
						    					};

								    //Logic to delete the item
							$pageEntity.DeleteData($globalKudo.apipath,savedata,function(){
										$adminNews.$grid.Bind();	

							});

	 				}		
   		return false;
   },
   onSubmitNewTeams:function(){
   		$adminNews.addToDatabase();
   		return false;
   },
   onSubmitUpdateTeams:function(id){
   		$adminNews.addToDatabase(id);
   		return false;
   },
   addToDatabase:function(itemid){
   			 
   		//	$adminNews.$taskDialog.find('.error[for=newsRollup]').hide().text('');
   		if( $adminNews.$formValid.valid()){
   						var file_data = $adminNews.$taskDialog.find('#files').prop('files')[0];  
   							var newstitle = 	$adminNews.$taskDialog.find('input[name=NewsTitle]').val();
					    var newsdetails = $adminNews.$taskDialog.find('textarea[name=newsBody]').html();
   					 	var attno = $adminNews.objdata();
	 								attno.Title = newstitle;
	 								attno.Body = newsdetails;

	 						if(itemid){
	 										attno.value = itemid;
	 								}	

	 						 	var savedata = {	table: $adminNews.tablename, 
												    					objdata: attno
									    					};				

   					 	if(file_data){
					    var form_data = new FormData();                  
					    		form_data.append('file', file_data);
	

	 						$fnglobal.uploadFile(form_data,"news/",function(path){

	 								savedata.objdata.Image = path;	
									
									$adminNews.InserUpdate(itemid,savedata);		

	 						});
						}
						else{
								$adminNews.InserUpdate(itemid,savedata);
	 								
						}
		   	
		   	}
   },
   InserUpdate:function(id,data){
   			if(id){
	 										$pageEntity.EditData($globalKudo.apipath,data,function(msg){
									 				$adminNews.$grid.Bind();	
									 				$adminNews.$taskDialog.hide();
									 });  
	 								}
	 								else{
					 		
									 $pageEntity.InsertData($globalKudo.apipath,data,function(msg){
									 				$adminNews.$grid.Bind();	
									 				$adminNews.$taskDialog.hide();
									 });  
			 }
   }
	
};
