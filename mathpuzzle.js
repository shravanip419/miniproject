let score = 0;
let correctAnswer;
let timeLeft = 10;  // Initial time set to 10 seconds
let timerInterval;
let difficultyLevel = 1; 

// Define more complex patterns
const patterns = [
    { sequence: [2, 6, 12, '?', 30], answer: 20, hint: 'Each number increases by adding consecutive multiples of 2 (2, 4, 6, 8...)' },
    { sequence: [2, 4, 8, '?', 32], answer: 16, hint: 'The sequence doubles at each step' },  
    { sequence: [1, 4, 9, '?', 25], answer: 16, hint: 'These are squares of integers (1^2, 2^2, 3^2, ...)' },  
    { sequence: [1, 1, 2, 6, '?', 120], answer: 24, hint: 'Factorial pattern: 1!, 2!, 3!, ...' },  
    { sequence: [2, 3, 5, 7, '?', 13], answer: 11, hint: 'This is a sequence of prime numbers' },  
    { sequence: [1, 3, 6, 10, '?', 21], answer: 15, hint: 'Triangular numbers: sum of natural numbers' },  
    { sequence: [2, 8, '?', 128], answer: 32, hint: 'Powers of 2: 2^1, 2^3, 2^5, ...' },  
    { sequence: [0, 1, 1, 2, 3, '?'], answer: 5, hint: 'Fibonacci sequence' }  
];

// Function to generate the pattern puzzle based on the difficulty level
function generatePattern() {
    clearInterval(timerInterval); // Stop previous timer
    resetTimer();

    if (difficultyLevel <= patterns.length) {
        const pattern = patterns[difficultyLevel - 1];
        correctAnswer = pattern.answer;

        document.getElementById('pattern').innerText = `Find the missing number: ${pattern.sequence.join(', ')}`;
        document.getElementById('answer').value = '';

        timerInterval = setInterval(decrementTimer, 1000); // Start new timer
    } else {
        alert('Congratulations! You completed all the difficult patterns.');
        resetGame();  // Reset game when finished
    }
}

// Reset the timer to 10 seconds
function resetTimer() {
    timeLeft = 300;  // Set timer to 300 seconds for each round
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
        setTimeout(() => nextPuzzle(), 1000);  // Move to the next puzzle after 1s
    } else {
        score--;  // Penalize for wrong answers
        message.style.color = 'red';
        message.innerText = 'Wrong! Try again.';
    }

    document.getElementById('score').innerText = `Score: ${score}`;
    setTimeout(() => message.innerText = '', 1000);  // Clear message after 1s
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
