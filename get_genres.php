<?php
header('Content-Type: application/json');
require_once 'db_connection.php';

try {
    $stmt = $conn->prepare("SELECT DISTINCT genre FROM books ORDER BY genre");
    $stmt->execute();
    $result = $stmt->get_result();
    
    $genres = [];
    while ($row = $result->fetch_assoc()) {
        $genres[] = $row['genre'];
    }
    
    echo json_encode($genres);
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