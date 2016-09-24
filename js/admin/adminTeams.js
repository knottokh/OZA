var $adminTeams = {
	 tablename:'teams',
	 $giid :null,
	 $taskDialog:null,
	 $formValid:null,
	  defaultimg:"",
	 objdata : function(){
	 	 return $pageEntity.getColumns($adminTeams.tablename);
	},
	init : function(){
				  $(document).on('click.bs.modal.data-api', '.btn-dlg-teams', function (event) {
				  		$adminTeams.dialogShow();
            return false;
        });
			$adminTeams.defaultimg =  $globalKudo.rootpath+"images/defaults/no-image.jpg";
	 },
	 loadData:function(){
	 		        var data = {	table: $adminTeams.tablename, 
								    	objdata : $adminTeams.objdata(),
								    	where :"where Active = 'Y'"
					    			};
				  data.method = "get";	    			

 			var authorize = true;
			 $adminTeams.$grid = new Grid({
           // TableId: "tblRoleListTask",
            // TableDataId: "tblRoleListDataTask",
            DivSelector: "#gridMainTeam",
            DivDataSelector: "#gridMainTempTeam",
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
                    (data.Picture!=null)?data.Picture:$adminTeams.defaultimg
                    );
            },
            fnRowElementsAction: [{
                name: ".btn-delete",
                callback: $adminTeams.deleteTeams,
                authorize:authorize
            },
            {
                name: ".btn-assign",
                callback: $adminTeams.dialogShow,
                authorize: authorize
            },
            {
                name: ".btn-view",
                callback: $adminTeams.dialogShow,
                authorize: authorize
            }],
            fnRowCreated: function ($html, data) {
               /* if (data.Id == 1) {
                    $html.find('.btn').remove();
                }*/

                return $html;
            },
        });
				$adminTeams.$grid.Bind();
	 },
	 dialogShow:function ($row, id){

	 			   	
            $adminTeams.$taskDialog = $dialogFirst.init('#newTeamsTmp');
            $adminTeams.$formValid = $adminTeams.$taskDialog.find("#newTeamsForms");
            $adminTeams.$formValid.validate({
		            rules: {
		                TeamsName: {
		                    required: true
		                }
		            },
		            messages: {
		                TeamsName: {
		                    required: "required",
		                }
		            }
		        });
            $adminTeams.$taskDialog.find('#files').on('change',function(evt){

			 								$fnglobal.handleFileSelect(evt,$adminTeams.$taskDialog.find('#list'));
			 					return false;
			 					});
            $adminTeams.$taskDialog.find(".btn-close").hide();
              $spinner.show();	
            if(id){


            	var tracking = $(this.name).attr("tracking");
            	if(tracking == "V"){
            			$adminTeams.$taskDialog.find("#files").hide(); 
            			$adminTeams.$taskDialog.find(".btn-save").hide();
            			$adminTeams.$taskDialog.find(".btn-cancel").hide();
            			$adminTeams.$taskDialog.find(".btn-close").show();
            			$adminTeams.$taskDialog.find('input[name=TeamsName]').prop('readonly', true);	
				 												 $adminTeams.$taskDialog.find('textarea[name=TeamsDetails]').prop('readonly', true);
            	}else{
            		 $adminTeams.$taskDialog.find(".btn-save").click(function(){
            		 				$adminTeams.onSubmitUpdateTeams(id);
            		 });
            	}
            		var attno = $adminTeams.objdata();
	 									attno.value = id;
				 					var objgetdata = {	table: $adminTeams.tablename, 
											    					objdata: attno
											    				};
				 					$pageEntity.GetData($globalKudo.apipath,objgetdata,function(data){
				 									
				 												var jsonobj = JSON.parse(data.data);
				 												//alert(jsonobj[0].Name);
				 												 $adminTeams.$taskDialog.find('input[name=TeamsName]').val(jsonobj[0].Name);	
				 												 $adminTeams.$taskDialog.find('textarea[name=TeamsDetails]').html(jsonobj[0].Details);	
           			 								var span = document.createElement('span');
           			 								if(jsonobj[0].Picture){
												          span.innerHTML = ['<img class="kudo-thumb" src="',jsonobj[0].Picture,
												                            '"', '"/>'].join('');
												          $adminTeams.$taskDialog.find('#list').append(span);
												        }
				 												//$("input[name = ACCTNAME]").val(jsonobj[0].acct_name);
				 											  // $("input[name = ACCTLEVEL]").val(jsonobj[0].acct_level);	

				 											  $spinner.hide();		
           			 								$adminTeams.$taskDialog.show();
				 					});
            }	else{


	             	$adminTeams.$taskDialog.find(".btn-save").click($adminTeams.onSubmitNewTeams);
            		 $spinner.hide();		
           			 $adminTeams.$taskDialog.show();
            }



	 },
	deleteTeams: function ($row, id) {
        var params = { id: id };
        $alert.confirmDelete($adminTeams.onSubmitDeleteTeams, params);
   },
   onSubmitDeleteTeams:function(params){
   		if(params.id){
   			 			var attno = $adminTeams.objdata();
	 								attno.value = params.id;
		 						var savedata = {	table: $adminTeams.tablename, 
									    						objdata: attno
						    					};

								    //Logic to delete the item
							$pageEntity.DeleteData($globalKudo.apipath,savedata,function(){
										$adminTeams.$grid.Bind();	

							});

	 				}		
   		return false;
   },
   onSubmitNewTeams:function(){
   		$adminTeams.addToDatabase();
   		return false;
   },
   onSubmitUpdateTeams:function(id){
   		$adminTeams.addToDatabase(id);
   		return false;
   },
   addToDatabase:function(itemid){
   		if( $adminTeams.$formValid.valid()){
   						var file_data = $adminTeams.$taskDialog.find('#files').prop('files')[0];   
   							var teamsname = 	$adminTeams.$taskDialog.find('input[name=TeamsName]').val();
					    var teamsdetails = $adminTeams.$taskDialog.find('textarea[name=TeamsDetails]').html();
   					 	var attno = $adminTeams.objdata();
	 								attno.Name = teamsname;
	 								attno.Details = teamsdetails;

	 						if(itemid){
	 										attno.value = itemid;
	 								}	

	 						 	var savedata = {	table: $adminTeams.tablename, 
												    					objdata: attno
									    					};				

   					 	if(file_data){
					    var form_data = new FormData();                  
					    		form_data.append('file', file_data);
	

	 						$fnglobal.uploadFile(form_data,"teams/",function(path){

	 								savedata.objdata.Picture = path;	
									
									$adminTeams.InserUpdate(itemid,savedata);		

	 						});
						}
						else{
								$adminTeams.InserUpdate(itemid,savedata);
	 								
						}
		   	
		   	}
   },
   InserUpdate:function(id,data){
   			if(id){
	 										$pageEntity.EditData($globalKudo.apipath,data,function(msg){
									 				$adminTeams.$grid.Bind();	
									 				$adminTeams.$taskDialog.hide();
									 });  
	 								}
	 								else{
					 		
									 $pageEntity.InsertData($globalKudo.apipath,data,function(msg){
									 				$adminTeams.$grid.Bind();	
									 				$adminTeams.$taskDialog.hide();
									 });  
			 }
   },
	 initAdd : function(){
	 			var backurl = $pageEntity.getParameterByName('back');
	 			var id = $pageEntity.getParameterByName('id');
	 			if(id != null){
	 					var attno = $adminTeams.objdata();
	 					attno.value = id;
	 					var savedata = {	table: $adminTeams.tablename, 
								    					objdata: attno
								    				};
	 					$pageEntity.GetData('../php/api.php',savedata,function(data){
	 												var jsonobj = JSON.parse(data.data);
	 												$("input[name = ACCTNAME]").val(jsonobj[0].acct_name);
	 											   $("input[name = ACCTLEVEL]").val(jsonobj[0].acct_level);	
	 					});
	 			}
	 			$(".form-save").click(function(){
	 					   var file_data = $('#files').prop('files')[0];   
					    var form_data = new FormData();                  
					    		form_data.append('file', file_data);
	 						$fnglobal.uploadFile(form_data,"teams/",function(path){
	 								alert(path);
	 						});
	 				/*
	 					var name = $("input[name = ACCTNAME]").val();
	 					var level = $("input[name = ACCTLEVEL]").val();
	 					var ispass = true;
	 					//alert(name + level);

	 					if(name.trim().length > 0){
	 							$(".error[for = ACCTNAME]").text("");
	 					}
	 					else{
	 						$(".error[for = ACCTNAME]").text("Please Insert Data");
	 						ispass = false;
	 					}
	 					var reg = /^\d+$/;
	 					var iscorrect = reg.test(level);
	 					if(iscorrect){
	 							$(".error[for = ACCTLEVEL]").text("");
	 					}
	 					else{
	 						$(".error[for = ACCTLEVEL]").text("Please Insert Data With Number");
	 						ispass = false;
	 					}
	 					if(ispass){
	 						//Insert Data

	 						var attno = $adminTeams.objdata();
	 								attno.acct_name = name;
	 								attno.acct_level = level;
	 						if(id != null){
	 								attno.value = id;
	 						}
	 						var savedata = {	table: $adminTeams.tablename, 
								    					objdata: attno
					    					};
					    if(id == null){
	 							$pageEntity.InsertData('../php/api.php',savedata,function(msg){
	 									alert(msg);
	 									window.location.href = backurl;
	 							});
	 						}
	 						else{
	 							$pageEntity.EditData('../php/api.php',savedata,function(msg){
	 									alert(msg);
	 									window.location.href = backurl;
	 							});
	 						}					
	 						
	 					}*/
	 					return false;	
	 			});
	 	/*		$(".btn-cancel").click(function(){
	 						window.location.href = backurl;
	 					return false;	
	 			});
	 			$(".btn-testEdit").click(function(){
	 					var name = $("input[name = ACCTNAME]").val();
	 					var level = $("input[name = ACCTLEVEL]").val();
	 					var ispass = true;
	 					//alert(name + level);

	 					if(name.trim().length > 0){
	 							$(".error[for = ACCTNAME]").text("");
	 					}
	 					else{
	 						$(".error[for = ACCTNAME]").text("Please Insert Data");
	 						ispass = false;
	 					}
	 					var reg = /^\d+$/;
	 					var iscorrect = reg.test(level);
	 					if(iscorrect){
	 							$(".error[for = ACCTLEVEL]").text("");
	 					}
	 					else{
	 						$(".error[for = ACCTLEVEL]").text("Please Insert Data With Number");
	 						ispass = false;
	 					}
	 					if(ispass){
	 						//Insert Data
	 						var attno = $adminTeams.objdata();
	 								attno.value = 2;
	 								attno.acct_name = name;
	 								attno.acct_level = level;
	 						var savedata = {	table: $adminTeams.tablename, 
								    					objdata: attno
					    					};
	 						$pageEntity.EditData('php/api.php',savedata,"#test2");
	 					}
	 					return false;	
	 			});
	 			$(".btn-testDelete").click(function(){
	 						var attno = $adminTeams.objdata();
	 								attno.value = 2;
	 						var savedata = {	table: $adminTeams.tablename, 
								    						objdata: attno
					    					};
					    var result = confirm("Ary you sure to delete?");
								if (result) {
								    //Logic to delete the item
								    $pageEntity.DeleteData('php/api.php',savedata,"#test2");
								}					
	 						

	 					return false;	
	 			});*/
	 			
	 			 // document.getElementById('files').addEventListener('change', $fnglobal.handleFileSelect(this,'list'), false);
	 },

	 newdata:function(){

	 			$(".btn-adddata").click(function(){
	 						window.location.href = $globalKudo.rootpath+"Admin/TeamsItem?back="+$globalKudo.rootpath+"Admin/Teams";
	 					return false;	
	 			});
	 }
	
};

