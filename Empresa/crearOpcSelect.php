<?php

    require ("conexion.php");

    $resp = $conexion->query("SELECT * FROM empresas") or die(print($conexion->errorInfo()));
    $data = [];

    while($item = $resp->fetch(PDO::FETCH_OBJ)){
        $data[] = [
            "ID" => $item->ID,
            "Nombre" => $item->Nombre
        ];
    }
            
    echo json_encode($data);
?>