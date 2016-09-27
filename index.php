
<!DOCTYPE html>
<html>
    <head>
    <meta charset="UTF-8">    
    <?php $rootpath="page/_layout/"; ?>
    <?php $scriptroot=""; ?>   

    <?php include $rootpath."scriptref.php";?>

     <script src="<?=$scriptroot?>js/pageSponsor.js"></script>
     <script src="<?=$scriptroot?>js/pageNews.js"></script>
     <script src="<?=$scriptroot?>js/pageGallery.js"></script>
     <script src="<?=$scriptroot?>js/pageMatches.js"></script>
    </head>
<body>
<?php include $rootpath."header.php";?>

    
    <div class="kudo-contents oza-body">
        <div class="container">
            <div class="row">
                <div class="col-md-9 left-con">
                    <div class="row">
                        <div class="home-newsSlider col-sm-12">
                            
                        </div>
                        <div class="home-gallerySlider col-sm-12">
                            
                        </div>
                        <div class="home-sponsor col-sm-12 text-center">
                            
                        </div>
                        <div class="home-contact col-sm-12 text-center">
                            <p>xxxx</p>
                            <p>xxxxxx</p>
                            <p>xxxxxxxx</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 right-con">
                    <div class="right-sponser">
                        <img src="<?=$scriptroot?>uploads/gallery/popsicle-stick-1631412__180.jpg"></img>
                    </div>
                    <div class="right-latestmatch">
                        
                    </div>
                    <div class="right-nextmatch">
                        
                    </div>
                </div>
            </div>
        </div>        
    </div>     
    <div class="sponsortmp hidden">
        <img class="spon-img" title="{0}" src="{1}"/>
    </div> 
     <div class="hommatchtmp hidden">
         <div class="matchContainer">
            <div class="row">
                <div class="col-xs-6 text-left">รายการ</div>
                <div class="col-xs-6 text-right">{0}</div>
            </div>
            <div class="row">
                <div class="col-xs-12 text-center">รอบ</div>
                <div class="col-xs-12 text-center">{1}</div>
            </div>
            <div class="row">
                <div class="col-xs-4 text-center pad-right-0">
                    <img src="{2}" class="home-imgteam" />
                            <br/>
                     <span class="col-sm-12">{3}</span>
                </div>
                <div class="col-xs-4 text-center">{4}</div>
                <div class="col-xs-4 text-center pad-left-0">
                     <img src="{5}" class="home-imgteam" />
                            <br/>
                     <span class="col-sm-12">{6}</span>
                </div>
            </div>
        </div>
    </div> 
    <script type="text/javascript">
            $(function(){
                    $pageSponsor.init();
                    
                    $pageNews.init();
                    $pageNews.sliderNews();
                    
                    $pageGallery.init();
                    $pageGallery.sliderGallery();
                    
                    $pageMatch.init();
                    $pageMatch.latestMatch();
                    $pageMatch.nextMatch();
            });
            $( window ).resize(function() {
             // $( "#log" ).append( "<div>Handler for .resize() called.</div>" );
                this.resizeContainer();
            });
            function resizeContainer(){
                 $(".left-con").height('auto');
                  $(".right-con").height('auto');
                if($( document ).width()>=992){
                var lefcon = $(".left-con").height();
                var rightcon = $(".right-con").height();
                if(lefcon < rightcon){
                    var $lefcon = $(".left-con");
                    var finalheight = rightcon - parseFloat($lefcon.css('padding-top'))-parseFloat($lefcon.css('padding-bottom')); 
                    $(".left-con").height(finalheight);
                }
                else if(lefcon > rightcon){
                    var $rigthcon =  $(".right-con");
                    var finalheight = lefcon - parseFloat($rigthcon.css('padding-top'))-parseFloat($rigthcon.css('padding-bottom')); 
                    $(".right-con").height(finalheight);
                }
                }
                setTimeout(resizeContainer, 1000);
                
            }
    </script>

<?php include $rootpath."footer.php";?>
    </body>
</html>