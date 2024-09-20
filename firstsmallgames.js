let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 5;

function checkGuess() {
    const guessInput = document.getElementById('guessInput').value;
    const resultMessage = document.getElementById('resultMessage');
    const remainingAttempts = document.getElementById('remainingAttempts');
    
    if (guessInput === '' || isNaN(guessInput)) {
        resultMessage.textContent = "Please enter a valid number!";
        return;
    }

    const guess = Number(guessInput);

    if (guess < 1 || guess > 100) {
        resultMessage.textContent = "Number must be between 1 and 100!";
        return;
    }

    attempts--;

    if (guess === randomNumber) {
        resultMessage.textContent = `Congrats! You guessed the correct number: ${randomNumber}!`;
        resultMessage.style.color = 'green';
        showRestartButton();
    } else if (guess > randomNumber) {
        resultMessage.textContent = "Too high! Try again.";
        resultMessage.style.color = '#ff5733';
    } else {
        resultMessage.textContent = "Too low! Try again.";
        resultMessage.style.color = '#ff5733';
    }

    remainingAttempts.textContent = `Attempts left: ${attempts}`;

    if (attempts === 0) {
        resultMessage.textContent = `Game Over! The correct number was ${randomNumber}.`;
        resultMessage.style.color = 'red';
        showRestartButton();
    }
}

function showRestartButton() {
    const restartButton = document.getElementById('restartButton');
    restartButton.style.display = 'block';
}

function restartGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 5;
    document.getElementById('guessInput').value = '';
    document.getElementById('resultMessage').textContent = '';
    document.getElementById('remainingAttempts').textContent = '';
    document.getElementById('restartButton').style.display = 'none';
}
