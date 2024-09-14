// // Function to validate email address
// function validateEmail(email) {
//     const domain = email.split('@')[1];
//     if (domain !== 'dbit.in') {
//         return false;
//     }
//     return true;
// }

// // Function to handle login and sign-up form submissions
// function handleFormSubmission(formType) {
//     if (formType === 'login') {
//         const username = document.getElementById('username').value;
//         const password = document.getElementById('password').value;

//         // Retrieve the user object from local storage
//         const users = JSON.parse(localStorage.getItem('users'));

//         // Check if the user exists and password matches
//         for (const user of users) {
//             if (user.username === username && user.password === password) {
//                 alert('Login successful');
//                 updateLoginButton(username);
//                 return;
//             }
//         }

//         alert('Invalid username or password');
//     } else if (formType === 'sign-up') {
//         const username = document.getElementById('username').value;
//         const email = document.getElementById('email').value;
//         const password = document.getElementById('password').value;
//         const confirmPassword = document.getElementById('confirm-password').value;

//         if (password !== confirmPassword) {
//             alert('Passwords do not match');
//             return;
//         }

//         if (!validateEmail(email)) {
//             alert('Only email IDs with @dbit.in domain are allowed');
//             return;
//         }

//         // Create a new user object
//         const user = {
//             username,
//             email,
//             password
//         };

//         // Store the user object in local storage
//         const users = JSON.parse(localStorage.getItem('users')) || [];
//         users.push(user);
//         localStorage.setItem('users', JSON.stringify(users));

//         alert('Sign-up successful');
//         window.location.href = 'login.html';
//     }
// }

// // Function to update the login button on the main page
// function updateLoginButton(username) {
//     const loginButton = document.getElementById('login-button');
//     loginButton.textContent = `Hello, ${username}!`;
//     loginButton.href = 'profile.html';
// }

// // Add event listeners to login and sign-up form submissions
// document.addEventListener('DOMContentLoaded', function() {
//     const loginForm = document.getElementById('login-form');
//     const signUpForm = document.getElementById('sign-up-form');

//     loginForm.addEventListener('submit', function(event) {
//         event.preventDefault();
//         handleFormSubmission('login');
//     });

//     signUpForm.addEventListener('submit', function(event) {
//         event.preventDefault();
//         handleFormSubmission('sign-up');
//     });
// });
