<?php

include "config.php";

  $received_data = json_decode(file_get_contents("php://input"));
  $idJoueur = $received_data->idJoueur;


  // 1. On requête la base de données pour sortir les 20 derniers messages
  $req = $linkpdo->prepare("SELECT * FROM HISTORIQUE_PERF WHERE idJoueur=:idJoueur ORDER BY datePerf DESC LIMIT 1 ");
  
  $req -> execute(['idJoueur'=> $idJoueur]);
  // 2. On traite les résultats
  $messages = $req->fetchAll();
  // 3. On affiche les données sous forme de JSON
  
  echo json_encode($messages);
exit;