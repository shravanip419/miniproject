document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('status');
    const endGameButton = document.getElementById('endGameButton');
    const scoreXDisplay = document.getElementById('scoreX');
    const scoreODisplay = document.getElementById('scoreO');

    let isXNext = true;
    let board = Array(9).fill(null);
    let scoreX = 0;
    let scoreO = 0;

    const handleClick = (e) => {
        const index = e.target.getAttribute('data-index');
        if (board[index] || calculateWinner(board)) {
            return;
        }
        board[index] = isXNext ? 'X' : 'O';
        e.target.textContent = board[index];
        
        // Add a class based on whether it's X or O
        e.target.classList.add(isXNext ? 'X' : 'O');
        
        isXNext = !isXNext;
        updateStatus();
    };

    const calculateWinner = (board) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };

    const updateStatus = () => {
        const winner = calculateWinner(board);
        if (winner) {
            statusDisplay.textContent = `Winner: ${winner}`;
            updateScore(winner);
        } else if (board.every(cell => cell !== null)) {
            statusDisplay.textContent = `It's a draw!`;
        } else {
            statusDisplay.textContent = `Next player: ${isXNext ? 'X' : 'O'}`;
        }
    };

    const updateScore = (winner) => {
        if (winner === 'X') {
            scoreX++;
            scoreXDisplay.textContent = `Player X: ${scoreX}`;
        } else if (winner === 'O') {
            scoreO++;
            scoreODisplay.textContent = `Player O: ${scoreO}`;
        }
    };

    const resetGame = () => {
        board = Array(9).fill(null);
        isXNext = true;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('X', 'O'); // Clear classes for styling
        });
        updateStatus();
    };

    const endGame = () => {
        alert("Game Ended!");
        resetGame();
        scoreX = 0;
        scoreO = 0;
        scoreXDisplay.textContent = `Player X: ${scoreX}`;
        scoreODisplay.textContent = `Player O: ${scoreO}`;
    };

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    endGameButton.addEventListener('click', endGame);
    updateStatus();
});
