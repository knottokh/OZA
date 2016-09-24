var $pageWebboard = {
	 entityboardgroup :$pageEntity.getColumns("board_group"),
	 entitysubboard :$pageEntity.getColumns("board"),
	 entityTopic :$pageEntity.getColumns("board1"),
	 entityForum :$pageEntity.getColumns("board2"),
	 entityUser :$pageEntity.getColumns("user"),
	 apiPath :"",
     boardid:"",
     topicid:"",
     forumid:"",
	 init : function(phppath){
	 			$pageWebboard.apiPath = phppath;
	 },
	 boardGroup : function(){

	 				var attno = $pageWebboard.entityboardgroup;
          var data = {   
                    		table: 'board_group', 
                         objdata: attno     
                      };

        	data.method = "get";
        	var url = $pageWebboard.apiPath+"php/api.php";

          $ajaxCall(url, data).success(function (response) {
            if (response == null || !response.success) {
                $alert.error(response);
            }
            else {
                //$spinner.hide();
               if (response.data.length === undefined) {
                    result = new Array(response.data);
                }
                else {
                    result = JSON.parse(response.data);
                }
                var boardtmp = "";
                var boardidarr = [];
                for(var i=0;i< result.length;i++){
                		var data = result[i];
                    boardtmp += $("#boardgroupTmp > tbody").clone().html().format(
                    	data.board_group_name,
                    	data.board_group_id);
                	 boardidarr.push(data.board_group_id);
                }
                $(".boardgroup > tbody").empty().append(boardtmp);
                for(var i=0;i< boardidarr.length;i++){
                		$pageWebboard.subBoard(boardidarr[i]);
                }

            }
        }).fail(function (e) {
            //$spinner.hide();
            $alert.fail();
        });

	 },	
	 subBoard : function(boardgroupid){
	 				var attno = $pageWebboard.entitysubboard;

	 				var qwhere = "where "+attno.board_group_id+" = "+boardgroupid+" and "+
	 										attno.board_status +" = 'Yes' Order By "+attno.board_id;
          var data = {   
                    		table: 'board', 
                         objdata: attno,
                         where :qwhere     
                      };

        	data.method = "get";
        	var url = $pageWebboard.apiPath+"php/api.php";

          $ajaxCall(url, data).success(function (response) {
            if (response == null || !response.success) {
                $alert.error(response);
            }
            else {
                //$spinner.hide();
               if (response.data.length === undefined) {
                    result = new Array(response.data);
                }
                else {
                    result = JSON.parse(response.data);
                }
                var subboard = "";
                var boardidarr=[];
                for(var i=0;i< result.length;i++){
                	//alert("555");
                		var data = result[i];
                    subboard += $("#subboard").clone().html().format(
                    	data.board_name,
                    	data.board_detail,
                    	data.board_id
                    	);
                    boardidarr.push(data.board_id);
                }
                $(".boardgroup td[group="+boardgroupid+"]").empty().append(subboard);
                for(var i=0;i< boardidarr.length;i++){
                		$pageWebboard.countTopic(boardidarr[i],boardgroupid);
                }	


            }
        }).fail(function (e) {
            //$spinner.hide();
            $alert.fail();
        });

	 },	
	 countTopic : function(topicid,boardid){
	 				var attno = $pageWebboard.entityTopic;
	 						//attno.value = topicid;
	 						//attno.pageIndex = 0;
	 					//	attno.pageSize  =1;
	 				var qwhere = "where "+attno.board_id+" = "+topicid;	
          var data = {   
                    		table: 'board1', 
                         objdata: attno,
                         where : qwhere,
                         count : "Yes"  
                      };

        	data.method = "get";
        	var url = $pageWebboard.apiPath+"php/api.php";

          $ajaxCall(url, data).success(function (response) {
            if (response == null || !response.success) {
                $alert.error(response);
            }
            else {
                //$spinner.hide();

                $(".boardgroup span[totaltopic="+topicid+"]").empty().append(response.total_recs);
                 $pageWebboard.countForum(topicid,boardid);


            }
        }).fail(function (e) {
            //$spinner.hide();
            $alert.fail();
        });

	 },	
	 countForum : function(forumid,boardid){
	 				var attno = $pageWebboard.entityForum;

	 				var qwhere = "where "+attno.board_id+" = "+forumid;	
          var data = {   
                    		table: 'board2', 
                         objdata: attno,
                         where : qwhere,
                         count : "Yes"  
                      };

        	data.method = "get";
        	var url = $pageWebboard.apiPath+"php/api.php";

          $ajaxCall(url, data).success(function (response) {
            if (response == null || !response.success) {
                $alert.error(response);
            }
            else {

                $(".boardgroup span[totalforum="+forumid+"]").empty().append(response.total_recs);
            	  var spantopic = parseInt($(".boardgroup span[totaltopic="+forumid+"]").text());  
            	  var spanforum = parseInt($(".boardgroup span[totalforum="+forumid+"]").text());
            	  if(spantopic == 0){
				 					$(".boardgroup div[lastespost="+forumid+"]").empty().append("ยังไม่มีกระทู้ในหมวดนี้")
            	  }
            	  else if(spantopic > 0 && spanforum ==0){
									$(".boardgroup div[lastespost="+forumid+"]").empty().append("ยังไม่มีความเห็นในหมวดนี้")
            	  }
            	  else{
            	  	$pageWebboard.latestPost(boardid,function(result){
            	  				  if(result.length > 0){
						                	var data = result[0];
						                	var lastuser = $(".lastedAnswer").clone().html().format(
						                				data.user_name,
						                				data.board1_title
						                		);
						                	$(".boardgroup div[lastespost="+forumid+"]").empty().append(lastuser);
						                }

            	  	});
            	  }
            }
        }).fail(function (e) {
            //$spinner.hide();
            $alert.fail();
        });

	 },	
	 latestPost : function(boardid,callback){

	 				var attno = $pageWebboard.entityForum;
	 				var qwhere = "LEFT JOIN user on board2.member_id = user.user_id "+
										"LEFT JOIN board1 on board2.board1_id = board1.board1_id "+
										"WHERE board2.board1_id = "+boardid +" order by board2.board2_datetime desc";

	 				//var qwhere = attno.board_id+" = "+forumid;	
          var data = {   
                    		table: 'board2', 
                         objdata: attno,
                         where : qwhere,
                         colselect :"user.user_name,board1.board1_title,board1.last_post"
                      };

        	data.method = "get";
        	var url = $pageWebboard.apiPath+"php/api.php";

          $ajaxCall(url, data).success(function (response) {
            if (response == null || !response.success) {
                $alert.error(response);
            }
            else {
            		 if (response.data.length === undefined) {
                    result = new Array(response.data);
                }
                else {
                    result = JSON.parse(response.data);
                }
                   if(callback){
                        if(typeof callback == "function"){
                              callback.call(this,result,response.total_recs,boardid);
                        }
                    }

            }
	        }).fail(function (e) {
	            //$spinner.hide();
	            $alert.fail();
	        });

	 },
	 displayTopic:function(topicid){

	 		$pageWebboard.listTopic(topicid,function(result){
	 					    var subboard = "";
                var boardidarr=[];
               if(result.length == 0){
               		subboard = $(".notopicfoundtmp").clone().html();
               }else{
                for(var i=0;i< result.length;i++){
                	//alert("555");
                		var data = result[i];
                    subboard += $(".subboardtmp").clone().html().format(
                    	data.board1_title,
                    	data.board1_views,
                    	data.board1_id,
                    	data.user_name,
                    	data.board1_datetime,
                    	data.board_id
                    	);
                    boardidarr.push(data.board1_id);
                  }
              }
                	$(".boardarea td.appendtopic").empty().append(subboard);
                		for(var i=0;i< boardidarr.length;i++){
                				//	$pageWebboard.latestPostTopic(;)
                					$pageWebboard.latestPost(boardidarr[i],function(result,totals,boardid){
            	  				  var lastuser = "";
							                if(result.length > 0){
							                	var data = result[0];
							                  lastuser = $(".lastedAnswer").clone().html().format(
							                				data.user_name,
							                				data.last_post
							                		);
							                }
							                else{
							                		lastuser="หัวข้อนี้ยังไม่มีความคิดเห็น";
							                }
							               $(".boardarea .appendtopic td[boardid="+boardid+"]").empty().append(lastuser);
							               $(".boardarea .appendtopic b[boardid="+boardid+"]").empty().append(totals);
            	  				});
                		}
	 		});
	 },
	 detailTopic:function(curetopic,userid,postid){
	 		$pageWebboard.listTopic(curetopic,function(result){

                    var data = result[0];
                   var subboard = $(".TopicDetailsTmp").clone().html().format(
                        data.board1_title,
                        data.board1_datetime,
                        data.user_name,
                        data.board1_detail,
                        (data.user_picture != "")?data.user_picture:"1.png",
                        (data.user_type !="Admin")?"hidden":"",
                        (data.board1_lock =="Yes")?"hidden":"",
                        (data.board1_lock !="Yes")?"hidden":"",
                        (data.board1_mud =="Yes")?"hidden":"",
                        (data.board1_mud !="Yes")?"hidden":"",
                        (data.user_id != userid)?"hidden":"",
                        (userid == "")?"hidden":""
                    );

                    $(".forumDetailsDeiplay").empty().append(subboard);

                    $pageWebboard.listForum(postid,userid);
    
            });
	 },
	 listTopic : function(topicid,callback){
	 				var attno = $pageWebboard.entityTopic;
	 						//attno.value = topicid;
	 						//attno.pageIndex = 0;
	 					//	attno.pageSize  =1;
	 				var qwhere = "LEFT JOIN user on board1.member_id = user.user_id "+
	 											"where "+attno.board_id+" = "+topicid;	
          var data = {   
                    		table: 'board1', 
                         objdata: attno,
                         where : qwhere,
                        // colselect:"*,Count(board1.board1_id) as countans"
                      };

        	data.method = "get";
        	var url = $pageWebboard.apiPath+"php/api.php";

          $ajaxCall(url, data).success(function (response) {
            if (response == null || !response.success) {
                $alert.error(response);
            }
            else {
  
                 if (response.data.length === undefined) {
                    result = new Array(response.data);
                }
                else {
                    result = JSON.parse(response.data);
                }
                    if(callback){
                    	if(typeof callback == "function"){
    							callback(result);
    					}
                    }
                }
			        }).fail(function (e) {
			            //$spinner.hide();
			            $alert.fail();
			        });

	 },
	 detailsForum:function(topicid,userid){

	 		$pageWebboard.listTopic(topicid,function(result){
  					for(var i=0;i< result.length;i++){
                		var data = result[0];
                   var subboard = $(".TopicDetailsTmp").clone().html().format(
                    	data.board1_title,
                    	data.board1_datetime,
                    	data.user_name,
                    	data.board1_detail,
                    	(data.user_picture != "")?data.user_picture:"1.png",
                    	(data.user_type !="Admin")?"hidden":"",
                    	(data.board1_lock =="Yes")?"hidden":"",
                    	(data.board1_lock !="Yes")?"hidden":"",
                    	(data.board1_mud =="Yes")?"hidden":"",
                    	(data.board1_mud !="Yes")?"hidden":"",
                    	(data.user_id != userid)?"hidden":"",
                    	(userid == "")?"hidden":""
                    );

					$(".forumDetailsDeiplay").append(subboard);
				}
	 		});
	 },
	  listForum : function(forumid,userid){
	 				var attno = $pageWebboard.entityForum;
	 						//attno.value = topicid;
	 						//attno.pageIndex = 0;
	 					//	attno.pageSize  =1;
	 				var qwhere = "LEFT JOIN user on board2.member_id = user.user_id "+
	 											"where "+attno.board1_id+" = "+forumid+
                                  " Order By board2_id ASC";	
          var data = {   
                    		table: 'board2', 
                         objdata: attno,
                         where : qwhere,
                        // colselect:"*,Count(board1.board1_id) as countans"
                      };

        	data.method = "get";
        	var url = $pageWebboard.apiPath+"php/api.php";

 /*         $ajaxCall(url, data).success(function (response) {
            if (response == null || !response.success) {
                $alert.error(response);
            }
            else {

                 if (response.data.length === undefined) {
                    result = new Array(response.data);
                }
                else {
                    result = JSON.parse(response.data);
                }
                var subboard = "";
                for(var i=0;i< result.length;i++){
                        var resultdata = result[i];
                   subboard += $(".ForumDetailsTmp").clone().html().format(
                        resultdata.board2_datetime,
                        resultdata.user_name,
                        resultdata.board2_detail,
                        (resultdata.user_picture != "")?resultdata.user_picture:"1.png"
                    );

                  
                }
                $(".forumDetailsDeiplay").append(subboard);    

                }



            }).fail(function (e) {
                //$spinner.hide();
                $alert.fail();
            });
*/

          var $grid = new Grid({
            DivSelector: "#tblRoleListTask",
            DivDataSelector: "#tblRoleListDataTask",
            SourceUrl: url, 
            Data : data,
            Sorting: { sort: true, excepts: ["records_no", "action"] },
            Searching: false,
            PerPage:10,
            fnRowDisplayFormat: function (html, data) {
                return html.format(
                        data.board2_datetime,
                        data.user_name,
                        data.board2_detail,
                        (data.user_picture != "")?data.user_picture:"1.png"
                        );
            },
            fnRowElementsAction: [{
                name: ".btn-delete",
              /*  callback: function(tr,id){
                        var attno = $pageAcctNo.objdata();
                                                attno.value = id;
                                                var savedata = {    table: $pageAcctNo.tablename, 
                                                                                objdata: attno
                                                                };
                                            var result = confirm("Ary you sure to delete?");
                                                    if (result) {
                                                        //Logic to delete the item
                                                        $pageEntity.DeleteData('php/api.php',savedata);
                                                    }   
                },*/
               // authorize:authorize
            },
            {
                name: ".btn-assign",
               /* callback: function(tr,id){
                        //alert(id);
                        window.location.href    ="page/AddEdit-acct_no.html?id="+id
                                                        +"&back=../index.html";
                        return false;
                },*/
               // authorize: authorize
            }],
            fnRowCreated: function ($html, data) {
                if (data.Id == 1) {
                    $html.find('.btn').remove();
                }

                return $html;
            },
        }).Bind();

	 },		
};