<?php
try {
    require_once "db_config.php";

    $db = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $db->query("SELECT * FROM articles");
$articles = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($articles) {
    echo json_encode($articles);
} else {
    echo json_encode(array('error' => 'Aucun article trouvé.'));
}

} catch(Exception $e) {
    error_log("Erreur : " . $e->getMessage());
    echo json_encode(array('error' => 'Une erreur est survenue.', 'message' => $e->getMessage()));
}
?>
