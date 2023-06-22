<?php
require_once 'db_config.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    try {
        $db = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $db->prepare("SELECT * FROM articles WHERE id = :id");
        $stmt->execute(['id' => $id]);

        $article = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($article) {
            echo json_encode($article);
        } else {
            echo json_encode(array('error' => 'Aucun article trouvé.'));
        }
    } catch(PDOException $e) {
        error_log("Erreur : " . $e->getMessage());
        echo json_encode(array('error' => 'Une erreur est survenue.', 'message' => $e->getMessage()));
    }
} else {
    echo json_encode(array('error' => 'Aucun ID d\'article spécifié.'));
}
?>