<?php
		 header('Content-Type: application/json');
		 //change Directory Here

		 $rootdirectory = $_GET["rootpath"]; 
         $pathdirectory = $_GET["folderpath"]; 

  	 $uResult = array();
  	 $uResult['success'] = false;
    if ( 0 < $_FILES['file']['error'] ) {
        $uResult["error"] =  'Error: ' . $_FILES['file']['error'] . '<br>';
    }
    else {
    		
    	
    	//iconv('UTF-8','windows-874',$_FILES['file']['name']);
    			$filename  = $_FILES['file']['name'];
          //iconv('UTF-8','ASCII',$filename);
    		  $filelen = strlen($filename);
    			$indexdot = strripos($filename,".");
    		  $fnonly = substr($filename,0,$indexdot);
          $fnonly = GUID();//mb_convert_encoding($fnonly, "SJIS", "windows-874,UTF-8");//utf8_decode($fnonly);
    			$ftype = substr($filename,$indexdot,$filelen - $indexdot);
    			$currenttime = date_format(new DateTime('NOW',new DateTimeZone('Asia/Bangkok')),"dmYHis");
          $folfilepath = $pathdirectory.$fnonly."_".$currenttime.$ftype;
    			$newFilepath = $rootdirectory.$folfilepath;

        move_uploaded_file($_FILES['file']['tmp_name'],$newFilepath);
       
        	$uResult['filepath'] = $folfilepath;	
          $uResult['success'] = true;
  				
    }
	echo json_encode($uResult);
  function GUID()
    {
        if (function_exists('com_create_guid') === true)
        {
            return trim(com_create_guid(), '{}');
        }

        return sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535));
    }
?>

<?php
   /*  header('Content-Type: application/json');
     //change Directory Here

     $rootdirectory = $_GET["rootpath"]; 
         $pathdirectory = $_GET["folderpath"]; 

     $uResult = array();
     $uResult['success'] = false;
    if ( 0 < $_FILES['file']['error'] ) {
        $uResult["error"] =  'Error: ' . $_FILES['file']['error'] . '<br>';
    }
    else {
        
      
      //iconv('UTF-8','windows-874',$_FILES['file']['name']);
          $filename  = $_FILES['file']['name'];
        $filelen = strlen($filename);
          $indexdot = strripos($filename,".");
         $fnonly = substr($filename,0,$indexdot);
          $ftype = substr($filename,$indexdot,$filelen - $indexdot);
          $currenttime = date_format(new DateTime('NOW',new DateTimeZone('Asia/Bangkok')),"dmYHis");
                $folfilepath = $pathdirectory.$fnonly."_".$currenttime.$ftype;
          $newFilepath = $rootdirectory.$folfilepath;

        move_uploaded_file($_FILES['file']['tmp_name'], iconv('UTF-8','windows-874',$newFilepath));
       
          $uResult['filepath'] = $folfilepath;  
          $uResult['success'] = true;
          
    }
  echo json_encode($uResult);*/
?>