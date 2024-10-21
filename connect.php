<?php
// Database connection variables
$host = 'localhost'; // or your DB host
$dbname = 'user_db'; // change this to your actual database name
$username = 'root'; // MySQL root user
$password = ''; // password for MySQL root, if any

// Establish a connection to the MySQL database
$conn = new mysqli($host, $username, $password, $dbname);

// Check if the connection was successful
if ($conn->connect_error) {
    // If connection failed, display detailed error message
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve user input from the POST request
$user = $_POST['username'];
$pass = $_POST['password'];

// Prepare a SQL statement to prevent SQL injection
$stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
$stmt->bind_param("s", $user);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Fetch the data of the user from the result set
    $row = $result->fetch_assoc();

    // Verify the hashed password stored in the database
    if (password_verify($pass, $row['password'])) {
        echo "<script>
                alert('Login successful!');
                window.location.href = 'firstpage1.html'; // redirect to the desired page
              </script>";
    } else {
        // If the password doesn't match
        echo "<script>
                alert('Invalid credentials. Please check your password.');
                window.history.back(); // Go back to the login form
              </script>";
    }
} else {
    // If no matching user found in the database
    echo "<script>
            alert('You haven\'t signed up yet. Please sign up first.');
            window.location.href = 'dummysignup.html'; // redirect to signup page
          </script>";
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
