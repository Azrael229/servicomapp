<?php

    require ("conexion.php");

    $resp = $conexion->query("SELECT * FROM productos") or die(print($conexion->errorInfo()));
    $data = [];

    while($item = $resp->fetch(PDO::FETCH_OBJ)){
        $data[] = [
            "ID" => $item->ID,
            "Nombre" => $item->Nombre,
            "Descripcion" => $item->Descripcion
        ];
    }
            
    echo json_encode($data);
?>
