const gameboard = (function() {
  let board = [
    ['','',''],
    ['','',''],
    ['','','']
  ];

  const getBoard = () => board;

  const setBoard = (symbol, row, col) => {
    board[row][col] = symbol;
  }

  const resetBoard = () => {
    board = [
      ['','',''],
      ['','',''],
      ['','','']
    ];
  }

  const isFull = () => {
    for (const row of board) {
      for (const column of row) {
        if (column == false) return false;
      }
    }
    return true;
  }

  const getWinCases = () => {
    return [
      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], board[2][1], board[2][2]],
  
      [board[0][0], board[1][0], board[2][0]],
      [board[0][1], board[1][1], board[2][1]],
      [board[0][2], board[1][2], board[2][2]],
  
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]]
    ]
  }

  function isWin() {
    for (let winCase of getWinCases()) {
      if (winCase.every((cell) => cell === 'x')) {
        return { win: true, symbol: 'x' }

      } else if (winCase.every((cell) => cell === 'o')) {
        return { win: true, symbol: 'o' }
      }
    }
    return false;
  }

  return { getBoard, setBoard, resetBoard, isFull, isWin }

})();

const game = (function() {
  const playerOne = createPlayer('A', 'x')
  const playerTwo = createPlayer('B', playerOne.getSymbol() === 'x' ? 'o' : 'x');
  let currentPlayer = playerOne;
  let ended;

  const getCurrentSymbol = () => currentPlayer.getSymbol();

  const play = (row, col) => {
    gameboard.setBoard(getCurrentSymbol(), row, col);

    if(gameboard.isWin()) {
      let winner = gameboard.isWin().symbol === 'x' ? playerOne.getName() : playerTwo.getName()
      screenHandler.updateDisplayWin(winner);
      ended = true;
    } else if (gameboard.isFull()) {
      screenHandler.updateDisplayTie();
      ended = true;
    } else {
      changePlayer();
    }

  }

  function resetGame() {
    currentPlayer = playerOne;
    gameboard.resetBoard();
    screenHandler.clearScreen();
    ended = false;
  }

  function changePlayer() {
    currentPlayer = (currentPlayer === playerOne) ? playerTwo : playerOne;
  }

  const isEnded = () => {
    return ended;
  }

  return { play, getCurrentSymbol, resetGame, isEnded }
})();

function createPlayer(name, symbol) {
  const getName = () => name;
  const getSymbol = () => symbol;

  return { getName, getSymbol }
};

const screenHandler = (function() {
  const boardDiv = document.querySelector('.gameboard');
  const boardCell = document.querySelectorAll('.gameboard-cell');
  const displayDiv = document.querySelector('.display');
  const newgameBtn = document.querySelector('.newgame')

  const updateScreenBoard = (e) => {
    let row = e.target.parentElement.getAttribute('row');
    let col = e.target.getAttribute('col');

    if (gameboard.getBoard()[row][col] !== '' || game.isEnded()) {
      return
    };

    e.target.textContent = game.getCurrentSymbol();
    game.play(row, col);
  }

  const clearScreen = () => {
    for (let div of boardCell) {
      div.textContent = '';
    }
    displayDiv.textContent = 'tres en raya';
  }

  const updateDisplayWin = (name) => {
    displayDiv.textContent = `winner is ${name}`
    displayDiv.classList.add('endgame');
  }

  const updateDisplayTie = () => {
    displayDiv.classList.add('endgame');
    displayDiv.textContent = `it's a tie, try again`;
  }

  const setNewgame = () => {
    displayDiv.classList.remove('endgame');
    game.resetGame();
  }

  const setEvents = function() {
    boardDiv.addEventListener('click', updateScreenBoard);
    newgameBtn.addEventListener('click', setNewgame);
  }();

  return { clearScreen, updateDisplayWin, updateDisplayTie }
})();

