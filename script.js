const gameboard = (function() {
  let board = [
    ['','',''],
    ['','',''],
    ['','','']
  ];

  const setBoard = (symbol, row, col) => {
    if (!board[row][col]) {
      board[row][col] = symbol;
    } else  {
      console.log(`cell taken`)
    }
  }

  const getBoard = () => board;

  const isFull = () => {
    for (const row of board) {
      for (const column of row) {
        if (column == false) return false;
      }
    }
    return true;
  }

  const resetBoard = () => {
    board = [
      ['','',''],
      ['','',''],
      ['','','']
    ];
  }

  const getWinCases = () => {
    return [
      isWinCase(board[0][0], board[0][1], board[0][2]),
      isWinCase(board[1][0], board[1][1], board[1][2]),
      isWinCase(board[2][0], board[2][1], board[2][2]),
  
      isWinCase(board[0][0], board[1][0], board[2][0]),
      isWinCase(board[0][1], board[1][1], board[2][1]),
      isWinCase(board[0][2], board[1][2], board[2][2]),
  
      isWinCase(board[0][0], board[1][1], board[2][2]),
      isWinCase(board[0][2], board[1][1], board[2][0])
    ]
  } 

  return { getBoard, setBoard, isFull, getWinCases, resetBoard };

})();

const game = (function() {
  const playerOne = createPlayer('A', 'x')
  const playerTwo = createPlayer('B', playerOne.getSymbol() === 'x' ? 'o' : 'x');

  const play = () => {
    for (let i = 1; i <= 9; i++) {
      if (!checkWinner()) {
        if (i % 2 !== 0) {
          playerOne.selectMove(prompt(`player one, choose row`), prompt(`player one, choose column`));
          console.table(gameboard.getBoard())
        } else {
          playerTwo.selectMove(prompt(`player two, choose row`), prompt(`player two, choose column`));
          console.table(gameboard.getBoard())
        }
      } else if (checkWinner() === 'tie') {
        return 'tie! end game'
      } else {
        return checkWinner() === playerOne.getSymbol() ?
          `${playerOne.getName()} wins` :
          `${playerTwo.getName()} wins`
      }
    }
  }

  const checkWinner = () => {
    for (const winCase of gameboard.getWinCases()) {
      if (winCase.symbol && winCase.win) {
        return winCase.symbol;
      } else if (gameboard.isFull()) {
        return 'tie';
      }
    }
  }

  return { play, checkWinner }

})();

function createPlayer(name, symbol) {
  const selectMove = function(row, col) {
    gameboard.setBoard(symbol, row, col)
  }

  const getName = () => name;
  const getSymbol = () => symbol;

  return { getName, getSymbol, selectMove }
}

function isWinCase(){
  var len = arguments.length;
  for (var i = 1; i< len; i++){
     if (arguments[i] === null || arguments[i] !== arguments[i-1])
        return false;
  }
  return { win: true, symbol: arguments[0] };
}
