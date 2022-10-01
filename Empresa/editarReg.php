<?php

    require ("conexion.php");

    $data = file_get_contents("php://input");

    $pdo = $conexion->prepare("SELECT * FROM empresas WHERE ID = :ID");

    $pdo->bindParam(":ID", $data);
    $pdo->execute() or die(print($pdo->errorInfo()));

    $res = $pdo->fetch(PDO::FETCH_ASSOC);
    
    echo json_encode($res);






?>
