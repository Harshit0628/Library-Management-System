<?php
header('Content-Type: application/xml');
header('Content-Disposition: attachment; filename="library_books.xml"');

require_once 'db_connection.php';

$result = $conn->query("SELECT * FROM books");

$xml = new SimpleXMLElement('<library></library>');

while ($row = $result->fetch_assoc()) {
    $book = $xml->addChild('book');
    $book->addChild('id', $row['id']);
    $book->addChild('title', $row['title']);
    $book->addChild('author', $row['author']);
    $book->addChild('publication_year', $row['publication_year']);
    $book->addChild('genre', $row['genre']);
}

echo $xml->asXML();

$conn->close();