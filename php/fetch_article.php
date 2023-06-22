<?php
require_once 'db_config.php';

$id = $_GET['id'] ?? null;

if ($id === null) {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'ID de l\'article non fourni.']);
    exit();
}

try {
    $db = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $db->prepare("SELECT * FROM articles WHERE id = :id");
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    $article = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($article) {
        echo "Avant l'envoi de l'article\n";
        header('Content-Type: application/json');
        $json = json_encode($article);
        if ($json === false) {
            echo "Erreur lors de l'encodage JSON : " . json_last_error_msg() . "\n";
        } else {
            echo $json;
        }
        echo "\nAprès l'envoi de l'article\n";
    } else {
        echo "Aucun article trouvé avec cet ID.\n";
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Aucun article trouvé avec cet ID.']);
    }
} catch(Exception $e) {
    error_log("Erreur : " . $e->getMessage());
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Une erreur est survenue.', 'message' => $e->getMessage()]);
}
?>