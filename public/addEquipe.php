<?php

    include "config.php";
    $received_data = json_decode(file_get_contents("php://input"));

    $data = array();
    $data = array(
        ':nom' => $received_data->nom,

    );
    
    $req = $linkpdo->prepare('INSERT INTO EQUIPE(nom) 
                                VALUES(:nom)'); 
    ///Exécution de la requête
    $req->execute($data); 
    
    $output = array(
        'message' => 'Data Inserted'
    );
    
    echo json_encode($output);




exit;