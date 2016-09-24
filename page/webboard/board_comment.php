<img src="<?=$scriptroot?>images/icon/bg.gif" height="10">
  
<?php if( $_SESSION["post_id"] != ""){ ?>
<script src="<?=$scriptroot?>lib/nicEdit/nicEdit.js" type="text/javascript"></script>
<script type="text/javascript">
bkLib.onDomLoaded(function() {
    new nicEditor({buttonList : ['bold','italic','underline','ol','ul','fontSize','image','upload','link','unlink','forecolor','xhtml','smile']}).panelInstance('comment');
  });
</script>
<form action="board_home.php?board_id=<?=$board_id?>&post_id=<?=$post_id?>&board2_id=<?=$board2_id?>&submit=<?=$action2?>&action=<?=$action?>" method="post">
<table width="980"  align="center" class="table_border">
  <tr>
    <td colspan="2" class="h_text"><img src="images/add.jpg" width="15" height="17"> ร่วมแสดงความคิดเห็นและให้กำลังใจผู้ตั้งกระทู้นี้... <img src="images/add.jpg" width="15" height="17"></td>
    </tr>
  <tr>
    <td width="253" valign="top" bgcolor="#f8f8f8" align="left"><br>
  <ul>
    <li>สามารถจัดรูปแบบตัวหนังสือ</li>
    <li>เปลี่ยนขนาดของตัวหนังสือ</li>
    <li>ใส่สีให้กับตัวหนังสือ</li>
    <li>ใส่รูปภาพอ้างอิง</li>
    <li>ใส่ลิงค์ให้กับข้อความ</li>
    <li>หลากหลายไอคอนแสดงอารมณ์</li>
    <li>และใส่โค้ดต่าง ๆ เช่น VDO ฯลฯ </li>
    </ul>
  </td>
    <td width="715" bgcolor="#f8f8f8" class="text_style">
        <textarea name="comment" cols="60" id="comment" style="height:150px; width:710px;text-align:left; left:auto; background-color:#f8f8f8;">
<?php 
 if($_SESSION["user_id"]=="")echo "<br><br><b>------ ขอสงวนสิทธิ์การแสดงความคิดเห็น เฉพาะสมาชิกเว็บไซต์ $web_name เท่านั้นครับ ------<b>";
?>
      </textarea>
      </p></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>

    <input name="Submit" type="submit" class="h_text" value="   ตกลง   " <?php if($_SESSION["user_id"]=="")echo "disabled";?>  > 
    <input name="Submit2" type="submit" class="h_text" onClick="" value="  ยกเลิก  "> 
</td>
  </tr>
</table>
</form> 
<?php } ?>
