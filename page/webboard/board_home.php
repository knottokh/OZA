
<!DOCTYPE html>
<html>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <head>
    <?php $rootpath="../_layout/"; ?>
    <?php $scriptroot="../"; ?>   

    <?php include $rootpath."scriptref.php";?>
    <?php include "../../php/session.php";?>

    <script src="<?=$scriptroot?>js/webboard.js"></script>
    </head>
<body>
<?php include $rootpath."header.php";?>

<session name="Board List">
  <table width="980" align="center" style="border-bottom:2px; border-bottom-style: double; ">
      <tr style="font-weight:bold; color:#FFFFFF; ">
        <td width="832">
    <a href="webboard/index.php" title="หน้าแรกเว็บ หวยหุ้น ดอทคอม">หน้าแรก</a> <img src="<?=$scriptroot?>images/icon/next.jpg" width="12" height="12" align="baseline"> 
    <a href="<?=$_SESSION["board_name"]."_".$_SESSION["board_id"]?>.html" title=""><?=$_SESSION["board_name"];?></a>
    <?php if($_SESSION["action"]=="Add") echo ' <img src="<?=$scriptroot?>images/icon/next.jpg" width="12" height="12" align="baseline"> <a href="">เริ่มหัวข้อใหม่</a>';?>
    <?php if($_SESSION["post_id"]!=""){?>
      <img src="<?=$scriptroot?>images/icon/next.jpg" width="12" height="12" align="baseline"><a href="<?=$_SESSION["board1_title"]."_".$_SESSION["board_id"]."_".$_SESSION["post_id"]?>_Detail.html" title="<?=$_SESSION["board1_title"]?>"><?=$_SESSION["board1_title"]?></a>
    <?php }?>
    </td>
        <td width="136" align="right" style="padding-right:5px; "><?php if($user_id!=""){?><img src="images/add.jpg" width="14" height="14"> <a href="webboard/board_home.php?board_id=<?=$_SESSION["board_id"]?>&action=Add">เริ่มหัวข้อใหม่</a><?php }?></td>
      </tr>
  </table>

 
  <table class="boardarea" width="980" align="center">
    <tr>
      <td class="appendtopic">

      </td>
    </tr>
    <tr>
      <td>

    </td>
    </tr>

  </table>

  <div class="subboardtmp hidden">
    <table width="100%" class="text_style" style="border-bottom:1px; border-bottom-style:dashed; " align="center">
        <tr>
          <td width="33" style="padding:0px 5px 0px 5px;"><img src="<?=$scriptroot?>/images/icon/new_topic.jpg" width="24" height="24"></td>
          <td width="489" height="50" style="padding:0px 5px 0px 5px;">
      <a href="{0}_{5}_{2}_Detail.html" title="{0}"><b>{0}</b></a><br>
          โดย {3}
      <b></b>&nbsp;เมื่อ    {4}</td>
          <td width="42" style="padding:10px10px; text-align:center">
        </td>
          <td width="165" align="center">
      อ่าน <b>{1}</b> / 
      ตอบ <b boardid={2}></b>
      </td>
      <td width="177" style="padding:5px 5px; " boardid={2}>

      </td>
          <td width="46" align="center">
               <a href=""><img src="<?=$scriptroot?>/images/icon/last_post.png" width="20" height="20" border="0"></a>   

               </td>
          </tr>
      </table>
  </div>
  <div class="notopicfoundtmp hidden">
     <table width="980">
        <tr style="font-weight:bold;">
          <td width="741"> <span style="font-size:18px; padding-left:40px; ">ยังไม่มีกระทู้ในหมวดนี้</span></td>
          <td width="227" align="center"><span style="font-size:18px; ">0 กระทู้</span><br><span style="font-size:18px; ">0 หัวข้อ</span></td>
        </tr>
      </table>  
  </div>
  <div class="lastedAnswer hidden">
          <span>
              ตอบล่าสุด โดย <b>{0}</b><br>
              เมื่อ {1}
                  </span>
  </div>
</session>
<session name="Board Details">
    <br/>
    <div class="forumDetailsDeiplay">
      
    </div>
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
            <tbody></tbody>
        </table>
    </div>
    <div class="paging clearfix">
        <ul class="pagination hidden"></ul>
    </div>
