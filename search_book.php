<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require_once 'db_connection.php';

try {
    if (!isset($_GET['query'])) {
        throw new Exception('Search query is required');
    }

    $query = trim($_GET['query']);
    
    if (empty($query)) {
        echo json_encode([]);
        exit;
    }

    $stmt = $conn->prepare("SELECT * FROM books WHERE title LIKE ? OR author LIKE ?");
    $searchTerm = "%{$query}%";
    $stmt->bind_param("ss", $searchTerm, $searchTerm);
    
    if (!$stmt->execute()) {
        throw new Exception('Failed to execute query');
    }

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
    echo json_encode([
        'error' => true,
        'message' => $e->getMessage()
    ]);
} finally {
    if (isset($stmt)) {
        $stmt->close();
    }
    if (isset($conn)) {
        $conn->close();
    }
}