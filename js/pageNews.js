var $pageNews = {
	 tablename:'news',
	 $giid :null,
	 $taskDialog:null,
	 $formValid:null,
	  defaultimg:"",
	 objdata : function(){
	 	 return $pageEntity.getColumns($pageNews.tablename);
	},
	init : function(){

			$pageNews.defaultimg =  $globalKudo.rootpath+"images/defaults/no-image.jpg";
	 },
	 loadData:function(){
	 		        var data = {	table: $pageNews.tablename, 
								    	objdata : $pageNews.objdata(),
								    	where :"where Active = 'Y'"
					    			};
				  data.method = "get";	    			

 			var authorize = false;
			 $pageNews.$grid = new Grid({
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
                    data.Created,
                    $globalKudo.rootpath+"page/news_"+$fnglobal.getDegitNumber(data.Id,6)
                    );
            } ,
            fnRowElementsAction: [],
        });
				$pageNews.$grid.Bind();
	 },
	 displayDetails:function(id){
	 	 $spinner.show();	
									var attno = $pageNews.objdata();
	 									attno.value = id;
				 					var objgetdata = {	table: $pageNews.tablename, 
											    					objdata: attno
											    				};
				 					$pageEntity.GetData($globalKudo.apipath,objgetdata,function(data){
				 									
				 												var jsonobj = JSON.parse(data.data)[0];
				 												//alert(jsonobj[0].Name);
				 												 $('input[name=NewsTitle]').val(jsonobj.Title);	
				 												 $('textarea[name=newsBody]').html(jsonobj.Body);	
           			 								var span = document.createElement('span');
           			 								if(jsonobj.Image){
												          span.innerHTML = ['<img class="kudo-thumb" src="',jsonobj.Image,
												                            '"', '"/>'].join('');
												          $('#list').append(span);
												        }
				 												//$("input[name = ACCTNAME]").val(jsonobj[0].acct_name);
				 											  // $("input[name = ACCTLEVEL]").val(jsonobj[0].acct_level);	

				 											  $spinner.hide();		
				 					});	
	 }
};
