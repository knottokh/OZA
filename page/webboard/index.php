
<!DOCTYPE html>
<html>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <head>
    <?php session_start(); ?>
    <?php session_destroy(); ?>
    <?php $rootpath="../_layout/"; ?>
    <?php $scriptroot="../../"; ?>   

    <?php include $rootpath."scriptref.php";?>
    <?php include "../../php/session.php";?>

    <script src="<?=$scriptroot?>js/webboard.js"></script>

    </head>
<body>
<?php include $rootpath."header.php";?>

    
    <div class="roy-contents">
        <div class="container">


  <table class="boardgroup" width="980" align="center" style="border-bottom:2px; border-bottom-style: double; ">
  <tbody>
      
  </tbody>
  </table>  

<table id="boardgroupTmp" class="hidden">
    <tbody>
        <tr style="font-weight:bold; color:#FFFFFF; ">
        <td width="27"><img src="<?=$scriptroot?>images/icon/+.jpg" width="25" height="25"></td>
        <td width="761"> <a href="./" title="{0}">{0}</a></td>
        <td width="176" align="right" style="padding-right:5px; ">&nbsp;</td>
      </tr>
      <tr>
        <td></td>
        <td colspan="2" group={1}>
        </td>
      </tr>
    </tbody>
</table>
<div id="subboard" class="hidden">
    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" class="text_style">
          <tbody>
            <tr valign="top">
              <td width="58" align="center" valign="middle"  style="padding-left:7px; padding-right:3px; padding-top:5px; padding-bottom:5px; ">
              <img src="<?=$scriptroot?>images/icon/new_topic.jpg" width="24" height="24"></td>
              <td width="503"align="left" valign="top"   style="padding:10px 10px 10px 10px;">
              <a href="../{0}_{2}.html" title="&#3610;&#3629;&#3619;&#3660;&#3604;{1}"><b>
                {0}
                </b></a><br>
                {1}
              </td>
              <td width="137" align="center" valign="top"   style="padding:10px 10px 10px 10px;"><b>
                <span totaltopic={2}></span>
                </b> หัวข้อ<br>
                <b>
                <span totalforum={2}></span>
                </b> กระทู้ </td>
              <td width="282" align="center" valign="top"   style="padding:10px 10px 10px 10px;">
                <div lastespost={2}></div>
              </td>
            </tr>
          <td height="2"></tbody>
  </table>
</div>
<div class="lastedAnswer hidden">
        <span>
                ตอบล่าสุด  โดย <b>
                    {0}
                  </b><br>
                ใน <a href="" title="{1}">
                    {1}
                  </a>...<br>

                </span>
</div>
 
        <script type="text/javascript">

                $(function(){
                    $pageEntity.init();
                    $pageWebboard.init('<?=$scriptroot?>');    
                    $pageWebboard.boardGroup(); 
                        });
        </script>

<?php include $rootpath."footer.php";?>
    </body>
</html>