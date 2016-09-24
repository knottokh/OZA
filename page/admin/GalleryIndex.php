
<!DOCTYPE html>
<html>
    <head>
    <meta charset="UTF-8">    
    <?php $rootpath="../_layout/"; ?>
    <?php $scriptroot="../"; ?>   

    <?php include $rootpath."scriptref.php";?>

     <script src="<?=$scriptroot?>js/admin/adminGallery.js"></script>
    </head>
<body>
<?php include $rootpath."header.php";?>

    
    <div class="kduo-contents">
        <div class="container">
     <h1>Gallery</h1>
     <div class="form-group">
          <button class="btn btn-primary btn-dlg-gallery" type="button" >New Data</button>
    </div>

<div id="gridMainGallery" class="grid gridMain gridMainGallery">
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
                    <th data-name="name" class="col-center">Title</th>
                    <th data-name="taskname" class="col-center">Details</th>
                    <th data-name="picture" class="col-center">Picture</th>
                    <th data-name="picture" class="col-center">Activity Date</th>
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


<div id="gridMainTempGallery" class="hidden">
    <table>
        <tbody>
            <tr data-id="{0}">
                <td class="col-center">{1}</td>
                <td>{2}</td>
                <td class="table-details">{3}</td>
                <td class="col-center"><img class="kudo-thumb" src="{4}"/></td>
                <td class="col-center">{5}</td>
                <td>
                    <span tracking="V" class="glyphicon glyphicon-eye-open kduo-pointer kudo-button btn-view hidden" title="View" aria-hidden="true"></span>
                    <span tracking="E" class="glyphicon glyphicon-pencil kduo-pointer kudo-button btn-assign hidden" title="Edit" aria-hidden="true"></span>
                    <span class="glyphicon glyphicon-trash kduo-pointer kudo-button btn-delete hidden" title="Delete" aria-hidden="true"></span>
                </td>
            </tr>
        </tbody>
    </table>
</div>
<div id="newGalleryTmp" class="hidden">
     <form id="newGalleryForms" name="newTeamsForms" class="form-horizontal" role="form" method="get" action="">
               <div class="form-group">
                <label class="col-sm-3 control-label" for="GalleryTitle">
                    Title <span class="required">*</span>:
                </label>
                <div class="col-sm-9">
                    <input type="text" name="GalleryTitle" class="form-control" />
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label" for="GalleryDetails">
                    Details :
                </label>
                <div class="col-sm-9">
                    <textarea rows="5" name="GalleryDetails" class="form-control"></textarea>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label" for="GalleryPicture">
                    Picture :
                </label>
                <div class="col-sm-9">
                    <input type="file" id="files" name="files[]"  />
                    <output id="list" class="imgpreview"></output>
                </div>
            </div>
            <div class="form-group">
                    <label class="col-sm-3 control-label" for="TeamB">
                        Activity Date<span class="required">*</span> :
                    </label>
                    <div class="col-sm-9">
                        <div class='input-group date' id='ActivityDateInput'>
                                <input type='text' name="ActivityDateInput" class="form-control" />
                                <span class="input-group-addon">
                                    <span class="glyphicon glyphicon-calendar"></span>
                                </span>
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
                        $adminGallery.init();
                        $adminGallery.loadData();
                       // $adminTeams.newdata();
                });
        </script>

<?php include $rootpath."footer.php";?>
    </body>
</html>