<?php

$host = "localhost";    /* Host name */
$user = "root";         /* User */
$password = "";         /* Password */
$dbname = "rugbergroot";   /* Database name */

    try {
        $linkpdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
        $linkpdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (Exception $e) { 
        die('Erreur : '. $e->getMessage()); 
    }
