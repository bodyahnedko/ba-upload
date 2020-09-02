<?php
	$ds          = DIRECTORY_SEPARATOR;  //1
	
	$storeFolder = 'uploads/';   //2

	if(!file_exists($storeFolder) && !is_dir($storeFolder)) {
		mkdir($storeFolder);
  }
	
	if (!empty($_FILES)) {
		
	// 	foreach($_FILES['file']['tmp_name'] as $key => $value) {
	// 		$tempFile = $_FILES['file']['tmp_name'][$key];
	// 		$targetFile =  $storeFolder. $_FILES['file']['name'][$key];
	// 		move_uploaded_file($tempFile,$targetFile);
	//   }
		$tempFile = $_FILES['file']['tmp_name'];          //3             
			
		$targetPath = dirname( __FILE__ ) . $ds. $storeFolder . $ds;  //4
		
		$targetFile =  $targetPath. $_FILES['file']['name'];  //5

		move_uploaded_file($tempFile,$targetFile); //6
	}

	
	echo json_encode('done');
	exit();
