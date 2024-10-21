<?php
// signup.php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die("Method Not Allowed");
}

// Include database configuration
include 'db_config.php';

// Get user input from the form
$name = trim($_POST['name']);
$username = trim($_POST['username']);
$studentId = trim($_POST['studentId']);
$password = trim($_POST['password']);
$confirmPassword = trim($_POST['confirm-password']);

// Validate if passwords match
if ($password !== $confirmPassword) {
    echo "<script>alert('Passwords do not match.'); window.history.back();</script>";
    exit;
}

// Hash the password before saving it to the database
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Prepare and execute the insert query
$stmt = $conn->prepare("INSERT INTO users (name, username, studentId, password) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $username, $studentId, $hashedPassword);

if ($stmt->execute()) {
    echo "<script>alert('Signup successful! Please login.'); window.location.href = 'dummylogin1.html';</script>";
} else {
    echo "<script>alert('Error: " . $stmt->error . "'); window.history.back();</script>";
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
