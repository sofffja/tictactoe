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
  let playerOne, playerTwo, currentPlayer;
  let ended;

  const initPlayers = (nameOne, nameTwo) => {
    playerOne = createPlayer(nameOne, 'x');
    playerTwo = createPlayer(nameTwo, 'o');
    currentPlayer = playerOne;
  }

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

  const isEnded = () => ended;

  return { play, getCurrentSymbol, resetGame, isEnded, initPlayers }
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
  const newgameBtn = document.querySelector('.newgame');
  
  const closeModalBtn = document.querySelector('.ok');
  const playerOneInput = document.querySelector('#p1-name');
  const playerTwoInput = document.querySelector('#p2-name');

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

    closeModalBtn.addEventListener('click', () => {
      game.initPlayers(playerOneInput.value, playerTwoInput.value)
    })
  }();

  return { clearScreen, updateDisplayWin, updateDisplayTie }
})();

