<?php
    
    try{
        $conexion = new PDO("mysql:host=localhost; port=3306; dbname=servico1_servicomdb", "servico1_wp804", "1pBS)5m3!x");
        $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);


    }catch(PDOException $error){
    echo $error->getMessage(); 
    die();
    }
 
?>