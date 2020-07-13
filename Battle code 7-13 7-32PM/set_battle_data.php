<?php
//Now all I need to do is pass the JS variables into here.
 header("Access-Control-Allow-Origin: *");

    try
    {
        $user = "root";
        $pass = "";
        $conn = new PDO("mysql:host=localhost; dbname=project3",$user, $pass);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        //$sql = "CREATE DATABASE lab11";
        //$conn->exec($sql);
        

        $connString = "mysql:host=localhost;dbname=project3";
        $pdo = new PDO($connString, $user, $pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		
		//These variables will be passed in through the JS file.
		$id=0;
		$trainerno=$_GET["trainerno"];
		$dexnum=$_GET["dexnum"];
		$level=$_GET["level"];
		$type1="";
		$hp=0;
		$attack=$_GET["attack"];
		$defense=$_GET["defense"];
		$specialattack=$_GET["specialattack"];
		$specialdefense=$_GET["specialdefense"];
		$speed=$_GET["speed"];
		$exp=$_GET["exp"];
		
		echo "HERE IS MY EXPPP!!!!!\n";
		echo $exp;
	//SELECT max(trainerid) FROM hasteam
	//then SELECT * FROM hasteam WHERE trainerid=?

	  $sql = "INSERT INTO `hasteam` VALUES(
	  ${id},
	  ${trainerno},
	  ${dexnum},
	  ${level},
	  ${hp},
	  ${attack},
	  ${defense},
	  ${specialattack},
	  ${specialdefense},
	  ${speed},
	  ${exp}
	)";
			

        $pdo->exec($sql);
		//$result=$conn->query($sql);
        
		//echo json_encode($result->fetchAll());
    }
    catch(PDOException $e)
    {
        die($e->getMessage());
    }

    $connString = null;
    $pdo = null;

?>