<?php

    include "config.php";
    $received_data = json_decode(file_get_contents("php://input"));
    $idJoueur = $received_data->id;


    $req = $linkpdo -> prepare('DELETE FROM JOUEUR WHERE idJoueur=:idJoueur');

    ///Exécution de la requête
	$req -> execute(array('idJoueur'=> $idJoueur));
    
    $output = array(
        'message' => 'Data Deleted'
    );
    
    echo json_encode($output);




exit;