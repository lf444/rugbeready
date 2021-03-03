<?php

include "config.php";

  $received_data = json_decode(file_get_contents("php://input"));
  $idEquipe = $received_data->idEquipe;


  // 1. On requête la base de données pour sortir les 20 derniers messages
  $req = $linkpdo->prepare("SELECT * FROM JOUEUR WHERE idEquipe=:idEquipe");
  
  $req -> execute(['idEquipe'=> $idEquipe]);
  // 2. On traite les résultats
  $messages = $req->fetchAll();
  // 3. On affiche les données sous forme de JSON
  
  echo json_encode($messages);
exit;