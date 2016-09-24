var $adminSponsor = {
	 tablename:'sponsor',
	 $giid :null,
	 $taskDialog:null,
	 $formValid:null,
	 defaultimg:"",
	 objdata : function(){
	 	 return $pageEntity.getColumns($adminSponsor.tablename);
	},
	init : function(){
				  $(document).on('click.bs.modal.data-api', '.btn-dlg-teams', function (event) {
				  		$adminSponsor.dialogShow();
            return false;
        });
				$adminSponsor.defaultimg =  $globalKudo.rootpath+"images/defaults/no-image.jpg";
	 },
	 loadData:function(){
	 		        var data = {	table: $adminSponsor.tablename, 
								    	objdata : $adminSponsor.objdata(),
								    	where :"where Active = 'Y'"
					    			};
				  data.method = "get";	    			

 			var authorize = true;
			 $adminSponsor.$grid = new Grid({
           // TableId: "tblRoleListTask",
            // TableDataId: "tblRoleListDataTask",
            DivSelector: "#gridMainSponsor",
            DivDataSelector: "#gridMainTempSponsor",
            SourceUrl: $globalKudo.apipath,
            Data : data,
            Sorting: { sort: false, excepts: ["records_no", "action"] },
            Searching: false,
            PerPage:5,
            fnRowDisplayFormat: function (html, data) {
                return html.format(
                		data.Id,
                		data.RecordNo,
                    data.Name,
                    (data.Details!=null)?data.Details:"",
                    (data.Picture!=null)?$globalKudo.rootpath+data.Picture:$adminSponsor.defaultimg 
                    );
            },
            fnRowElementsAction: [{
                name: ".btn-delete",
                callback: $adminSponsor.deleteTeams,
                authorize:authorize
            },
            {
                name: ".btn-assign",
                callback: $adminSponsor.dialogShow,
                authorize: authorize
            },
            {
                name: ".btn-view",
                callback: $adminSponsor.dialogShow,
                authorize: authorize
            }],
            fnRowCreated: function ($html, data) {
               /* if (data.Id == 1) {
                    $html.find('.btn').remove();
                }*/

                return $html;
            },
        });
				$adminSponsor.$grid.Bind();
	 },
	 dialogShow:function ($row, id){

	 			   	
            $adminSponsor.$taskDialog = $dialogFirst.init('#newSponsorTmp');
            $adminSponsor.$formValid = $adminSponsor.$taskDialog.find("#newSponsorForms");
            $adminSponsor.$formValid.validate({
		            rules: {
		                TeamsName: {
		                    required: true
		                },
		                SponsorOrder: {
		                    number: true
		                }
		            },
		            messages: {
		                TeamsName: {
		                    required: "required",
		                },
		                SponsorOrder: {
		                    number: "Number Only",
		                }
		            }
		        });
            $adminSponsor.$taskDialog.find('#files').on('change',function(evt){

			 								$fnglobal.handleFileSelect(evt,$adminSponsor.$taskDialog.find('#list'));
			 					return false;
			 					});
            $adminSponsor.$taskDialog.find(".btn-close").hide();
              $spinner.show();	
            if(id){


            	var tracking = $(this.name).attr("tracking");
            	if(tracking == "V"){
            			$adminSponsor.$taskDialog.find("#files").hide(); 
            			$adminSponsor.$taskDialog.find(".btn-save").hide();
            			$adminSponsor.$taskDialog.find(".btn-cancel").hide();
            			$adminSponsor.$taskDialog.find(".btn-close").show();
            			$adminSponsor.$taskDialog.find('input[name=TeamsName]').prop('readonly', true);	
				 					$adminSponsor.$taskDialog.find('textarea[name=TeamsDetails]').prop('readonly', true);
				 					$adminSponsor.$taskDialog.find('input[name=SponsorOrder]').prop('readonly', true);
            	}else{
            		 $adminSponsor.$taskDialog.find(".btn-save").click(function(){
            		 				$adminSponsor.onSubmitUpdateTeams(id);
            		 });
            	}
            		var attno = $adminSponsor.objdata();
	 									attno.value = id;
				 					var objgetdata = {	table: $adminSponsor.tablename, 
											    					objdata: attno
											    				};
				 					$pageEntity.GetData($globalKudo.apipath,objgetdata,function(data){
				 									
				 												var jsonobj = JSON.parse(data.data);
				 												//alert(jsonobj[0].Name);
				 												 $adminSponsor.$taskDialog.find('input[name=TeamsName]').val(jsonobj[0].Name);	
				 												 $adminSponsor.$taskDialog.find('textarea[name=TeamsDetails]').html(jsonobj[0].Details);	
				 												 $adminSponsor.$taskDialog.find('input[name=SponsorOrder]').val(jsonobj[0].OrderNo);	
           			 								var span = document.createElement('span');
           			 								if(jsonobj[0].Picture){
												          span.innerHTML = ['<img class="kudo-thumb" src="', $globalKudo.rootpath+jsonobj[0].Picture,
												                            '"', '"/>'].join('');
												          $adminSponsor.$taskDialog.find('#list').append(span);
												        }
				 												//$("input[name = ACCTNAME]").val(jsonobj[0].acct_name);
				 											  // $("input[name = ACCTLEVEL]").val(jsonobj[0].acct_level);	

				 											  $spinner.hide();		
           			 								$adminSponsor.$taskDialog.show();
				 					});
            }	else{


	             	$adminSponsor.$taskDialog.find(".btn-save").click($adminSponsor.onSubmitNewTeams);
            		 $spinner.hide();		
           			 $adminSponsor.$taskDialog.show();
            }



	 },
	deleteTeams: function ($row, id) {
        var params = { id: id };
        $alert.confirmDelete($adminSponsor.onSubmitDeleteTeams, params);
   },
   onSubmitDeleteTeams:function(params){
   		if(params.id){
   			 			var attno = $adminSponsor.objdata();
	 								attno.value = params.id;
		 						var savedata = {	table: $adminSponsor.tablename, 
									    						objdata: attno
						    					};

								    //Logic to delete the item
							$pageEntity.DeleteData($globalKudo.apipath,savedata,function(){
										$adminSponsor.$grid.Bind();	

							});

	 				}		
   		return false;
   },
   onSubmitNewTeams:function(){
   		$adminSponsor.addToDatabase();
   		return false;
   },
   onSubmitUpdateTeams:function(id){
   		$adminSponsor.addToDatabase(id);
   		return false;
   },
   addToDatabase:function(itemid){
   		if( $adminSponsor.$formValid.valid()){
   						var file_data = $adminSponsor.$taskDialog.find('#files').prop('files')[0];   
   						var teamsname = 	$adminSponsor.$taskDialog.find('input[name=TeamsName]').val();
					    var teamsdetails = $adminSponsor.$taskDialog.find('textarea[name=TeamsDetails]').html();
					    var sponsorOrder = $adminSponsor.$taskDialog.find('input[name=SponsorOrder]').val();
   					 	var attno = $adminSponsor.objdata();
	 								attno.Name = teamsname;
	 								attno.Details = teamsdetails;
	 								if(parseInt(sponsorOrder) > 0){
	 									attno.OrderNo = sponsorOrder;
	 								}

	 						if(itemid){
	 										attno.value = itemid;
	 								}	

	 						 	var savedata = {	table: $adminSponsor.tablename, 
												    					objdata: attno
									    					};				

   					 	if(file_data){
					    var form_data = new FormData();                  
					    		form_data.append('file', file_data);
	

	 						$fnglobal.uploadFile(form_data,"Sponsors/",function(path){

	 								savedata.objdata.Picture = path;	
									
									$adminSponsor.InserUpdate(itemid,savedata);		

	 						});
						}
						else{
								$adminSponsor.InserUpdate(itemid,savedata);
	 								
						}
		   	
		   	}
   },
   InserUpdate:function(id,data){
   			if(id){
	 										$pageEntity.EditData($globalKudo.apipath,data,function(msg){
									 				$adminSponsor.$grid.Bind();	
									 				$adminSponsor.$taskDialog.hide();
									 });  
	 								}
	 								else{
					 		
									 $pageEntity.InsertData($globalKudo.apipath,data,function(msg){
									 				$adminSponsor.$grid.Bind();	
									 				$adminSponsor.$taskDialog.hide();
									 });  
			 }
   }
	
};