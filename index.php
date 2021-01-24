<?php 
session_start();
$_SESSION['login']="";
$_SESSION['mdp']="";

?>


<!DOCTYPE html>
<head>
  <meta charset="UTF-8">
  <title>Page de Connexion</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>Connexion</h1>
  </header>

    <form method="POST" action="verification.php" id=log >
    <p>
        <label>Login<br></label> <input type="text" name="login" > <br />
        <label>Mot de passe<br></label> <input type="password" name="mdp" >  <br />
        <input type="submit" id="submit"> <br />  
    </p>

  </form>


</body>
</html>