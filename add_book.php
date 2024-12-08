<?php
header('Content-Type: application/json');

require_once 'db_connection.php';

$title = $_POST['title'];
$author = $_POST['author'];
$publication_year = $_POST['publicationYear'];
$genre = $_POST['genre'];

$stmt = $conn->prepare("INSERT INTO books (title, author, publication_year, genre) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssis", $title, $author, $publication_year, $genre);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => $stmt->error]);
}

$stmt->close();
$conn->close();