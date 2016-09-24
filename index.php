
<!DOCTYPE html>
<html>
    <head>
    <?php $rootpath="page/_layout/"; ?>
    <?php $scriptroot=""; ?>   

    <?php include $rootpath."scriptref.php";?>

     <script src="<?=$scriptroot?>js/pageSponsor.js"></script>
    </head>
<body>
<?php include $rootpath."header.php";?>

    
    <div class="roy-contents oza-body">
        <div class="container">
            <div class="row">
                <div class="col-md-8 left-con">
                    <div class="row">
                        <div class="home-sponsor col-sm-12">
                            
                        </div>
                    </div>
                </div>
                <div class="col-md-4 right-con"></div>
            </div>
        </div>        
    </div>     
    <div class="sponsortmp hidden">
        <img class="spon-img" title="{0}" src="{1}"/>
    </div> 

    <script type="text/javascript">
            $(function(){
                    $pageSponsor.init();
            });
    </script>

<?php include $rootpath."footer.php";?>
    </body>
</html>