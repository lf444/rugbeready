<?php
include('confsql.php');
include('connectsql.php');

session_start();
extract($_POST);


if(!empty($login) && !empty($mdp)){

		$res=$linkpdo->prepare('SELECT COUNT(*) FROM User WHERE login=:login AND mdp=:mdp');
		$res -> execute (array('login'=>$login,
							   'mdp' =>$mdp));
		$rowAll = $res->fetchAll(PDO::FETCH_COLUMN, 0);

		if( $rowAll[0]!=0){
			$_SESSION['login']=$login;
			$_SESSION['mdp']=$mdp;

			header('location:Chat.php');
		}else{

			header('location:index.php');

	}
}else{


	header('location:index.php');}
	 ?>

