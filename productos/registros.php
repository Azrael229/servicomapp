<?php

$producto = isset($_POST["Producto"]) ? $_POST["Producto"] : "";
$descripcion = isset($_POST["descripProducto"]) ? $_POST["descripProducto"] : "";
    
    if($producto =="" || $descripcion ==""){
        echo json_encode("false");  

    }else{

        if(empty($_POST['id'])){
            require ("conexion.php");  
            $pdo = $conexion->prepare("INSERT INTO productos(Nombre, Descripcion) VALUES(?,?)");
            $pdo->bindParam(1, $producto);
            $pdo->bindParam(2, $descripcion);
            $pdo->execute() or die(print($pdo->errorInfo()));
    
            echo json_encode("true");
        }else{
            $id = $_POST["id"];
            require ("conexion.php");  
            $pdo = $conexion->prepare("UPDATE productos SET Nombre = :nombre, Descripcion = :descripcion WHERE ID = :id");
            $pdo->bindParam(":nombre", $producto);
            $pdo->bindParam(":descripcion", $descripcion);
            $pdo->bindParam(":id", $id);
            $pdo->execute() or die(print($pdo->errorInfo()));
    
            echo json_encode("mod");
        };
    };
       
    
    
    

?>
 
