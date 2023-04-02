<?php
header('Content-Type: application/json');

if (isset($_POST['email'])) {
    // Configuration des destinataires et de l'objet du mail
    $to = "contact@techassistance.fr";
    $subject = "Message depuis le formulaire de contact de votre site web";

    // Récupération des données du formulaire
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Construction du corps du message
    $body = "Nom: $name\n\nEmail: $email\n\nMessage:\n$message";

    // Envoi du mail
    $success = mail($to, $subject, $body);

    // Renvoi de la réponse JSON
    echo json_encode(['success' => $success]);
    exit;
}
?>