/*
            $ajaxCall(url, data).success(function (response) {
                $spinner.hide();

                if (response == null || !response.success) {
                    $alert.error(response);
                }
                else {
                    if (response.success) {
                        window.localStorage.setItem($pageLogin.LocalStorage, response.data.user);
                    }
                    else {
                        window.localStorage.setItem($pageLogin.LocalStorage, "");
                    }

                    var urlparam = $globalFunc.getParameterByName("r");
                    if (urlparam) {
                        $alert.completeAndRedirect(response, urlparam);
                    }
                    else {
                        $alert.completeAndRedirect(response, $url.task.index);
                    }
                    //if (response.data != null) {
                    //    if (response.data.redirctTo && response.data.redirctTo != "") {
                    //        $alert.completeAndRedirect(response, response.data.redirctTo);
                    //    }
                    //    else {
                    //        $alert.completeAndRedirect(response, $url.task.index);
                    //    }
                    //}
                    //else {
                    //    $alert.completeAndRedirect(response, $url.task.myindex);
                    //}
                }
            }).fail(function (e) {
                $spinner.hide();
                $alert.fail();
            });

 $.ajax({
                url: 'upload.php', // point to server-side PHP script 
                dataType: 'text',  // what to expect back from the PHP script, if anything
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,                         
                type: 'post',
                success: function(php_script_response){
                    alert(php_script_response); // display response from the PHP script, if any
                }
     });
            */