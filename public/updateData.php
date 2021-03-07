<?php

    include "config.php";
    $received_data = json_decode(file_get_contents("php://input"));
    $request = $received_data->request;
    $data = array();


    if($request==0){
        $data = array(
            ':nom' => $received_data->nom,
            ':poste' => $received_data->poste,
            ':prenom' => $received_data->prenom,
            ':idJoueur' => $received_data->idJoueur,
        );
        
        $req = $linkpdo->prepare('UPDATE JOUEUR SET nom=:nom, poste=:poste, prenom=:prenom WHERE idJoueur =:idJoueur'); 
        ///Exécution de la requête
        $req->execute($data); 
        
        $data2 = array();
        $data2 = array(
            ':poids'    => $received_data->poids,
            ':taille'   => $received_data->taille,
            ':idJoueur' => $received_data->idJoueur,
            ':dateTaillePoids'=>date("Y-m-d"),
        );
        $req2 = $linkpdo->prepare('INSERT INTO HISTORIQUE_TAILLE_POIDS(taille,poids,dateTaillePoids,idJoueur) VALUES(:taille,:poids,:dateTaillePoids,:idJoueur)'); 
        ///Exécution de la requête
        $req2->execute($data2); 
    }elseif($request==1){

        $data = array(
            ':dateBlessure' => $received_data->dateBlessure,
            ':tempsRepos' => $received_data->tempsRepos,
            ':typeBlessure' => $received_data->typeBlessure,
            ':contextBlessure' => $received_data->contextBlessure,
            ':idJoueur' => $received_data->idJoueur,
        );
        
        $req = $linkpdo->prepare('INSERT INTO BLESSURE(dateBlessure,tempsRepos,typeBlessure,contextBlessure,idJoueur) 
                                    VALUES(:dateBlessure,:tempsRepos,:typeBlessure,:contextBlessure,:idJoueur)'); 
        ///Exécution de la requête
        $req->execute($data); 
    }elseif($request==2){
        
        $data = array(
            ':tirage' => $received_data->tirage,
            ':datePerf' =>date("Y-m-d"),
            ':squat' => $received_data->squat,
            ':dcouche' => $received_data->dcouche,
            ':idJoueur' => $received_data->idJoueur,
        );
        
        $req = $linkpdo->prepare('INSERT INTO HISTORIQUE_PERF(tirage,datePerf,squat,dcouche,idJoueur) 
                                    VALUES(:tirage,:datePerf,:squat,:dcouche,:idJoueur)'); 
        ///Exécution de la requête
        $req->execute($data); 



    };


    $output = array(
        'message' => 'Succes'
    );
    
    echo json_encode($output);




exit;