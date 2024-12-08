<?php
header('Content-Type: application/json');
require_once 'db_connection.php';

try {
    if (!isset($_GET['genre'])) {
        throw new Exception('Genre parameter is required');
    }

    $genre = $_GET['genre'];
    
    $stmt = $conn->prepare("SELECT * FROM books WHERE genre = ? ORDER BY title");
    $stmt->bind_param("s", $genre);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $books = [];
    while ($row = $result->fetch_assoc()) {
        $books[] = [
            'id' => $row['id'],
            'title' => htmlspecialchars($row['title']),
            'author' => htmlspecialchars($row['author']),
            'publication_year' => $row['publication_year'],
            'genre' => htmlspecialchars($row['genre'])
        ];
    }
    
    echo json_encode($books);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => true, 'message' => $e->getMessage()]);
} finally {
    if (isset($stmt)) {
        $stmt->close();
    }
    if (isset($conn)) {
        $conn->close();
    }
}