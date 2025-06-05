import { initGame } from 'game';

const gridSize = 3;
const board = document.getElementById('game-board');
const overlay = document.getElementById('game-overlay');
const scoreEl = document.getElementById('score');
const missEl = document.getElementById('miss');
const levelEl = document.getElementById('level');

function createBoard() {
  board.innerHTML = '';
  for (let i = 0; i < gridSize * gridSize; i++) {
    const hole = document.createElement('div');
    hole.classList.add('hole');
    hole.tabIndex = 0;
    board.appendChild(hole);
  }
}

function showOverlay(msg) {
  overlay.innerHTML = msg;
  overlay.classList.remove('hidden');
}

function hideOverlay() {
  overlay.innerHTML = '';
  overlay.classList.add('hidden');
}

function setStats({ score = 0, miss = 0, level = 1 } = {}) {
  scoreEl.textContent = score;
  missEl.textContent = miss;
  levelEl.textContent = level;
}
window.addEventListener('DOMContentLoaded', () => {
  createBoard();
  setStats();
  hideOverlay();
  
  // Initialize game with hole elements
  initGame(document.querySelectorAll('.hole'));
});

export { createBoard, setStats, showOverlay, hideOverlay, gridSize };