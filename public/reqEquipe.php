<?php

include "config.php";
$received_data = json_decode(file_get_contents("php://input"));
$request = $received_data->request;
$data = array();

if($request==0){

    //recup toutes les equipes
    $req = $linkpdo->query("SELECT * FROM EQUIPE ");

}elseif($request==1){

    //ajout d'une equipe
    $data = array(
        ':nom' => $received_data->nomEquipe,
    );
    $req = $linkpdo->prepare('INSERT INTO EQUIPE(nom) VALUES(:nom)'); 
    $req->execute($data); 

}elseif($request==2){

    //recup joueurs pour une equipe
    $idEquipe = $received_data->idEquipe;
    $req = $linkpdo->prepare("SELECT * FROM JOUEUR WHERE idEquipe=:idEquipe");
    $req -> execute(['idEquipe'=> $idEquipe]);

}elseif($request==3){

    //ajout d'un joueur dans une equipe
    $data = array(
        ':nom' => $received_data->nom,
        ':poste' => $received_data->poste,
        ':prenom' => $received_data->prenom,
        ':idEquipe' => $received_data->idEquipe,
        ':dateNaissance' => $received_data->dateNaissance,
    );
    $req = $linkpdo->prepare('INSERT INTO JOUEUR(nom,poste,prenom,idEquipe,dateNaissance) VALUES(:nom,:poste,:prenom,:idEquipe,:dateNaissance)');
    $req->execute($data); 

}elseif($request==4){

    //enleve un joueur d'une equipe
    $idJoueur = $received_data->id;
    $req = $linkpdo -> prepare('UPDATE JOUEUR SET idEquipe=0 WHERE idJoueur=:idJoueur');
	$req -> execute(array('idJoueur'=> $idJoueur));

}

$messages = $req->fetchAll();
echo json_encode($messages);
exit;