<?php
require_once 'db_config.php';
// Connexion à la base de données
$db = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);

// Récupération des données du formulaire
$titre = $_POST['titre'];
$tags = $_POST['tags'];
$contenu = $_POST['contenu'];

// Préparation de la requête SQL
$query = $db->prepare("INSERT INTO articles (titre, date_publication, tags, contenu) VALUES (:titre, NOW(), :tags, :contenu)");

// Exécution de la requête SQL
$query->execute([
    'titre' => $titre,
    'tags' => $tags,
    'contenu' => $contenu
]);

echo "L'article a été ajouté avec succès.";
?>