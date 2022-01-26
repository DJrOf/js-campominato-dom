/* L'utente indica TRAMITE DOM un livello di difficoltà 
in base al quale viene generata una griglia di gioco quadrata, 
in cui ogni cella contiene un numero tra quelli compresi 
in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Quando l'utente clicca su ogni cella, 
la cella cliccata si colora di azzurro. */ 

// BombsNo gen

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);


// Gioca - CTA Button -

const play = () => {

// Reset txt-btn
    playButton.innerText = 'Ricomincia';

// Grid reset    
    const grid = document.getElementById('grid');
    grid.innerHTML = '';

// #Select Difficulty    
    let attempts = 0;
    const TOTAL_BOMBS = 16;

    const level = document.getElementById('level').value;

    let totalCells;
    let cellsPerRow;

    switch (level) {
        case 'easy':
            totalCells = 100;
            break;
            case 'hard':
            totalCells = 49;
            break;
            default:
            totalCells = 81;
    }       
    cellsPerRow = Math.sqrt(totalCells);

    const MAX_ATTEMPTS = totalCells - TOTAL_BOMBS;

    //  Functions

    // Bomb gen

    const generateBombs = (totalBombs, totalNumbers) => {
        const bombs = [];
        while (bombs.length < totalBombs) {
            const randNumber = getRandomNumber(1, totalNumbers);
            if (!bombs.includes(randNumber)) bombs.push(randNumber);
        }
        return bombs;
    };

    // Cells gen
const generateCell = (number, cellsPerRow) => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.innerText = number;
    const sideLength = `calc(100% / ${cellsPerRow})`;
    cell.style.width = sideLength;
    cell.style.height = sideLength;
    return cell;
};

// GameOver

const gameOver = (bombs, points, hasLost) => {

    showBombs(bombs);
    const messageElement = document.createElement('h3');
    messageElement.className = 'message';
    const messageText = hasLost ? `Pai perso! Punti: ${points}`:
    `Hai vinto! Punti: ${points}`
};


//Click - Evento

const onCellClick = (clickedCell, bombs, number) => {
    clickedCell.removeEventListener('click', onCellClick);

    number = clickedCell.innerText;

    if (bombs.includes(number)) {
        gameOver(bombs, attempts, true);
    } else {
        clickedCell.classList.add('safe');
        attempts++;

        if (attempts === MAX_ATTEMPTS)
        gameOver(bombs, attempts, false)
    }
};

//Show bombs, block click
const showBombs = (bombs) => {
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    const cellNumber = parseInt(cell.innerText);
    cell.removeEventListener ('click', oneCellClick);
    if (bombs.includes(cellNumber)) cell.classical.add('bomb');
    }
};  

    // Grid gen
const generateGrid = (cellsNumber, cellsPerRow, bombs) => {
    for (let i = 1; i <= cellsNumber; i++) {
        const cell = generateCell(i, cellsPerRow);

        cell.addEventListener('click', (e) => onCellClick(e.target, bombs, i))
        grid.appendChild(cell);
    }
};

// Exec
const bombs = generateBombs(TOTAL_BOMBS, totalCells);
generateGrid(totalCells, cellsPerRow, bombs);

};

 // Play button funzione 
 const playButton = document.getElementById('play');
 playButton.addEventListener('click', play);
