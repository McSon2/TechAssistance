<?php
$servername = "localhost"; // Remplacez par votre serveur, généralement "localhost"
$username = "username"; // Remplacez par votre nom d'utilisateur de la base de données
$password = "password"; // Remplacez par votre mot de passe de la base de données
$dbname = "database"; // Remplacez par le nom de votre base de données

// Créez la connexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifiez la connexion
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>