</div>
<div id="tblRoleListDataTask" class="tblRoleListDataTask hidden">
    <table>
        <tbody>
            <tr>
                <td>
                  <table width="980" border="0" align="center" cellpadding="0" cellspacing="0" class="table_border">
                      <tbody>
                            <tr height="30" class="text_style">
                          <td width="180" align="center"  class="border_head" style="border-right:1px; border-right-style:dashed; " >ผู้ติดตาม</td>
                          <td width="519" height="29"  align="left" class="border_head" style="padding-left:10px; ">เมื่อ {0}</td>
                            <td width="289" align="right" class="border_head" style="padding-right:10px;">
                              <div class="">
                              <a href="" title="ตอบกลับโดยอ้างถึงความเห็นนี้">Reply</a> &nbsp;|&nbsp;
                              <a href="" title="แก้ไขความเห็นนี้">Edit</a> &nbsp;|&nbsp;
                              <a href="" title="ลบความเห็นนี้" onClick="return chkdel();">Delete</a> 
                             </div> 
                              <a class="" href="" title="ตอบกลับโดยอ้างถึงความเห็นนี้">Reply</a>
                              ...

                          </td>
                        </tr>
                        <tr>
                          <td colspan="3" class="dot_line_horizon" height="3"></td>
                        </tr>
                        <tr  width="120" valign="top">
                          <td align="center" background="images/bg_table3.png"  style="border-right:1px; border-right-style:dashed; ">

                          <img src="<?=$scriptroot?>images/user_pic/{3}" width='100' height='100' border='0' title="สัตว์เลี้ยงของ {1}">

                        <br>
                        <b style="color:#009900; ">{1}</b> </td>
                          <td colspan="2" align="left" valign="top" background="images/bg_table3.png" style="padding:10px 10px;">
                        <div class="post">{2}
                        <br>
                        </div>  </td>
                        </tr>
                        <tr>
                          <td height="3" align="center"  style="border-right:1px; border-right-style:dashed;">
                          </td>
                          <td colspan="2"  align="right" style="padding:5px 5px;">
                            <div class="">
                            <img src="<?=$scriptroot?>images/icon/del.jpg" width="9" height="9" border="0"> 
                            <img src="images/del.jpg" width="9" height="9" border="0"> 
                            <a href="#" onClick="" title="แจ้งลบคอมเม้นท์นี้">แจ้งลบคอมเม้นท์นี้</a>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</div>

<div class="TopicDetailsTmp hidden">
    <table width="980" border="0" align="center" cellpadding="0" cellspacing="0" class="table_border">
      <tbody>
        <tr height="30" class="text_style">
          <td height="29" colspan="3" align="center"  class="h_text"  style="border-right:1px; border-right-style:dashed; ">:: {0}:: </td>
        </tr>
            <tr height="30" class="text_style">
          <td width="180" align="center"  class="border_head" style="border-right:1px; border-right-style:dashed; " >ผู้ก่อตั้งกระทู้นี้</td>
          <td width="519" height="29"  align="left" class="border_head" style="padding-left:10px; ">เมื่อ {1}</td>
          <td width="289" align="right" class="border_head" style="padding-right:10px;">
          <a class="{10}" href="board_home.php?board_id=<?=$_SESSION["board_id"]?>&post_id=<?=$_SESSION["post_id"]?>&action=Edit" title="แก้ไขความเห็นนี้">Edit</a>
          ...
        </td>
        </tr>
        <tr>
          <td colspan="3" class="dot_line_horizon" height="3"></td>
        </tr>
        <tr  width="120" valign="top">
          <td align="center" background="images/bg_table3.png"  style="border-right:1px; border-right-style:dashed; ">

          <img src="<?=$scriptroot?>images/user_pic/{4}" width='100' height='100' border='0' title="สัตว์เลี้ยงของ {2}">

        <br>
        <b style="color:#009900; ">{2}</b> </td>
          <td colspan="2" align="left" valign="top" background="images/bg_table3.png" style="padding:10px 10px;">
        <div class="post">{3}
        <br>
        </div>  </td>
        </tr>
        <tr>
          <td height="3" align="center"  style="border-right:1px; border-right-style:dashed;">
            <div class="{5}">
                <a class="{6}" href="body.php?board_id=<?=$_SESSION["board_id"]?>&action=&submit=Update&post_id=<?=$_SESSION["post_id"]?>&update_status=No"><img src="<?=$scriptroot?>images/icon/lock_x.gif" border="0"></a>
                <a class="{7}" href="body.php?board_id=<?=$_SESSION["board_id"]?>&action=&submit=Update&post_id=<?=$_SESSION["post_id"]?>&update_status=Yes"><img src="<?=$scriptroot?>images/icon/lock.gif" border="0"></a>
                <a class="{8}" href="body.php?board_id=<?=$_SESSION["board_id"]?>&action=&submit=Update&post_id=<?=$_SESSION["post_id"]?>&update_mud=No"><img src="<?=$scriptroot?>images/icon/stick_x.gif" border="0"></a>
                <a class="{9}" href="body.php?board_id=<?=$_SESSION["board_id"]?>&action=&submit=Update&post_id=<?=$_SESSION["post_id"]?>&update_mud=Yes"><img src="<?=$scriptroot?>images/icon/stick.gif" border="0"></a>
                <a href="body.php?board_id=<?=$_SESSION["board_id"]?>&action=&submit=Delete&post_id=<?=$_SESSION["post_id"]?>"  OnClick="return chkdel();"><img src="<?=$scriptroot?>images/icon/del.jpg" border="0" title="ลบกระทู้นี้"></a>
            </div>  
          </td>
          <td colspan="2"  align="right" style="padding:5px 5px;">
            <div class="{11}">
            <img src="<?=$scriptroot?>images/icon/del.jpg" width="9" height="9" border="0"> 
            <a href="#" onClick="MM_openBrWindow('delete_board1.php?board1_id=<?=$_SESSION["post_id"]?>&action=confirm&member_id=<?=$_SESSION["user_id"]?>&p=board1','480','400'); return false" title="แจ้งลบคอมเม้นท์นี้">แจ้งลบคอมเม้นท์นี้</a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
