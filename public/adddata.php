<?php

    include "config.php";
    $received_data = json_decode(file_get_contents("php://input"));

    $data = array();
    $data = array(
        ':nom' => $received_data->nom,
        ':poste' => $received_data->poste,
        ':prenom' => $received_data->prenom,
        ':idEquipe' => $received_data->idEquipe,
        ':dateNaissance' => $received_data->dateNaissance,
    );
    
    $req = $linkpdo->prepare('INSERT INTO JOUEUR(nom,poste,prenom,idEquipe,dateNaissance) 
                                VALUES(:nom,:poste,:prenom,:idEquipe,:dateNaissance)'); 
    ///Exécution de la requête
    $req->execute($data); 
    
    $output = array(
        'message' => 'Data Inserted'
    );
    
    echo json_encode($output);




exit;