<?php
 
$conn = new PDO("mysql:host=localhost;dbname=project3", "root", "", array(
    PDO::ATTR_PERSISTENT => true
));
 
$sql = "SELECT * FROM pokemon";
$result = $conn->query($sql);
 
echo json_encode($result->fetchAll());
 
?>