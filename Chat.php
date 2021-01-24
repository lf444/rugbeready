<?php 
include('verifCo.php');
include('confsql.php');
include('connectsql.php');
    $res = $linkpdo->prepare('SELECT Auteur FROM User WHERE login =:login');
    $res->execute(['login' =>$_SESSION['login']]);
    $rowAll = $res->fetchAll(PDO::FETCH_COLUMN, 0);
 ob_start();
?>

<!DOCTYPE html>
<head>
  <meta charset="UTF-8">
  <title>Le  bo chat !</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>Chat with your friends!</h1>
  </header>
  
  <section class="chat">
    <div class="messages">
     
    </div>
    <div class="user-inputs">
      <form action="EnrMsg" method="GET">
        <input type="text" name="Auteur" id="Auteur" placeholder="Pseudo" value="<?php echo $rowAll[0];?>"READONLY required>
        <input type="text" id="Contenu" name="Contenu" placeholder="Veuilliez écrire votre message bro " Required >
        <button type="submit">Envoyé </button>
      </form>
  <button><a href='Chat.php?deconnexion=true'><span>Déconnexion</span></a></button>
            
            <!-- tester si l'utilisateur est connecté -->
            <?php
             
                if(isset($_GET['deconnexion']))
                { 
                   if($_GET['deconnexion']==true)
                   {  
                      session_unset();
                      header("location:index.php");
                   }
                }
                else if($_SESSION['login'] !== ""){
                    $user = $_SESSION['login'];
             
                }
            ?>
    </div>
  </section>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <script type="text/javascript"  >



/**
 * Il nous faut une fonction pour récupérer le JSON des
 * messages et les afficher correctement
 */
function getMessages(){
  // 1. Elle doit créer une requête AJAX pour se connecter au serveur
  const requeteAjax = new XMLHttpRequest();
  requeteAjax.open("GET", "RecupMsg.php");

  // 2. Quand elle reçoit les données, il faut qu'elle les traite (en exploitant le JSON) et il faut qu'elle affiche ces données au format HTML
  requeteAjax.onload = function(){
    const resultat = JSON.parse(requeteAjax.responseText);
    const html = resultat.reverse().map(function(message){
      return `
        <div class="message">
          <span class="date">${message.Estampille.substring(11, 16)}</span>
          <span class="Auteur">${message.Auteur}</span> : 
          <span class="Contenu">${message.Contenu}</span>
        </div>
      `
    }).join('');

    const messages = document.querySelector('.messages');

    messages.innerHTML = html;
    messages.scrollTop = messages.scrollHeight;
  }

  // 3. On envoie la requête
  requeteAjax.send();
}

/**
 * Il nous faut une fonction pour envoyer le nouveau
 * message au serveur et rafraichir les messages
 */

function postMessage(event){
  // 1. Elle doit stoper le submit du formulaire
  event.preventDefault();

  // 2. Elle doit récupérer les données du formulaire
  const Auteur = document.querySelector('#Auteur');
  const Contenu = document.querySelector('#Contenu');


  // 4. Elle doit configurer une requête ajax en GEt et envoyer les données
  const requeteAjax = new XMLHttpRequest();
  requeteAjax.open('GET', "EnrMsg.php?Auteur="+Auteur.value+"&Contenu="+Contenu.value,true);
  
  requeteAjax.onload = function(){
    Contenu.value = '';
    Contenu.focus();
    getMessages();
  }

  requeteAjax.send();
}

document.querySelector('form').addEventListener('submit', postMessage);



/**
 * Il nous faut une intervale qui demande le rafraichissement
 * des messages toutes les 3 secondes et qui donne 
 * l'illusion du temps réel.
 */

const interval = window.setInterval(getMessages, 2000);
getMessages();
/*
$(document).ready(function(){
  $(document).keyup(function(event){
    if(event.which==13){
  		form.submit();

    ;}

  });
});
*/



  </script>
</body>
</html>
<?php ob_end_flush();?>