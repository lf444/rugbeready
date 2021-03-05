<?php

include "config.php";

  $received_data = json_decode(file_get_contents("php://input"));
  $idJoueur = $received_data->idJoueur;

  $res=$linkpdo->prepare('SELECT COUNT(*) FROM HISTORIQUE_TAILLE_POIDS WHERE HISTORIQUE_TAILLE_POIDS.idJoueur=:idJoueur');
  $res -> execute (array('idJoueur'=>$idJoueur));
  $rowAll = $res->fetchAll(PDO::FETCH_COLUMN, 0);

  if($rowAll[0]==0){

    $data2 = array();
    $data2 = array(
        ':poids'    =>0,
        ':taille'   => 0,
        ':idJoueur' => $received_data->idJoueur,
        ':dateTaillePoids'=>date("Y-m-d"),
    );
    $req2 = $linkpdo->prepare('INSERT INTO HISTORIQUE_TAILLE_POIDS(taille,poids,dateTaillePoids,idJoueur) VALUES(:taille,:poids,:dateTaillePoids,:idJoueur)'); 
    ///Exécution de la requête
    $req2->execute($data2); 
  
    
  }

  // 1. On requête la base de données pour sortir les 20 derniers messages
  $req = $linkpdo->prepare("SELECT * FROM HISTORIQUE_TAILLE_POIDS WHERE idJoueur=:idJoueur ORDER BY dateTaillePoids DESC LIMIT 1 ");
  
  $req -> execute(['idJoueur'=> $idJoueur]);
  // 2. On traite les résultats
  $messages = $req->fetchAll();
  // 3. On affiche les données sous forme de JSON
  
  echo json_encode($messages);
exit;