<?php
require_once 'db_config.php';

$id = $_GET['id'] ?? null;

if ($id === null) {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'ID de l\'article non fourni.']);
    exit();
}

try {
    $db = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $db->prepare("SELECT * FROM articles WHERE id = :id");
    $stmt->execute([':id' => $id]);

    $article = $stmt->fetch(PDO::FETCH_ASSOC);

    // Ajoutez cette ligne pour afficher le contenu de $article
    var_dump($article);

    if ($article) {
        header('Content-Type: application/json');
        echo json_encode($article);
    } else {
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Aucun article trouvé avec cet ID.']);
    }
} catch(Exception $e) {
    error_log("Erreur : " . $e->getMessage());
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Une erreur est survenue.', 'message' => $e->getMessage()]);
}
?>
