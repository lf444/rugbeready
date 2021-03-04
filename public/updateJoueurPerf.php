<?php

    include "config.php";
    $received_data = json_decode(file_get_contents("php://input"));

    $data = array();
    $data = array(
        ':tirage' => $received_data->tirage,
        ':datePerf' => $received_data->datePerf,
        ':squat' => $received_data->squat,
        ':dcouche' => $received_data->dcouche,
        ':idJoueur' => $received_data->idJoueur,
    );
    
    $req = $linkpdo->prepare('INSERT INTO HISTORIQUE_PERF(tirage,datePerf,squat,dcouche,idJoueur) 
                                VALUES(:tirage,:datePerf,:squat,:dcouche,:idJoueur)'); 
    ///Exécution de la requête
    $req->execute($data); 
    
    $output = array(
        'message' => 'Data Inserted'
    );
    
    echo json_encode($output);




exit;