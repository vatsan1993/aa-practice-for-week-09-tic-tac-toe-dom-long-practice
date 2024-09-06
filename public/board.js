export default class Board {
  constructor() {
    this.grid = [];
    this.currentSymbol = 'X';
    this.spacesLeft = 9;
  }
  setup() {
    for (let i = 0; i < 3; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(null);
      }
      this.grid.push(row);
    }
  }

  insert(row, col) {
    console.log(row, col);

    let currentValue = this.grid[row][col];
    if (!currentValue) {
      this.grid[row][col] = this.currentSymbol;
      this.currentSymbol = this.currentSymbol === 'X' ? 'O' : 'X';
      console.log(this.grid);
      console.log(this.currentSymbol);
      this.spacesLeft--;
      return true;
    }
    return false;
  }

  checkRows(rowIndex, symbol) {
    console.log('current row', rowIndex);

    // let count = this.grid[rowIndex].reduce((acc, val) => {
    //   console.log(val);

    //   if (val == symbol) {
    //     return acc++;
    //   } else {
    //     return acc;
    //   }
    // }, 0);
    let count = 0;
    let row = this.grid[rowIndex];
    for (let val of row) {
      if (val == symbol) {
        count++;
      }
    }
    console.log('rowCount: ' + count);

    return count == 3;
  }
  checkCols(col, symbol) {
    console.log('current col', col);
    let count = 0;
    for (let row = 0; row < this.grid.length; row++) {
      if (this.grid[row][col] === symbol) {
        count++;
      }
    }
    console.log('colCOunt: ' + count);
    return count == 3;
  }
  checkDiag1(symbol) {
    let count = 0;
    for (let i = 0; i < this.grid.length; i++) {
      if (this.grid[i][i] === symbol) {
        count++;
      }
    }
    console.log('diag1Count: ' + count);
    return count == 3;
  }
  checkDiag2(symbol) {
    let count = 0;
    for (let i = 0; i < this.grid.length; i++) {
      if (this.grid[i][this.grid.length - i - 1] === symbol) {
        count++;
      }
    }
    console.log('diag2Count: ' + count);
    return count === 3;
  }
  checkWin(row, col) {
    let symbol = this.currentSymbol === 'X' ? 'O' : 'X';
    console.log('current Symbol', symbol);
    console.log(row, col);

    console.log(col == this.grid.length - row - 1);

    return (
      this.checkRows(row, symbol) ||
      this.checkCols(col, symbol) ||
      (row == col ? this.checkDiag1(symbol) : false) ||
      (col == this.grid.length - row - 1 ? this.checkDiag2(symbol) : false)
    );
  }

  checkDraw() {
    return this.spacesLeft === 0;
  }
}
