<?php
require_once 'db_config.php';
// Connexion à la base de données
$db = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);

// Récupération des données du formulaire
$titre = $_POST['titre'];
$date_publication = $_POST['date_publication'];
$tags = $_POST['tags'];
$contenu = $_POST['contenu'];

// Préparation de la requête SQL
$query = $db->prepare("INSERT INTO articles (titre, date_publication, tags, contenu) VALUES (:titre, :date_publication, :tags, :contenu)");

// Exécution de la requête SQL
$query->execute([
    'titre' => $titre,
    'date_publication' => $date_publication,
    'tags' => $tags,
    'contenu' => $contenu
]);

echo "L'article a été ajouté avec succès.";
?>