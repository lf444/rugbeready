<?php

include "config.php";

  $received_data = json_decode(file_get_contents("php://input"));
  $idJoueur = $received_data->idJoueur;

  $res=$linkpdo->prepare('SELECT COUNT(*) FROM BLESSURE WHERE BLESSURE.idJoueur=:idJoueur');
  $res -> execute (array('idJoueur'=>$idJoueur));
  $rowAll = $res->fetchAll(PDO::FETCH_COLUMN, 0);
  
  if($rowAll[0]==0){
    $data = array();
    $data = array(
        ':tempsRepos' => 0,
        ':dateBlessure' => date("Y-m-d"),
        ':typeBlessure' =>"/",
        ':contextBlessure' => "/",
        ':idJoueur' =>$received_data->idJoueur,
    );

    $req = $linkpdo->prepare('INSERT INTO BLESSURE(dateBlessure,tempsRepos,typeBlessure,contextBlessure,idJoueur) 
    VALUES(:dateBlessure,:tempsRepos,:typeBlessure,:contextBlessure,:idJoueur)'); 
      ///Exécution de la requête
      $req->execute($data);   
  }

 
  // 1. On requête la base de données pour sortir les 20 derniers messages
  $req = $linkpdo->prepare("SELECT * FROM BLESSURE WHERE idJoueur=:idJoueur ORDER BY dateBlessure DESC LIMIT 1 ");
  
  $req -> execute(['idJoueur'=> $idJoueur]);
  // 2. On traite les résultats
  $messages = $req->fetchAll();
  // 3. On affiche les données sous forme de JSON
  
  echo json_encode($messages);
exit;