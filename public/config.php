<?php

$host = "rugbergroot.mysql.db";
$user = "rugbergroot";
$password = "NgpvyJZN3YFdvpy";
$dbname = "rugbergroot";

// $host = "217.69.7.161";
// $user = "root";
// $password = "123";
// $dbname = "uers";

    try {

        $linkpdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);

        $linkpdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    } catch (Exception $e) { 

        die('Erreur : '. $e->getMessage()); 

    }

?>