<?php

$nombre = isset($_POST["nombPersona"]) ? $_POST["nombPersona"] : "";
$telefono = isset($_POST["telPersona"]) ? $_POST["telPersona"] : "";
$correo = isset($_POST["mailPersona"]) ? $_POST["mailPersona"] : "";
$departamento = isset($_POST["deptoPersona"]) ? $_POST["deptoPersona"] : "";
$empresa = isset($_POST["empPersona"]) ? $_POST["empPersona"] : "";

    
    if($empresa =="" || $telefono =="" || $correo =="" || $departamento ==""){
        echo json_encode("false");  

    }else{

        if(empty($_POST['id'])){
            require ("conexion.php");  
            $pdo = $conexion->prepare("INSERT INTO personas(Nombre, Telefono, Correo, Departamento, Empresa_ID) VALUES(?,?,?,?,?)");
            $pdo->bindParam(1, $nombre);
            $pdo->bindParam(2, $telefono);
            $pdo->bindParam(3, $correo);
            $pdo->bindParam(4, $departamento);
            $pdo->bindParam(5, $empresa);
            $pdo->execute() or die(print($pdo->errorInfo()));
    
            echo json_encode("true");
        }else{
            $id = $_POST["id"];
            require ("conexion.php");  
            $pdo = $conexion->prepare("UPDATE personas SET Nombre = :nombre, Telefono = :telefono, Correo = :correo, Departamento = :departamento, Empresa_ID = :empresa WHERE ID = :id");
            $pdo->bindParam(":nombre", $nombre);
            $pdo->bindParam(":telefono", $telefono);
            $pdo->bindParam(":correo", $correo);
            $pdo->bindParam(":departamento", $departamento);
            $pdo->bindParam(":empresa", $empresa);
            $pdo->bindParam(":id", $id);
            $pdo->execute() or die(print($pdo->errorInfo()));
    
            echo json_encode("mod");
        };
    };
       
    
    
    

?>
 
