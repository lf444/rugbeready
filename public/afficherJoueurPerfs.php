<?php

include "config.php";

  $received_data = json_decode(file_get_contents("php://input"));
  $idJoueur = $received_data->idJoueur;


  $res=$linkpdo->prepare('SELECT COUNT(*) FROM HISTORIQUE_PERF WHERE HISTORIQUE_PERF.idJoueur=:idJoueur');
  $res -> execute (array('idJoueur'=>$idJoueur));
  $rowAll = $res->fetchAll(PDO::FETCH_COLUMN, 0);
 
  if($rowAll[0]==0){
    $data = array();
    $data = array(
        ':tirage' => 0,
        ':datePerf' => date("Y-m-d"),
        ':squat' =>0,
        ':dcouche' => 0,
        ':idJoueur' =>$received_data->idJoueur,
    );
    $req = $linkpdo->prepare('INSERT INTO HISTORIQUE_PERF(tirage,datePerf,squat,dcouche,idJoueur) 
                                VALUES(:tirage,:datePerf,:squat,:dcouche,:idJoueur)'); 
    ///Exécution de la requête
    $req->execute($data); 
  
    
  }

  // 1. On requête la base de données pour sortir les 20 derniers messages
  $req2 = $linkpdo->prepare("SELECT * FROM HISTORIQUE_PERF WHERE idJoueur=:idJoueur ORDER BY 1 DESC LIMIT 1 ");
  
  $req2 -> execute(['idJoueur'=> $idJoueur]);
  // 2. On traite les résultats
  $messages2 = $req2->fetchAll();
  // 3. On affiche les données sous forme de JSON
  
  echo json_encode($messages2);

exit;