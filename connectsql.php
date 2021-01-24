<?php 
include('confsql.php');	
    try {
        $linkpdo = new PDO("mysql:host=$server;dbname=$db", $login, $mdp);
        $linkpdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (Exception $e) { 
        die('Erreur : '. $e->getMessage()); 
    }
?>