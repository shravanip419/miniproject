<?php
// login.php
session_start();  // Start the session

if ($_SERVER['REQUEST_METHOD'] === 'POST')
 {
    // Include database configuration
    include 'db_config.php';
    echo "POST request received!";

    // Get user input from the form
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    // Validate that both fields are filled
    if (empty($username) || empty($password)) {
        echo "<script>alert('Both username and password are required.'); window.history.back();</script>";
        exit;
    }

    // Prepare a statement to check if the username exists
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if the user exists
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Verify the password
        if (password_verify($password, $user['password'])) {
            // Set session variables to mark the user as logged in
            $_SESSION['loggedin'] = true;
            $_SESSION['username'] = $username;
            echo "Form submitted successfully!"; // Place at the top of login.php or signup.php


            echo "<script>alert('Login successful!'); window.location.href = 'firstpage1.html';</script>";
        } else {
            echo "<script>alert('Invalid credentials. Please try again.'); window.history.back();</script>";
        }
    } else {
        echo "<script>alert('No account found with this username. Please sign up.'); window.location.href = 'dummysignup.html';</script>";
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
}
else {
    echo "This page only accepts POST requests.";
}
?>
