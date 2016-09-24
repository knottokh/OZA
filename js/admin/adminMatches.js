var $adminMatches = {
	 tablename:'matches',
	 $giid :null,
	 $taskDialog:null,
	 $formValid:null,
	 $curbutton:null,
	  defaultimg:"",
	 objdata : function(){
	 	 return $pageEntity.getColumns($adminMatches.tablename);
	},
	init : function(){
				  $(document).on('click.bs.modal.data-api', '.btn-dlg-matches', function (event) {
				  		$adminMatches.dialogShow();
            return false;
        });
			$adminMatches.defaultimg =  $globalKudo.rootpath+"images/defaults/no-image.jpg";

	 },
	 loadData:function(){
	 		        var data = {	table: $adminMatches.tablename, 
								    	objdata : $adminMatches.objdata(),
								    	where :"LEFT JOIN teams as t1 on matches.TeamA = t1.Id "+
								    				 "LEFT JOIN teams as t2 on matches.TeamB = t2.Id "+
								    					"where matches.Active = 'Y'",
								    	colselect :"matches.Id,matches.ScoreA,matches.ScoreB,matches.StartMatch"	+
								    							",t1.Name as TeamAName,t1.Picture as TeamAPicture"	+	
								    							",t2.Name as TeamBName,t2.Picture as TeamBPicture"
					    			};
				  data.method = "get";	    			

 			var authorize = true;
			 $adminMatches.$grid = new Grid({
           // TableId: "tblRoleListTask",
            // TableDataId: "tblRoleListDataTask",
            DivSelector: "#gridMainMatches",
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
                    data.TeamAName,
                    $globalKudo.rootpath+data.TeamAPicture,
                    data.TeamBName,
                    $globalKudo.rootpath+data.TeamBPicture,
                    data.ScoreA,
                    data.ScoreB,
                    data.StartMatch
                    );
            },
            fnRowElementsAction: [{
                name: ".btn-delete",
                callback: $adminMatches.deleteData,
                authorize:authorize
            },
            {
                name: ".btn-assign",
                callback: $adminMatches.dialogShow,
                authorize: authorize
            },
            {
                name: ".btn-view",
                callback: $adminMatches.dialogShow,
                authorize: authorize
            }],
            fnRowCreated: function ($html, data) {
               /* if (data.Id == 1) {
                    $html.find('.btn').remove();
                }*/

                return $html;
            },
        });
				$adminMatches.$grid.Bind();
	 },
	 autoCompleteTeam:function(_parent,_input,_div,_arrsorce,scoreTitle){
	 			  _parent.find(_input)
               .autocomplete({
                   minLength: 0,
                   source: _arrsorce,
                   focus: function () {
                       // prevent value inserted on focus
                       return false;
                   },
                   select: function (event, ui) {
                var fillteams = $('#formateTeams').clone().html().format(
                			ui.item.Id,
                			ui.item.Name,
                			ui.item.Picture
                  );
        					_parent.find(_div).append(fillteams);
        					_parent.find(scoreTitle).text(ui.item.Name);

        					_parent.find(_div).find(".del-user-" + ui.item.Id).click(function (e) {
				            e.preventDefault();
				            $(this).closest("div").remove();
				            _parent.find(scoreTitle).text("");
				            _parent.find(_input).show();
				            _parent.find(_input).val("");
				            return false;
				         });
                       this.value = ui.item.Name;
                       _parent.find(_input).hide();
                        _parent.find(_input).parent().find(".error").text("");
                       return false;
                   }
               }).data('ui-autocomplete')._renderItem = function(ul, item) {
							        return $('<li></li>')
							            .data('ui-autocomplete-item', item)
							            .append('<a>'+/*<img src="' + item.Picture + '" />' +*/ item.Name + '<br></a>')
							            .appendTo(ul);
							    };
	 },
	StartDateCalendar:function(){
		//	$adminMatches.$taskDialog.find('#datetimepicker1').datetimepicker();
		 $adminMatches.$taskDialog.find('#StartDateInput').datetimepicker({
		                    locale: 'th',
		                  //  sideBySide:true,
		                    widgetPositioning: {
									            horizontal: 'auto',
									            vertical: 'bottom'
									        }
		                  //  widgetParent:".wiget-calendar-div"
		                });
		  $adminMatches.$taskDialog.find('#StartDateInput').on("dp.change", function (e) {
            $adminMatches.$taskDialog.find('#EndDateInput').data("DateTimePicker").minDate(e.date);
        });
	},
	EndDateCalendar:function(begintime,isdestory){

		$adminMatches.$taskDialog.find('#EndDateInput').datetimepicker({
		                    locale: 'th',
		                    // sideBySide:true,
		                    useCurrent: false, //Important! See issue #1075
		                     widgetPositioning: {
									            horizontal: 'auto',
									            vertical: 'bottom'
									        }
		  });

	},
	 dialogShow:function ($row, id){

	 	$adminMatches.$curbutton =$(this.name);

	 				   var objgetdata = {	table: "teams", 
									    				objdata: $pageEntity.getColumns("teams"),
									    				where :"where Active = 'Y'"
						    					};


            $adminMatches.$taskDialog = $dialogFirst.init('#newTeamsTmp');
           $pageEntity.GetData($globalKudo.apipath,objgetdata,function(data){
	 			   				var jsonobj = JSON.parse(data.data);	
	 			   				$adminMatches.autoCompleteTeam($adminMatches.$taskDialog,
	 			   											"input[name=TeamA]","div[name=TeamA]",jsonobj,"label[name=ScoreTeamsA]");	

	 			   				$adminMatches.autoCompleteTeam($adminMatches.$taskDialog,
	 			   											"input[name=TeamB]","div[name=TeamB]",jsonobj,"label[name=ScoreTeamsB]");	
	 			   				$adminMatches.StartDateCalendar();
	 			   				$adminMatches.EndDateCalendar();
	 			   				$adminMatches.$formValid = $adminMatches.$taskDialog.find("#newMatchesForms");
            $adminMatches.$formValid.validate({
		            rules: {
		                TeamA: {
		                    required: true
		                },
		                TeamB: {
		                    required: true
		                },
		                StartDateInput: {
		                    required: true
		                },
		                ScoreTeamsA:{
		                	 number :true
		                },
		                ScoreTeamsB:{
		                	 number :true
		                }
		            },
		            messages: {
		                TeamA: {
		                    required: "required",
		                },
		                TeamB: {
		                    required: "required",
		                },
		                StartDateInput: {
		                    required: "required",
		                },
		                ScoreTeamsA:{
		                	 number :"number only"
		                },
		                ScoreTeamsB:{
		                	 number :"number only"
		                }
		            }
		        });

            $adminMatches.$taskDialog.find(".btn-close").hide();
              $spinner.show();	
            if(id){


            	var tracking = $adminMatches.$curbutton.attr("tracking");
            	    $adminMatches.$taskDialog.find('input[name=TeamA]').hide();	
				 					$adminMatches.$taskDialog.find('input[name=TeamB]').hide();
            	if(tracking == "V"){
            			$adminMatches.$taskDialog.find(".btn-save").hide();
            			$adminMatches.$taskDialog.find(".btn-cancel").hide();
            			$adminMatches.$taskDialog.find(".btn-close").show();
				 					$adminMatches.$taskDialog.find('input[name=ScoreTeamsA]').prop('readonly', true);	
				 					$adminMatches.$taskDialog.find('input[name=ScoreTeamsB]').prop('readonly', true);
				 					$adminMatches.$taskDialog.find('#StartDateInput > input').prop('readonly', true);
				 					$adminMatches.$taskDialog.find('#EndDateInput > input').prop('readonly', true);
            	}else{

            			//$adminMatches.$taskDialog.find('div[name=TeamA]').empty();
            			//$adminMatches.$taskDialog.find('div[name=TeamB]').empty();
            		 $adminMatches.$taskDialog.find(".btn-save").click(function(){
            		 				$adminMatches.onSubmitUpdateData(id);
            		 });
            	}
            		var attno = $adminMatches.objdata();
	 									attno.value = id;
				 					var objgetdata = {	table: $adminMatches.tablename, 
											    					objdata: attno,
											    					where :"LEFT JOIN teams as t1 on matches.TeamA = t1.Id "+
												    				 "LEFT JOIN teams as t2 on matches.TeamB = t2.Id ",
												    				colselect :"matches.Id,matches.TeamA,matches.TeamB,matches.ScoreA,matches.ScoreB,matches.StartMatch,matches.EndMatch"	+
												    							",t1.Name as TeamAName,t1.Picture as TeamAPicture"	+	
												    							",t2.Name as TeamBName,t2.Picture as TeamBPicture"
											    				};
				 					$pageEntity.GetData($globalKudo.apipath,objgetdata,function(data){
				 									
				 												var jsonobj = JSON.parse(data.data)[0];
				 												
				 												$adminMatches.$taskDialog.find('div[name=TeamA] label').text(jsonobj.TeamAName);
				 												$adminMatches.$taskDialog.find('div[name=TeamA] input[type=hidden]').val(jsonobj.TeamA);
				 												$adminMatches.$taskDialog.find('div[name=TeamA] img').attr("src",$globalKudo.rootpath+jsonobj.TeamAPicture);
											 					$adminMatches.$taskDialog.find('div[name=TeamB] label').text(jsonobj.TeamBName);
											 					$adminMatches.$taskDialog.find('div[name=TeamB] input[type=hidden]').val(jsonobj.TeamB);
				 												$adminMatches.$taskDialog.find('div[name=TeamB] img').attr("src",$globalKudo.rootpath+jsonobj.TeamBPicture);
											 					$adminMatches.$taskDialog.find('input[name=ScoreTeamsA]').val(jsonobj.ScoreA);
											 					$adminMatches.$taskDialog.find('input[name=ScoreTeamsB]').val(jsonobj.ScoreB);		
											 					$adminMatches.$taskDialog.find('#StartDateInput').data('DateTimePicker').date($pageEntity.MysqlDatetoDate(jsonobj.StartMatch));	
											 					if(jsonobj.EndMatch){
											 						$adminMatches.$taskDialog.find('#EndDateInput').data('DateTimePicker').date($pageEntity.MysqlDatetoDate(jsonobj.EndMatch));	
											 					}
											 					if(tracking == "V"){
				 											  $adminMatches.$taskDialog.find('#StartDateInput').data('DateTimePicker').destroy();
				 												$adminMatches.$taskDialog.find('#EndDateInput').data('DateTimePicker').destroy();	
				 											  }
				 											  $spinner.hide();		
           			 								$adminMatches.$taskDialog.show();
				 					});
            }	else{
            		$adminMatches.$taskDialog.find('div[name=TeamA]').empty();
            		$adminMatches.$taskDialog.find('div[name=TeamB]').empty();

	             	$adminMatches.$taskDialog.find(".btn-save").click($adminMatches.onSubmitNewData);
            		 $spinner.hide();		
           			 $adminMatches.$taskDialog.show();
            }


	 		});

       


	 },
	deleteData: function ($row, id) {
        var params = { id: id };
        $alert.confirmDelete($adminMatches.onSubmitDeleteData, params);
   },
   onSubmitDeleteData:function(params){
   		if(params.id){
   			 			var attno = $adminMatches.objdata();
	 								attno.value = params.id;
		 						var savedata = {	table: $adminMatches.tablename, 
									    						objdata: attno
						    					};

								    //Logic to delete the item
							$pageEntity.DeleteData($globalKudo.apipath,savedata,function(){
										$adminMatches.$grid.Bind();	

							});

	 				}		
   		return false;
   },
   onSubmitNewData:function(){
   		$adminMatches.addToDatabase();
   		return false;
   },
   onSubmitUpdateData:function(id){
   		$adminMatches.addToDatabase(id);
   		return false;
   },
   addToDatabase:function(itemid){
   		if( $adminMatches.$formValid.valid()){
   			      var teamAid  = $adminMatches.$taskDialog.find("div[name=TeamA]").find("input[type=hidden]").val();
   			      var teamBid  = $adminMatches.$taskDialog.find("div[name=TeamB]").find("input[type=hidden]").val();
   			      var scroeA = $adminMatches.$taskDialog.find("input[name=ScoreTeamsA]").val();
   			      var scroeB = $adminMatches.$taskDialog.find("input[name=ScoreTeamsB]").val();
   			      if(teamAid == teamBid){
   			      	alert("กรุณาเลือกทีมที่ต่างกัน");
   			      }
   			      else{
   			      var attno = $adminMatches.objdata();
	 								attno.TeamA = teamAid;
	 								attno.TeamB = teamBid;
	 								if(parseInt(scroeA) != 0) {
	 									attno.ScoreA = parseInt(scroeA);
	 								}
	 								if(parseInt(scroeB) != 0) {
	 									attno.ScoreB = parseInt(scroeB);
	 								}
	 								

   			      	var datestart = 	$adminMatches.$taskDialog.find('#StartDateInput').data('DateTimePicker').date();
						//		alert($pageEntity.dateFormate(new Date(datestart.toString())));
   			      	attno.StartMatch = $pageEntity.dateFormate(new Date(datestart.toString()));

   			      	var dateend = 	$adminMatches.$taskDialog.find('#EndDateInput').data('DateTimePicker').date();
   			      	
   			      	if(dateend!=null){
   			      		attno.EndMatch = $pageEntity.dateFormate(new Date(dateend.toString()))
   			      	}
   			      }
 
	 						if(itemid){
	 										attno.value = itemid;
	 						}	

	 						 	var savedata = {	table: $adminMatches.tablename, 
												    					objdata: attno
									    					};				

   					 	$adminMatches.InserUpdate(itemid,savedata);
		   	
		   	}
   },
   InserUpdate:function(id,data){
   			if(id){
   								data.objdata.Updated = $pageEntity.dateFormate(new Date())
	 										$pageEntity.EditData($globalKudo.apipath,data,function(msg){
									 				$adminMatches.$grid.Bind();	
									 				$adminMatches.$taskDialog.hide();
									 });  
	 								}
	 								else{
					 		
									 $pageEntity.InsertData($globalKudo.apipath,data,function(msg){
									 				$adminMatches.$grid.Bind();	
									 				$adminMatches.$taskDialog.hide();
									 });  
			 }
   }
	
};