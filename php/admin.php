<?php
require_once 'db_config.php';

// Connexion à la base de données
$db = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);

global $password_article;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupération des données du formulaire
    $titre = $_POST['titre'];
    $tags = $_POST['tags'];
    $contenu = $_POST['contenu'];
    $password = $_POST['password'];

    // Vérifiez le mot de passe
    if ($password !== $password_article) {
    echo "Mot de passe incorrect.";
    exit;
    }

    // Préparation de la requête SQL
    $query = $db->prepare("INSERT INTO articles (titre, date_publication, tags, contenu) VALUES (:titre, NOW(), :tags, :contenu)");

    // Exécution de la requête SQL
    $query->execute([
        'titre' => $titre,
        'tags' => $tags,
        'contenu' => $contenu
    ]);

    exit;
}
?>
