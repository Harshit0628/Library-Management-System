<?php
$host = 'localhost';
$db   = 'library';
$user = 'root';
$pass = ''; // Leave this empty if you haven't set a password for root

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}