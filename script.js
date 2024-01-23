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

  const getCurrentSymbol = () => currentPlayer.getSymbol();

  const play = (row, col) => {
    gameboard.setBoard(getCurrentSymbol(), row, col);

    if(gameboard.isWin() !== false) {
      return gameboard.isWin();
    } else if (gameboard.isFull()) {
      return 'ties';
    }

    currentPlayer = (currentPlayer === playerOne) ? playerTwo : playerOne;
  }

  return { play, getCurrentSymbol }
})();

function createPlayer(name, symbol) {
  const getName = () => name;
  const getSymbol = () => symbol;

  return { getName, getSymbol }
};

const screen = (function() {

})

