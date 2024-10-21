<?php
// db_config.php

$host = 'localhost';  // Replace with your actual host if needed
$dbname = 'user_db';  // Replace with your actual database name
$username = 'root';   // Your MySQL username
$password = '';       // Your MySQL password

// Create a connection to the MySQL database
$conn = new mysqli($host, $username, $password, $dbname);

// Check for connection errors
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
