var $pageEntity = {
	 init : function(){

	 },
	 getColumns : function(tablename){
	 			var returnobj;
	 			switch (tablename){
	 				case "board": //บอร์ดย่ย ของแต่ละกรุป
	 								returnobj ={
	 											primary :"board_id",
	 											value : 0,
	 											board_id :"board_id",
	 											board_group_id:"board_group_id",
	 											board_name:"board_name",
	 											board_detail:"board_detail",
	 											board_no:"board_no",
	 											board_status:"board_status",
	 								};
	 								break;
	 				case "board1": //หัวข้อ
	 								returnobj ={
	 											primary :"board1_id",
	 											value : 0,
	 											board1_id:"board1_id",
	 											board_id:"board_id",
	 											member_id:"member_id",
	 											board1_title:"board1_title",
	 											board1_detail:"board1_detail",
	 											board1_datetime : "board1_datetime",
	 											board1_status : "board1_status",
	 											board1_mud : "board1_mud",
	 											board1_views : "board1_views",
	 											last_post : "last_post",
	 								};
	 								break;
	 				case "board2" : //กระทู้
	 								returnobj ={
	 											primary :"board2_id",
	 											value : 0,
	 											board2_id :"board2_id",
	 											board_id:"board_id",
	 											board1_id:"board1_id",
	 											member_id:"member_id",
	 											board2_detail:"board2_detail",
	 											board2_datetime:"board2_datetime",
	 								};
	 								break;
	 				case "board_group":
	 								returnobj ={
												primary :"board_group_id",
	 											value : 0,
	 											board_group_id :"board_group_id",
	 											board_group_name:"board_group_name",
	 											board_group_detail:"board_group_detail",
	 											board_group_date:"board_group_date",
	 								};
	 								break;
	 				case "user":
	 								returnobj ={
	 											primary :"user_id",
	 											value : 0,
	 											user_id :"user_id",
	 											user_name:"user_name",
	 											user_password:"user_password",
	 											user_email:"user_email",
	 											user_picture :"user_picture",
	 											user_status:"user_status",
	 											user_type:"user_type",
	 											user_date:"user_date",
	 											user_ip:"user_ip",
	 											block_ip:"block_ip",
	 								};
	 								break;	
	 				case "teams":
	 								returnobj ={
	 											primary :"Id",
	 											value : 0,
	 											Id :"Id",
	 											Name :"Name",
	 											Details:"Details",
	 											Picture:"Picture",
	 											Updated:"Updated",
	 											Created:"Created",
	 											Active :"Active"
	 								};
	 								break;
	 				case "matches":
	 								returnobj ={
	 											primary :"Id",
	 											value : 0,
	 											Id :"Id",
	 											Title:"Title",
	 											Round:"Round",
	 											TeamA :"TeamA",
	 											TeamB :"TeamB",
	 											ScoreA:"ScoreA",
	 											ScoreB:"ScoreB",
	 											StartMatch:"StartMatch",
	 											EndMatch:"EndMatch",
	 											Updated:"Updated",
	 											Created:"Created",
	 											Active :"Active"
	 								};
	 								break;
	 				case "sponsor":
	 								returnobj ={
	 											primary :"Id",
	 											value : 0,
	 											Id :"Id",
	 											Name :"Name",
	 											Details :"Details",
	 											Picture:"Picture",
	 											OrderNo:"OrderNo",
	 											Updated:"Updated",
	 											Created:"Created",
	 											Active :"Active"
	 								};
	 								break;
	 				case "news":
	 								returnobj ={
	 											primary :"Id",
	 											value : 0,
	 											Id :"Id",
	 											Title :"Title",
	 											Image :"Image",
	 											Body:"Body",
	 											Updated:"Updated",
	 											Created:"Created",
	 											Active :"Active"
	 								};
	 								break;
	 				case "gallery":
	 								returnobj ={
	 											primary :"Id",
	 											value : 0,
	 											Id :"Id",
	 											Title :"Title",
	 											Details :"Details",
	 											ActivityDate:"ActivityDate",
	 											Picture:"Picture",
	 											Updated:"Updated",
	 											Created:"Created",
	 											Active :"Active"
	 								};
	 								break;			
	 				case "squad":
	 								returnobj ={
	 											primary :"Id",
	 											value : 0,
	 											Id :"Id",
	 											Name :"Name",
	 											Details :"Details",
	 											PdfPath:"PdfPath",
	 											Updated:"Updated",
	 											Created:"Created",
	 											Active :"Active"
	 								};
	 								break;																		
	 				default :
				 				returnobj = undefined;
	 			}

	 			return returnobj;
	 },
	 GetData:function(phppage,data,callback){
	 		data.method = "get";
	 				jQuery.ajax({
					    type: "POST",
					    url: phppage,
					    dataType: 'json',
					    data: data,
					    success: function (obj, textstatus) {
					                  if( !('error' in obj) ) {
																callback(obj);
					                  }
					                  else {
					                       alert(obj.error);
					                  }
					            },
					   error: function (textStatus, errorThrown) {
                alert(textStatus.responseText);
            }

					});	
	 },
	 InsertData:function(phppage,data,callback){
	 			data.method = "POST";
	 				jQuery.ajax({
					    type: "POST",
					    url: phppage,
					    dataType: 'json',
					    data: data,
					     success: function (obj, textstatus) {
					                  if( !('error' in obj) ) {
					                     //alert("Insert Success");
					                     callback("Insert Success");
					                  }
					                  else {
					                       alert(obj.error);
					                  }
					            },
					   error: function (textStatus, errorThrown) {
               alert(textStatus.responseText);
            }

					});	
	 },
	 EditData:function(phppage,data,callback){
	 			data.method = "PUT";
	 				jQuery.ajax({
					    type: "POST",
					    url: phppage,
					    dataType: 'json',
					    data: data,
					    success: function (obj, textstatus) {
					                  if( !('error' in obj) ) {
					                     //alert("Edit Success");
					                     callback("Update Success");
					                  }
					                  else {
					                       alert(obj.error);
					                  }
					            },
					   error: function (textStatus, errorThrown) {
               alert(textStatus.responseText);
            }

					});	
	 },
	  DeleteData:function(phppage,data,callback){
	  		data.objdata.Active = "N";
	 			data.method = "PUT";
	 				jQuery.ajax({
					    type: "POST",
					    url: phppage,
					    dataType: 'json',
					    data: data,
					    success: function (obj, textstatus) {
					                  if( !('error' in obj) ) {
					                     //alert("Edit Success");
					                     callback("Update Success");
					                  }
					                  else {
					                       alert(obj.error);
					                  }
					            },
					   error: function (textStatus, errorThrown) {
               alert(textStatus.responseText);
            }

					});	
	 },
	  RestoreData:function(phppage,data,callback){
	  		data.objdata.Active = "Y";
	 			data.method = "PUT";
	 				jQuery.ajax({
					    type: "POST",
					    url: phppage,
					    dataType: 'json',
					    data: data,
					    success: function (obj, textstatus) {
					                  if( !('error' in obj) ) {
					                     //alert("Edit Success");
					                     callback("Update Success");
					                  }
					                  else {
					                       alert(obj.error);
					                  }
					            },
					   error: function (textStatus, errorThrown) {
               alert(textStatus.responseText);
            }

					});	
	 },
	 RemoveData:function(phppage,data,callback){
	 			data.method = "DELETE";
	 				jQuery.ajax({
					    type: "POST",
					    url: phppage,
					    dataType: 'json',
					    data: data,
					    success: function (obj, textstatus) {
					                  if( !('error' in obj) ) {
																//alert("Delete Success");
																callback("Delete Success");
					                  }
					                  else {
					                      alert(obj.error);
					                  }
					            },
					   error: function (textStatus, errorThrown) {
					   			alert(textStatus.responseText);
            }

					});	
	 },
	 dateFormate: function (date) {

        return 	date.getFullYear() +"-" 
        				+(date.getMonth() + 1) +"-"
                + date.getDate() + " "
                + date.getHours() + ":"
                + date.getMinutes() + ":"
                + date.getSeconds();
    },
   MysqlDatetoDate:function (dateString) {
  		var dt  = dateString.split(/\-|\s|:/);
  		var m = parseInt(dt[1]) - 1;
  		dt[1] = m;
  		return new Date(dt[0],dt[1],dt[2],dt[3],dt[4],dt[5]);
		},
	 getParameterByName:function(name, url) {
		    if (!url) url = window.location.href;
		    name = name.replace(/[\[\]]/g, "\\$&");
		    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		        results = regex.exec(url);
		    if (!results) return null;
		    if (!results[2]) return '';
		    return decodeURIComponent(results[2].replace(/\+/g, " "));
		}
};