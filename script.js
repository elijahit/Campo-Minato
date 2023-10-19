/* -----------------------
FASE DI PREPARAZIONE
------------------------ */

// Recuperare dalla pagina tutti gli elementi di interesse
const scoreCounter = document.querySelector('.score-counter');
const grid = document.querySelector('.grid');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameText = document.querySelector('.end-game-text');
const playAgainButton = document.querySelector('.play-again')

// Preparo delle informazioni utili alla logica di gioco
const totalCells = 100;
const totalBombs = 16;
const totalTreasure = 2; // Challenge
const maxScore = totalCells - totalBombs - totalTreasure;
const bombsList = [];
const treasureList = []; // Challenge
let score = 0;

// Generare TOT bombe casuali
while (bombsList.length < totalBombs) {
  const number = Math.floor(Math.random() * totalCells) + 1;
  if (!bombsList.includes(number) && !treasureList.includes(number)) bombsList.push(number);
}
//Generare TOT tesori casuali | Challenge
while (treasureList.length < totalTreasure) {
  const number = Math.floor(Math.random() * totalCells) + 1;
  if (!treasureList.includes(number) && !bombsList.includes(number)) treasureList.push(number);
}

console.log(bombsList);
console.log(treasureList);

/* -----------------------
GRIGLIA E LOGICA DI GIOCO
-----------------------*/
let isCellEven = false;
let isRowEven = false;

for (let i = 1; i <= totalCells; i++) {
  // Creo un elemento e gli do la classe 'cell'
  const cell = document.createElement('div');
  cell.classList.add('cell');

  // cell.innerText = i;
  isCellEven = i % 2 === 0;

  // Se la riga è pari e la cella è pari: casella grigia
  if (isRowEven && isCellEven) cell.classList.add('cell-dark');

  // Se la riga è dispari e la cella è dispari: casella grigia
  else if (!isRowEven && !isCellEven) cell.classList.add('cell-dark');

  // Se sono alla fine della riga...
  if (i % 10 === 0) isRowEven = !isRowEven;

  // # Gestiamo il click della cella
  cell.addEventListener('click', function () {
    // ! Controllo che la cella non sia stata già cliccata
    if (cell.classList.contains('cell-clicked')) return;


    if (bombsList.includes(i)) {
      // Se è una bomba....
      cell.classList.add('cell-bomb');
      endGame(false);
    } else if (treasureList.includes(i)) {
      cell.classList.add('cell-treasure');
      endGame(true);
    } else {
      // Se non lo è...
      cell.classList.add('cell-clicked');
      updateScore();
    }
  });

  // Lo inserisco nella griglia
  grid.appendChild(cell);
}


/* -------------------
FUNZIONI
-------------------*/
// Funzione per aggiornare il punteggio
function updateScore() {
  // Incremento lo score
  score++;
  // Lo inserisco nel contatore
  scoreCounter.innerText = String(score).padStart(5, 0);

  // Controlliamo se l'utente ha vinto
  if (score === maxScore) endGame(true);
}

// Funzione per decretare la fine del gioco
function endGame(isVictory) {
  if (isVictory === true) {
    // Coloriamo di verde e cambiamo il messaggio
    endGameScreen.classList.add('win');
    endGameText.innerHTML = 'YOU<br>WIN';
  } else {
    // Riveliamo tutte le bombe
    revealAllBombs();
  }

  // Mostriamo la schermata rimuovendo la classe
  endGameScreen.classList.remove('hidden');
}

// Funzione per ricaricare la pagina
function playAgain() {
  location.reload();
}

// # BONUS
// Funzione che rivela tutte le bombe
function revealAllBombs() {
  // Recupero tutte le celle
  const cells = document.querySelectorAll('.cell');
  for (let i = 1; i <= cells.length; i++) {
    // controllo se la cella è una bomba
    if (bombsList.includes(i)) {
      const cellToReveal = cells[i - 1];
      cellToReveal.classList.add('cell-bomb');
    }
  }
}

/* ---------------------
EVENTI
-----------------------*/

// Gestiamo il click sul tasto rigioca
playAgainButton.addEventListener('click', playAgain);