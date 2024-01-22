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

