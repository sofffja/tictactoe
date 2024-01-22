const gameboard = (function() {
  let arr = [
    ['','',''],
    ['','',''],
    ['','','']
  ];

  const setArr = (symbol, row, col) => {
    if (!arr[row][col]) {
      arr[row][col] = symbol;
    } else  {
      console.log(`cell taken`)
    }
  }

  const getArr = () => arr

  return { getArr, setArr };

})();

const game = (function() {
  const playerOne = createPlayer('A', prompt('choose x or o'))
  const playerTwo = createPlayer('B', playerOne.getSymbol() === 'x' ? 'o' : 'x');

  const play = () => {
    playerOne.selectMove(prompt(`player one, choose row`) - 1, prompt(`player one, choose column`) - 1);
    playerTwo.selectMove(prompt(`player two, choose row`) - 1, prompt(`player two, choose column`) - 1);
  }

  return { play }

})();

function createPlayer(name, symbol) {
  const selectMove = function(row, col) {
    gameboard.setArr(symbol, row, col)
  }

  const getName = () => name;
  const getSymbol = () => symbol;

  return { getName, getSymbol, selectMove }
}

