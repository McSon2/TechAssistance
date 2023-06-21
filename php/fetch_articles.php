<?php
include_once 'db_config.php';

$sql = "SELECT id, titre, contenu, date_publication, tags FROM articles ORDER BY date_publication DESC";
$result = $conn->query($sql);

$articles = array();

if ($result->num_rows > 0) {
    // Parcourir les lignes de résultat et les ajouter au tableau des articles
    while($row = $result->fetch_assoc()) {
        $articles[] = $row;
    }
} else {
    echo "0 results";
}

// Convertir le tableau des articles en JSON
echo json_encode($articles);

$conn->close();
?>
