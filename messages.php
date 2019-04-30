<?php

$task = "list";


// Verification si écriture ou lecture //


if(array_key_exists("task", $_GET)){
    $task = $_GET['task'];
}

if($task == "write") {
    postMessage();
} else {
    getMessage();
}


function getMessage() {

    require 'include/db.php';

    // Récupération des messages //
$resultat = $pdo->query("SELECT * FROM messages ORDER BY dateMessage DESC LIMIT 20");
$messages = $resultat->fetchAll();


echo json_encode($messages);

}

function postMessage(){

if(empty($_POST['contenuMessage'] && $_POST['auteur'])) {

    echo json_encode(["status" => "error", "message" => "Un des champs n'est pas remplis"]);
    return;

} 
    require 'include/db.php';

    // Insertion des messages //
$req = $pdo->prepare(" INSERT INTO messages SET contenuMessage = :contenuMessage, auteur = :auteur, dateMessage = NOW(), dateFin = NOW()");
$req->bindParam(':contenuMessage', $_POST['contenuMessage']);
$req->bindParam(':auteur', $_POST['auteur']);
$req->execute();

echo json_encode(["status" => "success", "message" => "Message envoyé"]);

}

?>