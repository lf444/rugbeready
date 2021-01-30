<?php

include "config.php";

$userData = mysqli_query($con,"select * from JOUEUR");

$response = array();

while($row = mysqli_fetch_assoc($userData)){

    $response[] = $row;
}
var_dump($response);

echo json_encode($response);
exit;