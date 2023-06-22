<?php
require_once 'db_config.php';

$id = isset($_GET['id']) ? (int) $_GET['id'] : null;

if ($id === null) {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'ID de l\'article non fourni.']);
    exit();
}

try {
    $db = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $db->prepare("SELECT * FROM articles WHERE id = :id");
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    $article = $stmt->fetch(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    if ($article) {
        echo json_encode($article);
    } else {
        echo json_encode(['error' => 'Aucun article trouvé avec cet ID.']);
    }
} catch(Exception $e) {
    error_log("Erreur : " . $e->getMessage());
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Une erreur est survenue.', 'message' => $e->getMessage()]);
}
?>