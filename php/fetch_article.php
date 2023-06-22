<?php
header('Content-Type: application/json');

require_once 'db_config.php';

$id = $_GET['id'] ?? null;

if ($id === null) {
    echo json_encode(['error' => 'ID de l\'article non fourni.']);
    exit();
}

try {
    $db = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $db->prepare("SELECT * FROM articles WHERE id = :id");
    $stmt->execute([':id' => $id]);

    $article = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($article) {
        echo json_encode($article);
    } else {
        echo json_encode(['error' => 'Aucun article trouvé avec cet ID.']);
    }
} catch(Exception $e) {
    error_log("Erreur : " . $e->getMessage());
    echo json_encode(['error' => 'Une erreur est survenue.', 'message' => $e->getMessage()]);
}
?>
