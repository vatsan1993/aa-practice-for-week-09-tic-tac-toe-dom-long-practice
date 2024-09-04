import Board from './board.js';
// Your code here
let board = new Board();
board.setup();
const makeMove = (event) => {
  let cell = event.target;
  let row = cell.dataset.row;
  let col = cell.dataset.col;
  let currentSymbol = board.currentSymbol;
  if (board.insert(row, col)) {
    cell.textContent = currentSymbol;
  }
};
let createGrid = () => {
  let gridDiv = document.querySelector('.grid');
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let cell = document.createElement('div');
      cell.className = 'cell';
      cell.setAttribute('data-row', i);
      cell.setAttribute('data-col', j);
      gridDiv.appendChild(cell);
      cell.addEventListener('click', makeMove);
    }
  }
};

window.addEventListener('DOMContentLoaded', () => {
  createGrid();
});
