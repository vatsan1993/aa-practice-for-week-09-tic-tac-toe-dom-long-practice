import Board from './board.js';
// Your code here
let board = new Board();

board.setup();

let saveContent = () => {
  localStorage.setItem('board', JSON.stringify(board));
};

let giveUp = () => {
  let winner = board.currentSymbol == 'X' ? 'O' : 'X';
  board.winner = winner;
  document.querySelector('.result-message').textContent = 'Winner: ' + winner;
  removeEvents();
  let newGameButton = document.querySelector('.new-game');
  newGameButton.removeAttribute('disabled');
  document.querySelector('.give-up').setAttribute('disabled', true);
  saveContent();
};

let resetGame = () => {
  document.querySelector('h1').textContent = '';
  board = new Board();
  board.setup();
  localStorage.setItem('board', JSON.stringify(board));
  let gridDiv = document.querySelector('.grid');
  gridDiv.innerHTML = '';
  createGrid();
};

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
  let newGameButton = document.querySelector('.new-game');
  newGameButton.setAttribute('disabled', true);
  newGameButton.addEventListener('click', resetGame);

  let giveUpButton = document.querySelector('.give-up');
  giveUpButton.removeAttribute('disabled');
  giveUpButton.addEventListener('click', giveUp);

  if (localStorage.getItem('board')) {
    let data = JSON.parse(localStorage.getItem('board'));
    board.grid = data.grid;
    board.currentSymbol = data.currentSymbol;
    board.spacesLeft = data.spacesLeft;
    board.winner = data.winner;
    if (board.winner) {
      document.querySelector('h1').textContent = 'Winner: ' + board.winner;
    }

    for (let i = 0; i < board.getSize(); i++) {
      for (let j = 0; j < board.getSize(); j++) {
        let symbol = board.getSymbol(i, j);
        let cellImage = document.createElement('img');
        let cell = document.querySelector(
          `.cell[data-row="${i}"][data-col="${j}"]`
        );
        if (symbol == 'X') {
          cellImage.src =
            'https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg';
          cell.appendChild(cellImage);
        } else if (symbol == 'O') {
          cellImage.src =
            'https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg';
          cell.appendChild(cellImage);
        }
      }
    }
    if (board.winner == 'X' || board.winner == 'O') {
      document.querySelector('.new-game').removeAttribute('disabled');
      document.querySelector('.give-up').setAttribute('disabled', true);
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
    let newGameButton = document.querySelector('.new-game');
    newGameButton.removeAttribute('disabled');
    removeEvents();
    document.querySelector('.result-message').textContent =
      'Winner: ' + currentSymbol;
    let giveUpButton = document.querySelector('.give-up');
    giveUpButton.setAttribute('disabled', true);
  } else if (board.checkDraw()) {
    let newGameButton = document.querySelector('.new-game');
    newGameButton.removeAttribute('disabled');
    removeEvents();
    document.querySelector('.result-message').textContent = 'Winner: None';
    let giveUpButton = document.querySelector('.give-up');
    giveUpButton.setAttribute('disabled', true);
  }
  saveContent();

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
