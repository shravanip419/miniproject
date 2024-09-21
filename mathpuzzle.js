let score = 0;
let correctAnswer;
let timeLeft = 10;  // Reduced time for added difficulty
let timerInterval;
let difficultyLevel = 1;live

// Define more complex patterns
const patterns = [
    { sequence: [2, 6, 12, '?', 30], answer: 20, hint: 'Each number increases by adding consecutive multiples of 2 (2, 4, 6, 8...)' },
    { sequence: [2, 4, 8, '?', 32], answer: 16, hint: 'The sequence doubles at each step' },  // Exponential pattern
    { sequence: [1, 4, 9, '?', 25], answer: 16, hint: 'These are squares of integers (1^2, 2^2, 3^2, ...)' },  // Square numbers
    { sequence: [1, 1, 2, 6, '?', 120], answer: 24, hint: 'Factorial pattern: 1!, 2!, 3!, ...' },  // Factorial pattern
    { sequence: [2, 3, 5, 7, '?', 13], answer: 11, hint: 'This is a sequence of prime numbers' },  // Prime numbers
    { sequence: [1, 3, 6, 10, '?', 21], answer: 15, hint: 'Triangular numbers: sum of natural numbers' },  // Triangular numbers
    { sequence: [2, 8, '?', 128], answer: 32, hint: 'Powers of 2: 2^1, 2^3, 2^5, ...' },  // Powers of 2 (odd powers)
    { sequence: [0, 1, 1, 2, 3, '?'], answer: 5, hint: 'Fibonacci sequence' }  // Fibonacci-like sequence
];

// Function to generate the pattern puzzle based on the difficulty level
function generatePattern() {
    clearInterval(timerInterval);
    resetTimer();

    if (difficultyLevel <= patterns.length) {
        // Get the pattern for the current difficulty level
        const pattern = patterns[difficultyLevel - 1];
        correctAnswer = pattern.answer;
    
        // Display the pattern
        document.getElementById('pattern').innerText = `Find the missing number: ${pattern.sequence.join(', ')}`;
        document.getElementById('answer').value = '';
    
        timerInterval = setInterval(decrementTimer, 1000);
    }  else {
        alert('Congratulations! You completed all the difficult patterns.');
        resetGame();
        console.log('Redirecting to games.html...');
        window.location.href = 'games.html';  // Use the correct relative path
    }
}

// Reset the timer
function resetTimer() {
    timeLeft = 300;  // Time reduced for difficulty
    document.getElementById('timer').innerText = `Time left: ${timeLeft}s`;
}

// Decrease the time by 1 second
function decrementTimer() {
    timeLeft--;
    document.getElementById('timer').innerText = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        alert('Time is up! Moving to the next problem.');
        nextPuzzle();
    }
}

// Check the user's answer
function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value);
    const message = document.getElementById('message');

    if (userAnswer === correctAnswer) {
        score++;
        message.style.color = 'green';
        message.innerText = 'Correct!';
        difficultyLevel++;
    } else {
        score--;  // Penalize for wrong answers
        message.style.color = 'red';
        message.innerText = 'Wrong! Try again.';
    }

    document.getElementById('score').innerText = `Score: ${score}`;
    setTimeout(() => {
        message.innerText = '';
        nextPuzzle();
    }, 1000);
}

// Move to the next puzzle or end the game if patterns are finished
function nextPuzzle() {
    if (difficultyLevel <= patterns.length) {
        generatePattern();
    } else {
        alert('You solved all the puzzles!');
        resetGame();
    }
}

// Reset the game
function resetGame() {
    score = 0;
    difficultyLevel = 1;
    generatePattern();
}

// Initialize the game
generatePattern();
