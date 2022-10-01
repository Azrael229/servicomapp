<?php

    require ("conexion.php");

    $resp = $conexion->query("SELECT * FROM personas") or die(print($conexion->errorInfo()));
    $data = [];

    while($item = $resp->fetch(PDO::FETCH_OBJ)){
        $data[] = [
            "ID" => $item->ID,
            "Nombre" => $item->Nombre,
            "Telefono" => $item->Telefono,
            "Correo" => $item->Correo,
            "Departamento" => $item->Departamento,
            "Empresa" => $item->Empresa_ID
        ];
    }
            
    echo json_encode($data);
?>