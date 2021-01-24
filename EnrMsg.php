<?php
include('confsql.php');
include('connectsql.php');
 extract($_GET);

 

 	$Estampille =  date("Y-m-d H:i"); 


 	$res=$linkpdo->prepare('SELECT COUNT(*) FROM Message WHERE Auteur=:Auteur AND Contenu=:Contenu AND Estampille=:Estampille');

	  ///Exécution de la requête
    $res->execute(array(
                        'Auteur'          => $Auteur,
                        'Contenu'     	  => $Contenu,
                        'Estampille'      => $Estampille)); 

	$rowAll = $res->fetchAll(PDO::FETCH_COLUMN, 0);
	
	if( $rowAll[0]==0){



    $req = $linkpdo->prepare('INSERT INTO Message(Auteur,Contenu,Estampille) 
                            VALUES(:Auteur,:Contenu,:Estampille)'); 
    ///Exécution de la requête
    $req->execute(array(
                        'Auteur'          => $Auteur,
                        'Contenu'     	  => $Contenu,
                        'Estampille'      => $Estampille)); 

  // 3. Donner un statut de succes ou d'erreur au format JSON
 	 echo json_encode(["status" => "success"]);
	}else{
	 echo json_encode(["status" => "error"]);
	}


?>  
