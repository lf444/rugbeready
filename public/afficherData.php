<?php

include "config.php";
  $received_data = json_decode(file_get_contents("php://input"));
  $request = $received_data->request;

  if($request==0){
  // 1. On requête la base de données 
  $req = $linkpdo->query("SELECT * FROM EQUIPE ");

  }elseif($request==1){

    $idEquipe = $received_data->idEquipe;
    // 1. On requête la base de données 
    $req = $linkpdo->prepare("SELECT * FROM JOUEUR WHERE idEquipe=:idEquipe");
    $req -> execute(['idEquipe'=> $idEquipe]);

  }elseif($request==2){

    $idJoueur = $received_data->idJoueur;
    // 1. On requête la base de données
    $req = $linkpdo->prepare("SELECT * FROM JOUEUR WHERE idJoueur=:idJoueur");
    $req -> execute(['idJoueur'=> $idJoueur]);

  };


  // 2. On traite les résultats
  $messages = $req->fetchAll();

  // 3. On affiche les données sous forme de JSON
  echo json_encode($messages);
exit;