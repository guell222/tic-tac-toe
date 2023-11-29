let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleCellClick(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        cellIn = cell+index;
        document.getElementById(cellIn).innerText = currentPlayer;

        if (checkWinner()) {
            document.getElementById('result').innerText = 'Player' +currentPlayer + 'wins!';
            gameActive = false;
        } else if (gameBoard.every(cell => cell !== '')) {
            document.getElementById('result').innerText = 'It\'s a draw!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    document.getElementById('result').innerText = '';
    
    // Clear the board
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.innerText = '');

    // Enable the board for new moves
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
    });
}

// Dynamically generate the game board cells
const board = document.getElementById('board');
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = cell + i;
    cell.addEventListener('click', () => handleCellClick(i));
    board.appendChild(cell);
}