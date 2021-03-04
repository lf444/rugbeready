<?php

    include "config.php";
    $received_data = json_decode(file_get_contents("php://input"));
    var_dump($received_data);
    $data = array();
    $data = array(
        ':nom' => $received_data->nom,
        ':poste' => $received_data->poste,
        ':prenom' => $received_data->prenom,
        ':idJoueur' => $received_data->idJoueur,
    );
    
    $req = $linkpdo->prepare('UPDATE JOUEUR SET nom=:nom, poste=:poste, prenom=:prenom WHERE idJoueur =:idJoueur'); 
    ///Exécution de la requête
    $req->execute($data); 
    
    $data2 = array();
    $data2 = array(
        ':poids'    => $received_data->poids,
        ':taille'   => $received_data->taille,
        ':idJoueur' => $received_data->idJoueur,
        ':dateTaillePoids'=>date("Y-m-d"),
    );
    $req2 = $linkpdo->prepare('INSERT INTO HISTORIQUE_TAILLE_POIDS(taille,poids,dateTaillePoids,idJoueur) VALUES(:taille,:poids,:dateTaillePoids,:idJoueur)'); 
    ///Exécution de la requête
    $req2->execute($data2); 
    
    $output = array(
        'message' => 'Data Inserted'
    );
    
    echo json_encode($output);




exit;