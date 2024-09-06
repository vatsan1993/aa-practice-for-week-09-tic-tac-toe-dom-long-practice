import Board from './board.js';
// Your code here
let board = new Board();
board.setup();

let createGrid = () => {
  let gridDiv = document.querySelector('.grid');
  let id = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let cell = document.createElement('div');
      cell.className = 'cell';
      cell.setAttribute('data-row', i);
      cell.setAttribute('data-col', j);
      cell.id = `square-${id}`;
      gridDiv.appendChild(cell);
      cell.addEventListener('click', makeMove);
      id++;
    }
  }
};

const makeMove = (event) => {
  let cell = event.currentTarget;
  console.log(cell);

  let row = cell.dataset.row;
  let col = cell.dataset.col;
  let currentSymbol = board.currentSymbol;
  let cellImage = document.createElement('img');

  if (board.insert(row, col)) {
    // cell.textContent = currentSymbol;
    if (currentSymbol == 'X') {
      cellImage.src =
        'https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg';
    } else {
      cellImage.src =
        'https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg';
    }
    cell.appendChild(cellImage);
  }

  // check win
  if (board.checkWin(row, col)) {
    removeEvents();
    document.querySelector('.result-message').textContent =
      'Winner: ' + currentSymbol;
  } else if (board.checkDraw()) {
    removeEvents();
    document.querySelector('.result-message').textContent = 'Winner: None';
  }
  // else {
  // computer move
  // let randomRow = Math.floor(Math.random() * (3 - 0) + 0);
  // let randomCol = Math.floor(Math.random() * (3 - 0) + 0);
  // while (!board.insert(randomRow, randomCol)) {
  //   randomRow = Math.floor(Math.random() * (3 - 0) + 0);
  //   randomCol = Math.floor(Math.random() * (3 - 0) + 0);
  // }
  // document.querySelector(
  //   `.cell[data-row="${randomRow}"][data-col="${randomCol}"]`
  // ).textContent = 'O';

  // if (board.checkWin()) {
  //   removeEvents();
  //   document.querySelector('.result-message').textContent = 'Winner: O';
  // }
  // }
};

let removeEvents = () => {
  document.querySelectorAll('.cell').forEach((cell) => {
    cell.removeEventListener('click', makeMove);
  });
};

window.addEventListener('DOMContentLoaded', () => {
  createGrid();
});
