<?php
require_once 'db_config.php';

try {
    $db = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $db->query("SELECT * FROM articles");
    $articles = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($articles);
} catch(PDOException $e) {
    error_log("Erreur lors de la récupération des articles : " . $e->getMessage());
    echo json_encode(array('error' => 'Une erreur est survenue.'));
}
?>