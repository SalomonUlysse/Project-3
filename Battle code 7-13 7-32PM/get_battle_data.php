<?php
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

        $sql = "SELECT * FROM `hasteam`";

        $pdo->exec($sql);
		$result=$conn->query($sql);
        
		echo json_encode($result->fetchAll());
    }
    catch(PDOException $e)
    {
        die($e->getMessage());
    }

    $connString = null;
    $pdo = null;

?>