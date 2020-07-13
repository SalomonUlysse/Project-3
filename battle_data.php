<?php
    try
    {
        $user = "root";
        $pass = "";
        $conn = new PDO("mysql:host=localhost; dbname=project3",$user, $pass);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        //$sql = "CREATE DATABASE lab11";
        //$conn->exec($sql);
        echo "Database was successfully created.";

        $connString = "mysql:host=localhost;dbname=project3";
        $pdo = new PDO($connString, $user, $pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "CREATE TABLE userData (
                id INT(10) AUTO_INCREMENT PRIMARY KEY,
                firstName VARCHAR(20),
                lastName VARCHAR(20),
                username VARCHAR(20),
                password VARCHAR(20)
                )";

        $pdo->exec($sql);
		$result=$conn->query($sql);
        echo "Table was successfully created.";
		echo json_encode($result->fetchAll());
    }
    catch(PDOException $e)
    {
        die($e->getMessage());
    }

    $connString = null;
    $pdo = null;

?>