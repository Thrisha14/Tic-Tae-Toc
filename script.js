let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameMode = 'human';

function handleClick(cellIndex) {
    if (board[cellIndex] === '') {
        board[cellIndex] = currentPlayer;
        renderBoard();
        if (checkForWin()) {
            document.getElementById('message').innerText = `${currentPlayer} wins!`;
        } else if (checkForTie()) {
            document.getElementById('message').innerText = "It's a tie!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateTurnDisplay();
            if (gameMode === 'ai' && currentPlayer === 'O') {
                setTimeout(makeAIMove, 500);
            }
        }
    }
}

function renderBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.innerText = board[index];
    });
}

function checkForWin() {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (board[i * 3] === currentPlayer && board[i * 3 + 1] === currentPlayer && board[i * 3 + 2] === currentPlayer) {
            return true;
        }
    }
    // Check columns
    for (let i = 0; i < 3; i++) {
        if (board[i] === currentPlayer && board[i + 3] === currentPlayer && board[i + 6] === currentPlayer) {
            return true;
        }
    }
    // Check diagonals
    if ((board[0] === currentPlayer && board[4] === currentPlayer && board[8] === currentPlayer) ||
        (board[2] === currentPlayer && board[4] === currentPlayer && board[6] === currentPlayer)) {
        return true;
    }
    return false;
}

function checkForTie() {
    return board.every(cell => cell !== '');
}

function makeAIMove() {
    let emptyCells = [];
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            emptyCells.push(i);
        }
    }
    // Randomly select an empty cell
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    handleClick(emptyCells[randomIndex]);
}

function selectGameMode(mode) {
    gameMode = mode;
    resetGame();
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    document.getElementById('message').innerText = '';
    updateTurnDisplay();
    renderBoard();
}

function updateTurnDisplay() {
    const turnBoxes = document.querySelectorAll('.turn-box');
    turnBoxes.forEach(box => {
        if (box.innerText === currentPlayer) {
            box.classList.add('active');
        } else {
            box.classList.remove('active');
        }
    });
}
