<?php
require_once 'db_config.php';

// Connexion à la base de données
$db = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
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

    // Redirection vers la même page pour éviter le renvoi des données POST lors d'un rafraîchissement de la page
    header('Location: admin.php');
    exit;
}

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Administration du blog</title>
</head>
<body>
    <h1>Ajouter un nouvel article</h1>
    <form action="admin.php" method="post">
        <label for="titre">Titre:</label><br>
        <input type="text" id="titre" name="titre"><br>
        <label for="tags">Tags (séparés par des virgules):</label><br>
        <input type="text" id="tags" name="tags"><br>
        <label for="contenu">Contenu:</label><br>
        <textarea id="contenu" name="contenu"></textarea><br>
        <input type="submit" value="Ajouter l'article">
    </form>
</body>
</html>