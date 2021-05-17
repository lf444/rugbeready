<?php

include "config.php";
$received_data = json_decode(file_get_contents("php://input"));
$request = $received_data->request;
$idJoueur = $received_data->idJoueur;
if($request==1){

    //recup la taille et le poids d'un joueur
    $req = $linkpdo->prepare("SELECT * FROM HISTORIQUE_TAILLE_POIDS WHERE idJoueur=:idJoueur ORDER BY dateTaillePoids DESC LIMIT 1 ");
    $req -> execute(['idJoueur'=> $idJoueur]);
    $messages = $req->fetchAll();
echo json_encode($messages);

}elseif($request==2){

    $data = array(
        ':tirage' => $received_data->tirage,
        ':datePerf' =>date("Y-m-d"),
        ':squat' => $received_data->squat,
        ':dcouche' => $received_data->dcouche,
        ':detenteVerticale' => $received_data->detenteVerticale,
        ':tempsSprint' => $received_data->tempsSprint,
        ':idJoueur' => $received_data->idJoueur,
    );

    $reqLastDate = $linkpdo->prepare('SELECT datePerf FROM HISTORIQUE_PERF WHERE idJoueur=:idJoueur ORDER BY datePerf DESC LIMIT 1');
    $reqLastDate -> execute(['idJoueur'=> $idJoueur]);
    $lastDate = $reqLastDate->fetch(PDO::FETCH_ASSOC);

    if(date("Y-m-d") != $lastDate['datePerf']){
        //insert new row
        $req = $linkpdo->prepare('INSERT INTO HISTORIQUE_PERF(tirage,datePerf,squat,dcouche,detenteVerticale,tempsSprint,idJoueur) VALUES(:tirage,:datePerf,:squat,:dcouche,:detenteVerticale,:tempsSprint,:idJoueur)'); 
        $req->execute($data); 

    }else{
        //update last row
        $req = $linkpdo->prepare('UPDATE HISTORIQUE_PERF SET squat=:squat, dcouche=:dcouche, tirage=:tirage, detenteVerticale=:detenteVerticale, tempsSprint=:tempsSprint WHERE datePerf=:datePerf AND idJoueur=:idJoueur');
        $req->execute($data); 
    }

    exit;

}elseif($request==3){

    $data = array(
        ':poids'    => $received_data->poids,
        ':taille'   => $received_data->taille,
        ':idJoueur' => $received_data->idJoueur,
        ':dateTaillePoids'=>date("Y-m-d"),
    );
    
    $reqLastDate = $linkpdo->prepare('SELECT dateTaillePoids FROM HISTORIQUE_TAILLE_POIDS WHERE idJoueur=:idJoueur ORDER BY dateTaillePoids DESC LIMIT 1');
    $reqLastDate -> execute(['idJoueur'=> $idJoueur]);
    $lastDate = $reqLastDate->fetch(PDO::FETCH_ASSOC);


    if(date("Y-m-d") != $lastDate['dateTaillePoids']){
        //insert new row
        $req = $linkpdo->prepare('INSERT INTO HISTORIQUE_TAILLE_POIDS(taille,poids,dateTaillePoids,idJoueur) VALUES(:taille,:poids,:dateTaillePoids,:idJoueur)'); 
        $req->execute($data); 

    }else{
        //update last row
        $req = $linkpdo->prepare('UPDATE HISTORIQUE_TAILLE_POIDS SET poids=:poids, taille=:taille WHERE dateTaillePoids=:dateTaillePoids AND idJoueur=:idJoueur');
        $req->execute($data);
    }
    
    
    

}elseif($request==4){

    $req = $linkpdo->prepare("SELECT * FROM HISTORIQUE_BLESSURE WHERE idJoueur=:idJoueur ORDER BY dateBlessure DESC");
    $req -> execute(['idJoueur'=> $idJoueur]);
    $messages = $req->fetchAll();
echo json_encode($messages);

}elseif($request==5){

    $req = $linkpdo->prepare("SELECT * FROM HISTORIQUE_PERF WHERE idJoueur=:idJoueur ORDER BY datePerf DESC LIMIT 1");
    $req -> execute(['idJoueur'=> $idJoueur]);
    $messages = $req->fetchAll();
    echo json_encode($messages);
}

exit;