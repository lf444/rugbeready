<?php

    include "config.php";
    $received_data = json_decode(file_get_contents("php://input"));

    $data = array();
    $data = array(
        ':dateBlessure' => $received_data->dateBlessure,
        ':tempsRepos' => $received_data->tempsRepos,
        ':typeBlessure' => $received_data->typeBlessure,
        ':contextBlessure' => $received_data->contextBlessure,
        ':idJoueur' => $received_data->idJoueur,
    );
    
    $req = $linkpdo->prepare('INSERT INTO BLESSURE(dateBlessure,tempsRepos,typeBlessure,contextBlessure,idJoueur) 
                                VALUES(:dateBlessure,:tempsRepos,:typeBlessure,:contextBlessure,:idJoueur)'); 
    ///Exécution de la requête
    $req->execute($data); 
    
    $output = array(
        'message' => 'Data Inserted'
    );
    
    echo json_encode($output);




exit;