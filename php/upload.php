<?php

		 
		 header('Content-Type: application/json');
		 
	//	 $root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';
		 $rootdirectory = $_GET["rootpath"]; 
		 $pathdirectory = $_GET["folderpath"]; 
		 
         require $rootdirectory.'vendor/autoload.php';
		 //change Directory Here
            $uResult = array();
  	        $uResult['success'] = false;
  	        $errormsg = '';
		use Aws\S3\S3Client;

       $keyname = 'AKIAIYRZRMIZROLSMLZQ';
       $bucketname = 'ozauploads';
       try{
           $s3 = S3Client::factory(array(
               // 'credentials' => $credentials,
                'region'  => 'ap-southeast-1',
                'version' => 'latest',
                 'credentials' => [
                        'key'    => $keyname,
                        'secret' => 'xbPw/V0mkv6GNc7PMRqPxBp5Lj2HEvNlRXVwV+Js'
                    ]
            ));
            $result = $s3->listBuckets(array());
            foreach ($result['Buckets'] as $bk) {
                if($bk['Name'] == 'ozauploads'){
                    $bucket= $bk;
                }
               // echo $bucket['Name'], PHP_EOL;
            }
            //$client = $s3->get('S3');
            //$result = $s3->listBuckets();
           // $bucket = $result.buckets['ozauploads'] 
           // $bucket = $client->getObject(array(
           //     'Bucket' => $bucketname,
           //     'Key'    => $keyname
           // ));
          //  $bucket = getenv('S3_BUCKET');
           // $errormsg.= "\n".$result;
       }
       catch(Exception $e) { 
             $errormsg.= "\n".$e->getMessage();
      }
            		    
            	
      //

    if(isset($pathdirectory)){
              	      	 if(isset($_FILES['file'])){
            if ( 0 < $_FILES['file']['error'] ) {
                $errormsg.= "\n".'Error: ' . $_FILES['file']['error'] . '<br>';
            }
            else {
            		if( is_uploaded_file($_FILES['file']['tmp_name'])){
            		     try {
        // FIXME: do not use 'name' for upload (that's the original filename from the user's computer)
                      //  $upload = $s3->upload($bucket, $_FILES['file']['name'], fopen($_FILES['file']['tmp_name'], 'rb'), 'public-read');
                        $upload = $s3->putObject(array(
                                'Bucket'       => $bucketname,
                                'Key'          => $pathdirectory.$_FILES['file']['name'],
                                'SourceFile'   => $_FILES['file']['tmp_name'],
                                'ACL'          => 'public-read',
                        ));
                        
                        
                        
                        	$uResult['filepath'] =htmlspecialchars($upload->get('ObjectURL'));
                            $uResult['success'] = true;
            		     
            		    } catch(Exception $e) { 
            		        $errormsg.= "\n".$e->getMessage();
            		    }
            		    
            		}
            		else{
            		    $errormsg.= "\n"."file stream not found";
            		}
            	/*
            	//iconv('UTF-8','windows-874',$_FILES['file']['name']);
            			$filename  = $_FILES['file']['name'];
                  //iconv('UTF-8','ASCII',$filename);
            		  $filelen = strlen($filename);
            			$indexdot = strripos($filename,'.');
            		  $fnonly = substr($filename,0,$indexdot);
            		   iconv('UTF-8','windows-874',$fnonly);
                  //$fnonly = GUID();//mb_convert_encoding($fnonly, "SJIS", "windows-874,UTF-8");//utf8_decode($fnonly);
            			$ftype = substr($filename,$indexdot,$filelen - $indexdot);
            			$currenttime = date_format(new DateTime('NOW',new DateTimeZone('Asia/Bangkok')),"dmYHis");
                  $folfilepath = $pathdirectory.$fnonly."_".$currenttime.$ftype;
            			$newFilepath = $rootdirectory.$folfilepath;
        
                move_uploaded_file($_FILES['file']['tmp_name'],$newFilepath);
               
               
               
                	$uResult['filepath'] = "nono";	
                  $uResult['success'] = true;*/
          				
            }
  	 }
  	 else{
  	      $errormsg.="\n".'file upload not found';
  	 }

  	 }
  	 else{
  	     $errormsg.="\n".'No "S3_BUCKET" config var in found in env!';
  	 }
  	 $uResult["error"]  = $errormsg;
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