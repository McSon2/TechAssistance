<?php
$servername = getenv('DB_SERVER');
$username = getenv('DB_USERNAME');
$password = getenv('DB_PASSWORD');
$dbname = getenv('DB_NAME');

// Créez la connexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifiez la connexion
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>