<!DOCTYPE html>
<html>
    <head>
    <meta charset="UTF-8">    
    <?php $rootpath="../_layout/"; ?>
    <?php $scriptroot="../"; ?>   

    <?php include $rootpath."scriptref.php";?>

     <script src="<?=$scriptroot?>js/admin/adminMatches.js"></script>
    </head>
<body>
<?php include $rootpath."header.php";?>

    
    <div class="kduo-contents">
        <div class="container">
     <h1>Matches</h1>
     <div class="form-group">
          <button class="btn btn-primary btn-dlg-matches" type="button" >New Data</button>
    </div>

<div id="gridMainMatches" class="grid gridMain gridMainMatches">
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
                    <th data-name="records_no" class="col-center">No.</th>
                    <th data-name="Team" class="col-center">Team</th>
                    <th data-name="Score" class="col-center" style="width: 200px">Score</th>
                    <th data-name="Start Date" class="col-center">Start Time</th>
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
                <td>
                    <div class="row">
                    <div class="col-sm-5 pad-lr-0">
                        <div class="float-r">
                            <img src="{3}" class="ui-imgpreview" />
                            <br/>
                            <span class="col-sm-12">{2}</span>
                             
                        </div>
                    </div>
                    <div class="col-sm-2 col-center">
                        <h3>&nbsp;VS&nbsp;</h3>  
                    </div>
                    <div class="col-sm-5">
                        <div>
                            <img src="{5}" class="ui-imgpreview" />
                            <br/>
                            <span class="col-sm-12 pad-left-0">{4}</span>
                        </div>
                    </div>               
                </div>
                </td>
                <td>
                    <div class="row">
                    <div class="col-sm-5 pad-lr-0 col-right">
                        <h1>{6}</h1>
                    </div>
                    <div class="col-sm-2 col-center">
                        <h3>:</h3>  
                    </div>
                    <div class="col-sm-5 pad-lr-0">
                        <h1>{7}</h1>
                    </div>               
                </div>
                </td>
                <td class="col-center">{8}</td>
                <td>
                    <span tracking="V" class="glyphicon glyphicon-eye-open kduo-pointer kudo-button btn-view hidden" title="View" aria-hidden="true"></span>
                    <span tracking="E" class="glyphicon glyphicon-pencil kduo-pointer kudo-button btn-assign hidden" title="Edit" aria-hidden="true"></span>
                    <span class="glyphicon glyphicon-trash kduo-pointer kudo-button btn-delete hidden" title="Delete" aria-hidden="true"></span>
                </td>
            </tr>
        </tbody>
    </table>
</div>
<div id="formateTeams" class="hidden">
    <div style="display:inline-block;">
         <input type="hidden" value="{0}" />
        <label>{1} <span class="del-user-{0}" aria-hidden="true">×</span></label>
        <img class="ui-imgpreview" src="{2}" />

    </div>
</div>
<div id="newTeamsTmp" class="hidden">
     <form id="newMatchesForms" name="newMatchesForms" class="form-horizontal" role="form" method="get" action="">
                 <div class="form-group">
                    <label class="col-sm-3 control-label" for="TeamA">
                        TeamA<span class="required">*</span> :
                    </label>
                    <div class="col-sm-9">
                        <input type="text" name="TeamA" class="form-control" />
                        <div name="TeamA">
                             <div style="display:inline-block;">
                                    <input type="hidden" />
                                    <label></label>
                                    <img class="ui-imgpreview"/>
                             </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label" for="TeamB">
                        TeamB<span class="required">*</span> :
                    </label>
                    <div class="col-sm-9">
                        <input type="text" name="TeamB" class="form-control" />
                        <div name="TeamB">
                              <div style="display:inline-block;">
                                    <input type="hidden" />
                                    <label></label>
                                    <img class="ui-imgpreview"/>
                             </div>   
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label" for="TeamB">
                        Start Time<span class="required">*</span> :
                    </label>
                    <div class="col-sm-9">
                        <div class='input-group date' id='StartDateInput'>
                                <input type='text' name="StartDateInput" class="form-control" />
                                <span class="input-group-addon">
                                    <span class="glyphicon glyphicon-calendar"></span>
                                </span>
                            </div>

                    </div>
                </div>
                 <div class="form-group">
                    <label class="col-sm-3 control-label" for="TeamB">
                        End Time:
                    </label>
                    <div class="col-sm-9">
                         <div class='input-group date' id='EndDateInput'>
                                <input type='text' class="form-control" />
                                <span class="input-group-addon">
                                    <span class="glyphicon glyphicon-calendar"></span>
                                </span>
                            </div>
                    </div>
                </div>
            <div class="form-group">
                <div class="col-sm-6 pad-lr-0">
                    <label class="col-sm-12 col-right" name="ScoreTeamsA" for="ScoreTeamsA">
                    </label>
                    <div class="col-sm-12">
                        <div class="float-r">
                        <input type="text" name="ScoreTeamsA" value="0" class="form-control matchs-score" />
                         <label for="ScoreTeamsA" class="error"></label>
                         </div>
                    </div>
                </div>
                <div class="col-sm-6 pad-lr-0">
                    <label class="col-sm-12 col-left" name="ScoreTeamsB" for="ScoreTeamsB">
                    </label>
                    <div class="col-sm-12">
                        <input type="text" name="ScoreTeamsB" value="0" class="form-control matchs-score mar-l-0" />
                    </div>
                </div>               
                
            </div>
             <div class="modal-footer">
                <button class="btn btn-primary btn-save" type="button" >Save</button>
                <button type="button" class="btn btn-secondary btn-cancel" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-secondary btn-close" data-dismiss="modal">Close</button>
            </div>
     </form>
</div>

        <script type="text/javascript">
                $(function(){
                        $adminMatches.init();
                        $adminMatches.loadData();
                });
        </script>

<?php include $rootpath."footer.php";?>
    </body>
</html>