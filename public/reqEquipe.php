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
    $req = $linkpdo->prepare("SELECT JOUEUR.idJoueur, nom, prenom, poste, ADDDATE(MAX(dateBlessure), INTERVAL tempsRepos DAY) as dateFinBlessure
                                FROM JOUEUR, BLESSURE
                                WHERE JOUEUR.idEquipe=:idEquipe
                                AND JOUEUR.idJoueur = BLESSURE.idJoueur
                                GROUP BY JOUEUR.idJoueur ");
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
    $req = $linkpdo -> prepare('UPDATE JOUEUR SET idEquipe=NULL WHERE idJoueur=:idJoueur');
	$req -> execute(array('idJoueur'=> $idJoueur));

}elseif($request==5){

    //recup tous les joueurs sans equipe (idEquipe IS NULL)
    $req = $linkpdo -> prepare('SELECT nom, prenom, poste, idJoueur FROM JOUEUR WHERE idEquipe IS NULL');
	$req -> execute();

}elseif($request==6) {
    
    //recup le last joueur créé
    $req = $linkpdo->prepare('SELECT idJoueur FROM JOUEUR ORDER BY idJoueur DESC LIMIT 1');
    $req->execute();

}elseif($request==7){

    //insert une ligne dans blessur pour un nouveau joueur
    $idJoueur = $received_data->id;
    $req = $linkpdo->prepare('INSERT INTO BLESSURE(idJoueur) VALUES(:idJoueur)');
    $req->execute(array('idJoueur'=> $idJoueur));

}

$messages = $req->fetchAll();
echo json_encode($messages);
exit;