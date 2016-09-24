var $pageAcctNo = {
	 tablename:'acct_no',
	 objdata : function(){
	 	 return $pageEntity.getColumns($pageAcctNo.tablename);
	},
	 init : function(){
	 			var backurl = $pageEntity.getParameterByName('back');
	 			var id = $pageEntity.getParameterByName('id');
	 			if(id != null){
	 					var attno = $pageAcctNo.objdata();
	 					attno.value = id;
	 					var savedata = {	table: $pageAcctNo.tablename, 
								    					objdata: attno
								    				};
	 					$pageEntity.GetData('../php/api.php',savedata,function(data){
	 												var jsonobj = JSON.parse(data.data);
	 												$("input[name = ACCTNAME]").val(jsonobj[0].acct_name);
	 											   $("input[name = ACCTLEVEL]").val(jsonobj[0].acct_level);	
	 					});
	 			}
	 			$(".form-save").click(function(){
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

	 						var attno = $pageAcctNo.objdata();
	 								attno.acct_name = name;
	 								attno.acct_level = level;
	 						if(id != null){
	 								attno.value = id;
	 						}
	 						var savedata = {	table: $pageAcctNo.tablename, 
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
	 						
	 					}
	 					return false;	
	 			});
	 			$(".btn-cancel").click(function(){
	 						//$pageAcctNo.clearDataAll();
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
	 						var attno = $pageAcctNo.objdata();
	 								attno.value = 2;
	 								attno.acct_name = name;
	 								attno.acct_level = level;
	 						var savedata = {	table: $pageAcctNo.tablename, 
								    					objdata: attno
					    					};
	 						$pageEntity.EditData('php/api.php',savedata,"#test2");
	 					}
	 					return false;	
	 			});
	 			$(".btn-testDelete").click(function(){
	 						var attno = $pageAcctNo.objdata();
	 								attno.value = 2;
	 						var savedata = {	table: $pageAcctNo.tablename, 
								    						objdata: attno
					    					};
					    var result = confirm("Ary you sure to delete?");
								if (result) {
								    //Logic to delete the item
								    $pageEntity.DeleteData('php/api.php',savedata,"#test2");
								}					
	 						

	 					return false;	
	 			});
	 },
	 newdata:function(){

	 			$(".btn-adddata").click(function(){
	 						//$pageAcctNo.clearDataAll();
	 						window.location.href = "page/AddEdit-acct_no.php?back=../index.php";
	 					return false;	
	 			});
	 },
	 clearDataAll:function(){
	 		$("input[name = ACCTNAME]").val("");
	 		$(".error[for = ACCTNAME]").text("");
	 		$("input[name = ACCTLEVEL]").val("");
	 		$(".error[for = ACCTLEVEL]").text("");
	 }
	
};