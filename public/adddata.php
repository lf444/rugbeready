<?php

    include "config.php";
    $received_data = json_decode(file_get_contents("php://input"));
    $request = $received_data->request;
    $data = array();


    if($request==0){
        
        //Ajout d'équipe
        $data = array(
            ':nom' => "nouvelle",
    
        );
        
        $req = $linkpdo->prepare('INSERT INTO EQUIPE(nom) 
                                    VALUES(:nom)'); 


    }elseif($request==1){

        //Ajout de joueur
        $data = array(
            ':nom' => $received_data->nom,
            ':poste' => $received_data->poste,
            ':prenom' => $received_data->prenom,
            ':idEquipe' => $received_data->idEquipe,
            ':dateNaissance' => $received_data->dateNaissance,
        );
        
        $req = $linkpdo->prepare('INSERT INTO JOUEUR(nom,poste,prenom,idEquipe,dateNaissance) 
                                    VALUES(:nom,:poste,:prenom,:idEquipe,:dateNaissance)'); 
    };

    ///Exécution de la requête
    $req->execute($data); 
    
    //reponse
    $output = array(
        'message' => 'Succes'
    );   
    echo json_encode($output);

exit;