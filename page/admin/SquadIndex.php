
<!DOCTYPE html>
<html>
    <head>
    <?php $rootpath="../_layout/"; ?>
    <?php $scriptroot="../"; ?>   

    <?php include $rootpath."scriptref.php";?>

     <script src="<?=$scriptroot?>js/table_acct-no.js"></script>
    </head>
<body>
<?php include $rootpath."header.php";?>

    
    <div class="roy-contents">
        <div class="container">


                <h1>acct_no</h1>
            <div class="form-group">
                <button class="btn btn-primary btn-adddata" type="submit" >New Data</button>
            </div>


                    <div id="test"></div>
                    <div id="test2"></div>
                    <div id="test3"></div>
                    <div id="tblRoleListTask" class="grid tblRoleListTask">
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
                    <th data-name="records_no" class="col-center">Name</th>
                    <th data-name="taskname" class="col-center">Level</th>
                    <th data-name="action" style="width: 140px"></th>
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


<div id="tblRoleListDataTask" class="tblRoleListDataTask hidden">
    <table>
        <tbody>
            <tr data-id="{0}">
                <td class="col-center">{1}</td>
                <td class="col-center">{2}</td>
                <td>
                    <button type="button" class="btn btn-default btn-block btn-select hidden">
                        <i class="fa fa-check"></i> @Labels.ButtonSelect
                    </button>
                    <button type="button" class="btn btn-default btn-block btn-assign hidden">
                        <i class="fa fa-check"></i> Edit
                    </button>
                    <button type="button" class="btn btn-default btn-block btn-delete hidden">
                        <i class="fa fa-check"></i> Delete
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
        <script type="text/javascript">

                $(function(){
                    $pageEntity.init();
                    $pageWebboard.init();    


                    

        var $grid = new Grid({
           // TableId: "tblRoleListTask",
            // TableDataId: "tblRoleListDataTask",
            DivSelector: ".tblRoleListTask",
            DivDataSelector: ".tblRoleListDataTask",
            SourceUrl: "php/api.php",
            Data : data,
            Sorting: { sort: true, excepts: ["records_no", "action"] },
            Searching: false,
            PerPage:5,
            fnRowDisplayFormat: function (html, data) {
                return html.format(
                    data.board_group_name,
                    data.board_group_detail,
                    data.board_group_date);
            },
            fnRowElementsAction: [{
                name: ".btn-delete",
                callback: function(tr,id){
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
                },
                authorize:authorize
            },
            {
                name: ".btn-assign",
                callback: function(tr,id){
                        //alert(id);
                        window.location.href    ="page/AddEdit-acct_no.php?id="+id
                                                        +"&back=../index.php";
                        return false;
                },
                authorize: authorize
            }],
            fnRowCreated: function ($html, data) {
                if (data.Id == 1) {
                    $html.find('.btn').remove();
                }

                return $html;
            },
        }).Bind();
                });
        </script>

<?php include $rootpath."footer.php";?>
    </body>
</html>