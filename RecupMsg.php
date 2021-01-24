<?php
include('confsql.php');
include('connectsql.php');
 extract($_GET);


  // 1. On requête la base de données pour sortir les 20 derniers messages
  $resultats = $linkpdo->query("SELECT * FROM Message ORDER BY 1 DESC  LIMIT 10");
  // 2. On traite les résultats
  $messages = $resultats->fetchAll();
  // 3. On affiche les données sous forme de JSON
  echo json_encode($messages);


  ?>