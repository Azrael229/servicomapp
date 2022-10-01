<?php

$empresa = isset($_POST["Empresa"]) ? $_POST["Empresa"] : "";
$telefono = isset($_POST["telEmp"]) ? $_POST["telEmp"] : "";
$direccion = isset($_POST["dirEmp"]) ? $_POST["dirEmp"] : "";
$ciudad = isset($_POST["cdEmp"]) ? $_POST["cdEmp"] : "";
$estado = isset($_POST["edoEmp"]) ? $_POST["edoEmp"] : "";

    
    if($empresa =="" || $telefono =="" || $direccion =="" || $ciudad =="" || $estado =="" ){
        echo json_encode("false");  

    }else{

        if(empty($_POST['id'])){
            require ("conexion.php");  
            $pdo = $conexion->prepare("INSERT INTO empresas(Nombre, Telefono, Direccion, Ciudad, Estado) VALUES(?,?,?,?,?)");
            $pdo->bindParam(1, $empresa);
            $pdo->bindParam(2, $telefono);
            $pdo->bindParam(3, $direccion);
            $pdo->bindParam(4, $ciudad);
            $pdo->bindParam(5, $estado);
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
 
