<?php

include "config.php";

  $received_data = json_decode(file_get_contents("php://input"));
  $idJoueur = $received_data->idJoueur;
  $request = $received_data->request;

if($request==0){

  $req = $linkpdo->prepare("SELECT * FROM HISTORIQUE_TAILLE_POIDS WHERE idJoueur=:idJoueur ORDER BY dateTaillePoids ASC");

}elseif($request==1){

  $req = $linkpdo->prepare("SELECT * FROM HISTORIQUE_PERF WHERE idJoueur=:idJoueur ORDER BY datePerf ASC ");

}

$req -> execute(['idJoueur'=> $idJoueur]);
$messages = $req->fetchAll();

echo json_encode($messages);
exit;