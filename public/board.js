export default class Board {
  constructor() {
    this.grid = [];
    this.currentSymbol = 'x';
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
    let currentValue = this.grid[row][col];
    if (!currentValue) {
      this.grid[row][col] = this.currentSymbol;
      this.currentSymbol = this.currentSymbol === 'x' ? 'y' : 'x';
      return true;
    }
    return false;
  }
}
