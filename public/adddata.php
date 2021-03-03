<?php

    include "config.php";
    $received_data = json_decode(file_get_contents("php://input"));

    $data = array();
    $data = array(
        ':nom' => $received_data->nom,
        ':poste' => $received_data->poste,
        ':prenom' => $received_data->prenom,
        ':idEquipe' => $received_data->idEquipe,
    );
    
    $req = $linkpdo->prepare('INSERT INTO JOUEUR(nom,poste,prenom,idEquipe) 
                                VALUES(:nom,:poste,:prenom,:idEquipe)'); 
    ///Exécution de la requête
    $req->execute($data); 
    
    $output = array(
        'message' => 'Data Inserted'
    );
    
    echo json_encode($output);




exit;