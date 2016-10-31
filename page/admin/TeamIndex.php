
<!DOCTYPE html>
<html>
    <head>
    <meta charset="UTF-8">   
    <meta property="fb:app_id" content="1692775234375070" />
        <meta property="og:url" content="Replace with URL of the page where comments are installed don't forget trailing slash at the end" />
    <meta property="og:title" content="Replace with Page Title" />
    <meta property="og:type" content="Website" />
    <meta property="og:description" content="Add Some description" />
    <title>Team Admin</title>
    <?php $rootpath="../_layout/"; ?>
    <?php $scriptroot="../"; ?>   

    <?php include $rootpath."scriptref.php";?>

     <script src="<?=$scriptroot?>js/admin/adminTeams.js"></script>
    </head>
<body>

<?php include $rootpath."header.php";?>

    
    <div class="kduo-contents">
        <div class="container">
     <h1>Teams</h1>
     <div class="form-group">
          <button class="btn btn-primary btn-dlg-teams" type="button" >New Data</button>
    </div>

<div id="gridMainTeam" class="grid gridMain gridMainTeam">
    <div class="searching clearfix">
        <div class="search-box hidden">
            <div class="search-box-textbox">
                <input type="search" name="txtGridSearch" class="form-control" />
            </div>
            <div class="search-box-button">
                <input type="button" name="btnGridSearch" class="btn btn-default btn-search" value="Search" />
            </div>
        </div>
        <div class="tablenav bottom">
            <div class="tablenav-totals">
                Total : <span class="displaying-num"></span> Items
            </div>
        </div>
    </div>
    <div class="table-responsive">
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                   <th data-name="records_no" class="col-center" style="width: 50px">No.</th>
                    <th data-name="name" class="col-center">Name</th>
                    <th data-name="taskname" class="col-center">Details</th>
                    <th data-name="picture" class="col-center">Picture</th>
                    <th data-name="action" style="width: 110px"></th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
    <div class="paging clearfix">
        <ul class="pagination hidden"></ul>
    </div>
</div>

</div>
                
     </div>       


<div id="gridMainTempTeam" class="hidden">
    <table>
        <tbody>
            <tr data-id="{0}">
                <td class="col-center">{1}</td>
                <td>{2}</td>
                <td class="table-details">{3}</td>
                <td class="col-center"><img class="kudo-thumb" src="{4}"/></td>
                <td>
                    <span tracking="V" class="glyphicon glyphicon-eye-open kduo-pointer kudo-button btn-view hidden" title="View" aria-hidden="true"></span>
                    <span tracking="E" class="glyphicon glyphicon-pencil kduo-pointer kudo-button btn-assign hidden" title="Edit" aria-hidden="true"></span>
                    <span class="glyphicon glyphicon-trash kduo-pointer kudo-button btn-delete hidden" title="Delete" aria-hidden="true"></span>
                </td>
            </tr>
        </tbody>
    </table>
</div>
<div id="newTeamsTmp" class="hidden">
     <form id="newTeamsForms" name="newTeamsForms" class="form-horizontal" role="form" method="get" action="">
               <div class="form-group">
                <label class="col-sm-3 control-label" for="TeamsName">
                    Name <span class="required">*</span>:
                </label>
                <div class="col-sm-9">
                    <input type="text" name="TeamsName" class="form-control" />
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label" for="TeamsDetails">
                    Details :
                </label>
                <div class="col-sm-9">
                    <textarea rows="5" name="TeamsDetails" class="form-control"></textarea>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label" for="TeamsDetails">
                    Picture :
                </label>
                <div class="col-sm-9">
                    <input type="file" id="files" name="files[]"  />
                    <output id="list" class="imgpreview"></output>
                </div>
            </div>
             <div class="modal-footer">
                <button class="btn btn-primary btn-save" type="button" >Save</button>
                <button type="button" class="btn btn-secondary btn-cancel" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-secondary btn-close" data-dismiss="modal">Close</button>
            </div>
     </form>
</div>
<input type="button" name="" onclick="javascript:clikePost();" value="test"/>
<span class="fb-comments-count" data-href="https://ozaproject-knottoc9.c9users.io/Admin/Teams"></span>
<div class="fb-comments" data-href="https://ozaproject-knottoc9.c9users.io/Admin/Squad" data-width="100%" data-numposts="15"></div>
<div id="fb-root"></div>
<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1692775234375070',
      xfbml      : true,
      version    : 'v2.4'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>
<div
  class="fb-like"
  data-share="true"
  data-width="450"
  data-show-faces="true">
</div>

        <script type="text/javascript">
                function clikePost(){
                      FB.login(function(response) {
                        if (response.authResponse) {
                         console.log('Welcome!  Fetching your information.... ');
                         var accesstoken =response.authResponse.accessToken;
                         FB.api('/me', function(response) {
                           console.log('Good to see you, ' + response.name + '.');
                               FB.api(
                                "/199984547094562/feed",
                                "POST",
                                {
                                    "access_token": accesstoken,
                                    "message": "This is a test message"
                                },
                                function (responsepost) {
                                  if (responsepost && !responsepost.error) {
                                    /* handle the result */
                                    alert(responsepost.post_id);
                                  }
                                }
                            );
                         });
                        } else {
                         console.log('User cancelled login or did not fully authorize.');
                        }
                    });
                        
                    return false;
                }
                $(function(){
                        $adminTeams.init();
                        $adminTeams.loadData();
                       // $adminTeams.newdata();
                });
        </script>
    
<?php include $rootpath."footer.php";?>
    </body>
</html>