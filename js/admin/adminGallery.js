var $adminGallery = {
	 tablename:'gallery',
	 $giid :null,
	 $taskDialog:null,
	 $formValid:null,
	  defaultimg:"",
	 objdata : function(){
	 	 return $pageEntity.getColumns($adminGallery.tablename);
	},
	init : function(){
				  $(document).on('click.bs.modal.data-api', '.btn-dlg-gallery', function (event) {
				  		$adminGallery.dialogShow();
            return false;
        });
			$adminGallery.defaultimg =  $globalKudo.rootpath+"images/defaults/no-image.jpg";
	 },
	 loadData:function(){
	 		        var data = {	table: $adminGallery.tablename, 
								    	objdata : $adminGallery.objdata(),
								    	where :"where Active = 'Y'"
					    			};
				  data.method = "get";	    			

 			var authorize = true;
			 $adminGallery.$grid = new Grid({
           // TableId: "tblRoleListTask",
            // TableDataId: "tblRoleListDataTask",
            DivSelector: "#gridMainGallery",
            DivDataSelector: "#gridMainTempGallery",
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
                    (data.Details!=null)?data.Details:"",
                    (data.Picture!=null)?$globalKudo.rootpath+data.Picture:$adminGallery.defaultimg,
                    data.ActivityDate
                    );
            },
            fnRowElementsAction: [{
                name: ".btn-delete",
                callback: $adminGallery.deleteTeams,
                authorize:authorize
            },
            {
                name: ".btn-assign",
                callback: $adminGallery.dialogShow,
                authorize: authorize
            },
            {
                name: ".btn-view",
                callback: $adminGallery.dialogShow,
                authorize: authorize
            }],
            fnRowCreated: function ($html, data) {
               /* if (data.Id == 1) {
                    $html.find('.btn').remove();
                }*/

                return $html;
            },
        });
				$adminGallery.$grid.Bind();
	 },
	 	ActivityDateCalendar:function(){
		//	$adminMatches.$taskDialog.find('#datetimepicker1').datetimepicker();
		 $adminGallery.$taskDialog.find('#ActivityDateInput').datetimepicker({
		                    locale: 'th',
		                  //  sideBySide:true,
		                    widgetPositioning: {
									            horizontal: 'auto',
									            vertical: 'bottom'
									        }
		                  //  widgetParent:".wiget-calendar-div"
		                });
		},
	 dialogShow:function ($row, id){

	 			   	
            $adminGallery.$taskDialog = $dialogFirst.init('#newGalleryTmp');
            $adminGallery.$formValid = $adminGallery.$taskDialog.find("#newGalleryForms");
            $adminGallery.$formValid.validate({
		            rules: {
		                GalleryTitle: {
		                    required: true
		                },
		                ActivityDateInput: {
		                    required: true
		                }
		            },
		            messages: {
		                GalleryTitle: {
		                    required: "required"
		                },
		                 ActivityDateInput: {
		                    required: "required"
		                }
		            }
		        });
            $adminGallery.$taskDialog.find('#files').on('change',function(evt){

			 								$fnglobal.handleFileSelect(evt,$adminGallery.$taskDialog.find('#list'));
			 					return false;
			 					});
            $adminGallery.ActivityDateCalendar();
            $adminGallery.$taskDialog.find(".btn-close").hide();
              $spinner.show();	
            if(id){


            	var tracking = $(this.name).attr("tracking");
            	if(tracking == "V"){
            			$adminGallery.$taskDialog.find("#files").hide(); 
            			$adminGallery.$taskDialog.find(".btn-save").hide();
            			$adminGallery.$taskDialog.find(".btn-cancel").hide();
            			$adminGallery.$taskDialog.find(".btn-close").show();
            			$adminGallery.$taskDialog.find('input[name=GalleryTitle]').prop('readonly', true);	
				 					$adminGallery.$taskDialog.find('textarea[name=GalleryDetails]').prop('readonly', true);
				 					$adminGallery.$taskDialog.find('#ActivityDateInput > input').prop('readonly', true);
            	}else{
            		 $adminGallery.$taskDialog.find(".btn-save").click(function(){
            		 				$adminGallery.onSubmitUpdateTeams(id);
            		 });
            	}
            		var attno = $adminGallery.objdata();
	 									attno.value = id;
				 					var objgetdata = {	table: $adminGallery.tablename, 
											    					objdata: attno
											    				};
				 					$pageEntity.GetData($globalKudo.apipath,objgetdata,function(data){
				 									
				 												var jsonobj = JSON.parse(data.data)[0];
				 												//alert(jsonobj[0].Name);
				 												 $adminGallery.$taskDialog.find('input[name=GalleryTitle]').val(jsonobj.Title);	
				 												 $adminGallery.$taskDialog.find('textarea[name=GalleryDetails]').html(jsonobj.Details);
				 												 $adminGallery.$taskDialog.find('#ActivityDateInput').data('DateTimePicker').date($pageEntity.MysqlDatetoDate(jsonobj.ActivityDate));		
           			 								var span = document.createElement('span');
           			 								if(jsonobj.Picture){
												          span.innerHTML = ['<img class="kudo-thumb" src="',jsonobj.Picture,
												                            '"', '"/>'].join('');
												          $adminGallery.$taskDialog.find('#list').append(span);
																if(tracking == "V"){
												          $adminGallery.$taskDialog.find('#ActivityDateInput').data('DateTimePicker').destroy();
												        }
												        }
				 												//$("input[name = ACCTNAME]").val(jsonobj[0].acct_name);
				 											  // $("input[name = ACCTLEVEL]").val(jsonobj[0].acct_level);	

				 											  $spinner.hide();		
           			 								$adminGallery.$taskDialog.show();
				 					});
            }	else{


	             	$adminGallery.$taskDialog.find(".btn-save").click($adminGallery.onSubmitNewTeams);
            		 $spinner.hide();		
           			 $adminGallery.$taskDialog.show();
            }



	 },
	deleteTeams: function ($row, id) {
        var params = { id: id };
        $alert.confirmDelete($adminGallery.onSubmitDeleteTeams, params);
   },
   onSubmitDeleteTeams:function(params){
   		if(params.id){
   			 			var attno = $adminGallery.objdata();
	 								attno.value = params.id;
		 						var savedata = {	table: $adminGallery.tablename, 
									    						objdata: attno
						    					};

								    //Logic to delete the item
							$pageEntity.DeleteData($globalKudo.apipath,savedata,function(){
										$adminGallery.$grid.Bind();	

							});

	 				}		
   		return false;
   },
   onSubmitNewTeams:function(){
   		$adminGallery.addToDatabase();
   		return false;
   },
   onSubmitUpdateTeams:function(id){
   		$adminGallery.addToDatabase(id);
   		return false;
   },
   addToDatabase:function(itemid){
   		if( $adminGallery.$formValid.valid()){
   						var file_data = $adminGallery.$taskDialog.find('#files').prop('files')[0];   
   						var teamsname = 	$adminGallery.$taskDialog.find('input[name=GalleryTitle]').val();
					    var teamsdetails = $adminGallery.$taskDialog.find('textarea[name=GalleryDetails]').html();
					    var actdate = 	$adminGallery.$taskDialog.find('#ActivityDateInput').data('DateTimePicker').date();
   					 	var attno = $adminGallery.objdata();
	 								attno.Title = teamsname;
	 								attno.Details = teamsdetails;
	 								attno.ActivityDate = $pageEntity.dateFormate(new Date(actdate.toString()));

	 						if(itemid){
	 										attno.value = itemid;
	 								}	

	 						 	var savedata = {	table: $adminGallery.tablename, 
												    					objdata: attno
									    					};				

   					 	if(file_data){
					    var form_data = new FormData();                  
					    		form_data.append('file', file_data);
	

	 						$fnglobal.uploadFile(form_data,"teams/",function(path){

	 								savedata.objdata.Picture = path;	
									
									$adminGallery.InserUpdate(itemid,savedata);		

	 						});
						}
						else{
								$adminGallery.InserUpdate(itemid,savedata);
	 								
						}
		   	
		   	}
   },
   InserUpdate:function(id,data){
   			if(id){
	 										$pageEntity.EditData($globalKudo.apipath,data,function(msg){
									 				$adminGallery.$grid.Bind();	
									 				$adminGallery.$taskDialog.hide();
									 });  
	 								}
	 								else{
					 		
									 $pageEntity.InsertData($globalKudo.apipath,data,function(msg){
									 				$adminGallery.$grid.Bind();	
									 				$adminGallery.$taskDialog.hide();
									 });  
			 }
   }	
};