</div>
 <div class="ForumDetailsTmp hidden">
    <table width="980" border="0" align="center" cellpadding="0" cellspacing="0" class="table_border">
      <tbody>
            <tr height="30" class="text_style">
          <td width="180" align="center"  class="border_head" style="border-right:1px; border-right-style:dashed; " >ผู้ติดตาม</td>
          <td width="519" height="29"  align="left" class="border_head" style="padding-left:10px; ">เมื่อ {0}</td>
            <td width="289" align="right" class="border_head" style="padding-right:10px;">
              <div class="">
              <a href="" title="ตอบกลับโดยอ้างถึงความเห็นนี้">Reply</a> &nbsp;|&nbsp;
              <a href="" title="แก้ไขความเห็นนี้">Edit</a> &nbsp;|&nbsp;
              <a href="" title="ลบความเห็นนี้" onClick="return chkdel();">Delete</a> 
             </div> 
              <a class="" href="" title="ตอบกลับโดยอ้างถึงความเห็นนี้">Reply</a>
              ...

          </td>
        </tr>
        <tr>
          <td colspan="3" class="dot_line_horizon" height="3"></td>
        </tr>
        <tr  width="120" valign="top">
          <td align="center" background="images/bg_table3.png"  style="border-right:1px; border-right-style:dashed; ">

          <img src="<?=$scriptroot?>images/user_pic/{3}" width='100' height='100' border='0' title="สัตว์เลี้ยงของ {1}">

        <br>
        <b style="color:#009900; ">{1}</b> </td>
          <td colspan="2" align="left" valign="top" background="images/bg_table3.png" style="padding:10px 10px;">
        <div class="post">{2}
        <br>
        </div>  </td>
        </tr>
        <tr>
          <td height="3" align="center"  style="border-right:1px; border-right-style:dashed;">
          </td>
          <td colspan="2"  align="right" style="padding:5px 5px;">
            <div class="">
            <img src="<?=$scriptroot?>images/icon/del.jpg" width="9" height="9" border="0"> 
            <img src="images/del.jpg" width="9" height="9" border="0"> 
            <a href="#" onClick="" title="แจ้งลบคอมเม้นท์นี้">แจ้งลบคอมเม้นท์นี้</a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
</div>
</session>   

<?php include "board_comment.php";?>
        <script type="text/javascript">

                $(function(){
                    $pageEntity.init();
                    $pageWebboard.init('<?=$scriptroot?>'); 

                    <?php if($_SESSION["action"]==""){ ?> 
                      $pageWebboard.displayTopic('<?=$_SESSION["board_id"]?>');
                    <?php } 

                    else if($_SESSION["action"]=="Detail"){ ?> 
       
                      $pageWebboard.detailTopic('<?=$_SESSION["board_id"]?>','<?=$_SESSION["user_id"]?>','<?=$_SESSION["post_id"]?>');
                   

                    <?php } ?>      

                });
        </script>

<?php include $rootpath."footer.php";?>
    </body>
</html>