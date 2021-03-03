<?php

include "config.php";



  // 1. On requête la base de données pour sortir les 20 derniers messages
  $resultats = $linkpdo->query("SELECT * FROM EQUIPE ");
  // 2. On traite les résultats
  $messages = $resultats->fetchAll();
  // 3. On affiche les données sous forme de JSON




echo json_encode($messages);
exit;