<?php

$host = "rugbergroot.mysql.db";    /* Host name */
$user = "rugbergroot";         /* User */
$password = "NgpvyJZN3YFdvpy";         /* Password */
$dbname = "rugbergroot";   /* Database name */

$con = mysqli_connect($host, $user, $password,$dbname);

// Check connection
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}

